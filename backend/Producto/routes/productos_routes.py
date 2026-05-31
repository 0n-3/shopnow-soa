from fastapi import APIRouter, Depends, HTTPException

from models.producto import Producto

from services import productos_service

from auth import verificar_token

from producer import enviar_mensaje


router = APIRouter()


# ==========================================================
# ======================= V1 ===============================
# ==========================================================

@router.get("/v1/productos")
def get(user=Depends(verificar_token)):

    return productos_service.obtener_productos()


# ==========================================================
# OBTENER PRODUCTO POR ID
# ==========================================================
@router.get("/v1/productos/{idproducto}")
def get_one(idproducto: int, user=Depends(verificar_token)):

    p = productos_service.obtener_producto(idproducto)

    if not p:
        raise HTTPException(
            status_code=404,
            detail="Producto no encontrado"
        )

    return p


# ==========================================================
# CREAR PRODUCTO
# ==========================================================
@router.post("/v1/productos")
def create(p: Producto, user=Depends(verificar_token)):

    productos_service.crear_producto(p)

    enviar_mensaje({
        "evento": "producto_creado",
        "data": p.dict()
    })

    return {
        "mensaje": "Producto creado"
    }


# ==========================================================
# ACTUALIZAR PRODUCTO
# ==========================================================
@router.patch("/v1/productos/{idproducto}")
def update(
    idproducto: int,
    p: Producto,
    user=Depends(verificar_token)
):

    productos_service.actualizar_producto(
        idproducto,
        p
    )

    enviar_mensaje({
        "evento": "producto_actualizado",
        "data": p.dict()
    })

    return {
        "mensaje": "Producto actualizado"
    }


# ==========================================================
# ELIMINAR PRODUCTO
# ==========================================================
@router.delete("/v1/productos/{idproducto}")
def delete(
    idproducto: int,
    user=Depends(verificar_token)
):

    productos_service.eliminar_producto(idproducto)

    enviar_mensaje({
        "evento": "producto_eliminado",
        "data": {
            "idproducto": idproducto
        }
    })

    return {
        "mensaje": "Producto eliminado"
    }


# ==========================================================
# ======================= V2 ===============================
# ==========================================================
@router.get("/v2/productos")
def v2(user=Depends(verificar_token)):

    data = productos_service.obtener_productos()

    for p in data:
        p["categoria"] = "general"

    return data