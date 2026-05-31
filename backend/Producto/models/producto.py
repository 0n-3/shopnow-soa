from pydantic import BaseModel


class Producto(BaseModel):

    idproducto: int | None = None

    descripcion: str

    precio: float

    activo: bool = True