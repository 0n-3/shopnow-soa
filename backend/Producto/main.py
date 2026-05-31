from dotenv import load_dotenv

load_dotenv()

import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.productos_routes import router
from auth import login


app = FastAPI(title="Productos Service")


# ======================================================
# CORS
# ======================================================

ALLOWED_ORIGINS = os.getenv(
    "ALLOWED_ORIGINS",
    "http://localhost:5174,http://127.0.0.1:5174"
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


# ======================================================
# LOGIN
# ======================================================

app.post("/login")(login)


# ======================================================
# HEALTHCHECK
# ======================================================

@app.get("/")
def home():

    return {
        "service": "productos",
        "status": "ok"
    }


# ======================================================
# ROUTES
# ======================================================

app.include_router(router)


print("✔ productos conectado a Render PostgreSQL")