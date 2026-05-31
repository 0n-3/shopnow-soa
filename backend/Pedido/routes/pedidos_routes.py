from fastapi import APIRouter, Depends, HTTPException

from models.pedido import Pedido
from services import pedidos_service
from auth import verificar_token
from producer import enviar_mensaje

import requests
import os

from jose import jwt


router = APIRouter()


# ======================================================
# URLS MICROSERVICIOS
# ======================================================

CLIENTES_URL = os.getenv("CLIENTES_URL")
PRODUCTOS_URL = os.getenv("PRODUCTOS_URL")
INVENTARIO_URL = os.getenv("INVENTARIO_URL")

SECRET = "shopnow_secret"


# ======================================================
# TOKEN INTERNO
# ======================================================

def headers_micro():

    token = jwt.encode(
        {
            "user": "internal"
        },
        SECRET,
        algorithm="HS256"
    )

    return {
        "Authorization": f"Bearer {token}"
    }


# ======================================================
# GET PEDIDOS
# ======================================================

@router.get("/v1/pedidos")
def get(user=Depends(verificar_token)):

    try:

        return pedidos_service.obtener_pedidos()

    except Exception as e:

        print("Error al obtener pedidos")
        print(e)

        raise HTTPException(
            status_code=500,
            detail="No se pudieron obtener los pedidos"
        )


# ======================================================
# CREAR PEDIDO
# ======================================================

@router.post("/v1/pedidos")
def create(p: Pedido, user=Depends(verificar_token)):

    headers = headers_micro()


    # ==================================================
    # VALIDAR VARIABLES DE ENTORNO
    # ==================================================

    if not CLIENTES_URL:

        raise HTTPException(
            status_code=500,
            detail="No está configurado el servicio de clientes"
        )

    if not PRODUCTOS_URL:

        raise HTTPException(
            status_code=500,
            detail="No está configurado el servicio de productos"
        )

    if not INVENTARIO_URL:

        raise HTTPException(
            status_code=500,
            detail="No está configurado el servicio de inventario"
        )


    # ==================================================
    # VALIDAR CANTIDAD
    # ==================================================

    if p.cantidad <= 0:

        raise HTTPException(
            status_code=400,
            detail="La cantidad debe ser mayor a 0"
        )


    # ==================================================
    # VALIDAR CLIENTE
    # ==================================================

    try:

        cliente = requests.get(
            f"{CLIENTES_URL}/{p.idcliente}",
            headers=headers,
            timeout=10
        )

    except Exception as e:

        print("Error conectando con clientes")
        print(e)

        raise HTTPException(
            status_code=503,
            detail="Servicio de clientes no disponible"
        )

    if cliente.status_code == 404:

        raise HTTPException(
            status_code=404,
            detail="Cliente no existe"
        )

    if cliente.status_code != 200:

        raise HTTPException(
            status_code=400,
            detail="No se pudo validar el cliente"
        )


    # ==================================================
    # VALIDAR PRODUCTO
    # ==================================================

    try:

        producto = requests.get(
            f"{PRODUCTOS_URL}/{p.idproducto}",
            headers=headers,
            timeout=10
        )

    except Exception as e:

        print("Error conectando con productos")
        print(e)

        raise HTTPException(
            status_code=503,
            detail="Servicio de productos no disponible"
        )

    if producto.status_code == 404:

        raise HTTPException(
            status_code=404,
            detail="Producto no existe"
        )

    if producto.status_code != 200:

        raise HTTPException(
            status_code=400,
            detail="No se pudo validar el producto"
        )


    # ==================================================
    # VALIDAR INVENTARIO
    # ==================================================

    try:

        inventario = requests.get(
            f"{INVENTARIO_URL}/{p.idproducto}",
            headers=headers,
            timeout=10
        )

    except Exception as e:

        print("Error conectando con inventario")
        print(e)

        raise HTTPException(
            status_code=503,
            detail="Servicio de inventario no disponible"
        )

    if inventario.status_code == 404:

        raise HTTPException(
            status_code=404,
            detail="Inventario no existe para este producto"
        )

    if inventario.status_code != 200:

        raise HTTPException(
            status_code=400,
            detail="No se pudo validar el inventario"
        )

    data = inventario.json()


    # ==================================================
    # VALIDAR FORMATO INVENTARIO
    # ==================================================

    if "cantidad" not in data:

        raise HTTPException(
            status_code=500,
            detail="Inventario no tiene cantidad disponible"
        )

    if "id_producto" not in data:

        raise HTTPException(
            status_code=500,
            detail="Inventario no tiene producto válido"
        )


    # ==================================================
    # VALIDAR STOCK
    # ==================================================

    stock_anterior = data["cantidad"]

    if stock_anterior <= 0:

        raise HTTPException(
            status_code=400,
            detail="Producto sin stock"
        )

    if p.cantidad > stock_anterior:

        raise HTTPException(
            status_code=400,
            detail="Stock insuficiente"
        )


    # ==================================================
    # CALCULAR NUEVO STOCK
    # ==================================================

    nuevo_stock = stock_anterior - p.cantidad


    # ==================================================
    # ACTUALIZAR INVENTARIO
    # ==================================================

    patch_url = (
        f"{INVENTARIO_URL.replace('/producto','')}"
        f"/{data['id_producto']}"
    )

    try:

        respuesta_patch = requests.patch(
            patch_url,
            json={
                "cantidad": nuevo_stock
            },
            headers=headers,
            timeout=10
        )

    except Exception as e:

        print("Error actualizando inventario")
        print(e)

        raise HTTPException(
            status_code=503,
            detail="No se pudo actualizar inventario"
        )

    if respuesta_patch.status_code != 200:

        raise HTTPException(
            status_code=400,
            detail="No se pudo actualizar inventario"
        )


    # ==================================================
    # GUARDAR PEDIDO
    # ==================================================

    try:

        pedidos_service.crear_pedido(p)

    except Exception as e:

        print("Error creando pedido")
        print(e)

        raise HTTPException(
            status_code=500,
            detail="No se pudo crear el pedido"
        )


    # ==================================================
    # ENVIAR EVENTO RABBITMQ
    # ==================================================

    enviar_mensaje(
        {
            "evento": "pedido_creado",
            "data": {
                "idcliente": p.idcliente,
                "idproducto": p.idproducto,
                "cantidad": p.cantidad,
                "stock_anterior": stock_anterior,
                "stock_actual": nuevo_stock
            }
        }
    )


    return {
        "mensaje": "pedido creado",
        "stock_anterior": stock_anterior,
        "stock_actual": nuevo_stock
    }


# ======================================================
# V2 PEDIDOS
# ======================================================

@router.get("/v2/pedidos")
def v2(user=Depends(verificar_token)):

    try:

        data = pedidos_service.obtener_pedidos()

        for p in data:

            p["estado"] = "completado"
            p["prioridad"] = "alta"

        return data

    except Exception as e:

        print("Error al obtener pedidos v2")
        print(e)

        raise HTTPException(
            status_code=500,
            detail="No se pudieron obtener los pedidos v2"
        )