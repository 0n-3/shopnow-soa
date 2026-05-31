from pydantic import BaseModel, Field


class Pedido(BaseModel):
    idcliente: int = Field(..., gt=0)
    idproducto: int = Field(..., gt=0)
    cantidad: int = Field(..., gt=0)