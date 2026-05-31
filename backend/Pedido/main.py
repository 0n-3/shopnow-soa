from dotenv import load_dotenv

load_dotenv()

import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.pedidos_routes import router
from auth import login


app = FastAPI(title="Pedidos Service")


# ======================================================
# CORS
# ======================================================

ALLOWED_ORIGINS = os.getenv(
    "ALLOWED_ORIGINS",
    "http://localhost:5176,http://127.0.0.1:5176"
)

origins = [
    origin.strip()
    for origin in ALLOWED_ORIGINS.split(",")
    if origin.strip()
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


# ======================================================
# LOGIN
# ======================================================

app.post("/login")(login)


# ======================================================
# HEALTHCHECK
# ======================================================

@app.get("/")
def health():

    return {
        "service": "pedidos",
        "status": "ok"
    }


# ======================================================
# ROUTES
# ======================================================

app.include_router(router)


print("✔ pedidos conectado a Render PostgreSQL")