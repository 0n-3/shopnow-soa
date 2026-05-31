# ==========================================================
# ROUTES CLIENTES (API VERSIONADA)
# ==========================================================

from fastapi import APIRouter, Depends, HTTPException
from models.cliente import Cliente
from services import clientes_service
from auth import verificar_token
from producer import enviar_mensaje

router = APIRouter()

# ==========================================================
# API V1 - ESTABLE (PRODUCCIÓN)
# ==========================================================

@router.get("/v1/clientes")
def obtener_clientes_v1(user=Depends(verificar_token)):
    return clientes_service.obtener_clientes()


@router.get("/v1/clientes/{idcliente}")
def obtener_cliente_v1(idcliente: int, user=Depends(verificar_token)):
    cliente = clientes_service.obtener_cliente(idcliente)

    if not cliente:
        raise HTTPException(status_code=404, detail="Cliente no encontrado")

    return cliente


@router.post("/v1/clientes")
def crear_cliente_v1(cliente: Cliente, user=Depends(verificar_token)):

    clientes_service.crear_cliente(cliente)

    enviar_mensaje({
        "evento": "cliente_creado",
        "data": cliente.dict()
    })

    return {"mensaje": "cliente creado"}


@router.patch("/v1/clientes/{idcliente}")
def actualizar_cliente_v1(idcliente: int, cliente: Cliente, user=Depends(verificar_token)):

    clientes_service.actualizar_cliente(idcliente, cliente)

    enviar_mensaje({
        "evento": "cliente_actualizado",
        "data": cliente.dict()
    })

    return {"mensaje": "cliente actualizado"}


@router.delete("/v1/clientes/{idcliente}")
def eliminar_cliente_v1(idcliente: int, user=Depends(verificar_token)):

    clientes_service.eliminar_cliente(idcliente)

    enviar_mensaje({
        "evento": "cliente_eliminado",
        "data": {"idcliente": idcliente}
    })

    return {"mensaje": "cliente eliminado"}


# ==========================================================
# API V2 - EVOLUCIÓN (NO ROMPE V1)
# ==========================================================

@router.get("/v2/clientes")
def obtener_clientes_v2(user=Depends(verificar_token)):

    data = clientes_service.obtener_clientes()

    for c in data:
        c["activo"] = True
        c["origen"] = "postgresql"

    return data