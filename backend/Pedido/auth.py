from jose import jwt
from fastapi import HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

SECRET = "shopnow_secret"
ALGORITHM = "HS256"

security = HTTPBearer()

# ======================================================
# LOGIN
# ======================================================
def login():

    token = jwt.encode(
        {
            "user": "admin"
        },
        SECRET,
        algorithm=ALGORITHM
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }

# ======================================================
# VERIFY TOKEN
# ======================================================
def verificar_token(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):

    token = credentials.credentials

    try:

        payload = jwt.decode(
            token,
            SECRET,
            algorithms=[ALGORITHM]
        )

        return payload

    except:

        raise HTTPException(
            status_code=403,
            detail="Token inválido"
        )