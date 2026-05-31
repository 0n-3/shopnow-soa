from pydantic import BaseModel, Field
from typing import Optional

class Cliente(BaseModel):

    # ID OPCIONAL
    idcliente: Optional[int] = None

    nombre: str = Field(..., min_length=3)

    correo: str

    direccion: str

    telefono: str

    # ACTIVO OPCIONAL
    activo: Optional[bool] = True