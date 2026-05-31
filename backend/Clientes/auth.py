from jose import jwt
from fastapi import HTTPException, Depends
from fastapi.security import HTTPBearer

SECRET = "shopnow_secret"
ALGORITHM = "HS256"

security = HTTPBearer()

# ==========================================================
# LOGIN SIMPLE (MOCK INICIAL)
# ==========================================================
def login():
    # usuario fijo para pruebas
    user_data = {
        "user": "admin",
        "role": "admin"
    }

    token = jwt.encode(user_data, SECRET, algorithm=ALGORITHM)

    return {
        "access_token": token,
        "token_type": "bearer"
    }


# ==========================================================
# VERIFICAR TOKEN
# ==========================================================
def verificar_token(credentials=Depends(security)):
    token = credentials.credentials

    try:
        payload = jwt.decode(token, SECRET, algorithms=[ALGORITHM])
        return payload
    except:
        raise HTTPException(status_code=403, detail="Token inválido")