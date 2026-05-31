from dotenv import load_dotenv

load_dotenv()

import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.clientes_routes import router
from auth import login


app = FastAPI(title="Clientes Service")


# ==========================================================
# CORS
# ==========================================================

ALLOWED_ORIGINS = os.getenv(
    "ALLOWED_ORIGINS",
    "http://localhost:5173,http://127.0.0.1:5173"
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
    allow_headers=["*"],
)


# ==========================================================
# LOGIN
# ==========================================================

app.post("/login")(login)


# ==========================================================
# HEALTHCHECK
# ==========================================================

@app.get("/")
def health():

    return {
        "service": "clientes",
        "status": "ok"
    }


# ==========================================================
# ROUTES
# ==========================================================

app.include_router(router)


print("✔ clientes conectado a Render PostgreSQL")