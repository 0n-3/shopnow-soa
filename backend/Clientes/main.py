from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.clientes_routes import router
from auth import login

app = FastAPI(title="Clientes Service")

# ==========================================================
# CORS
# ==========================================================

origins = [
    "http://localhost:5173",
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
# ROUTES
# ==========================================================

app.include_router(router)

print("✔ clientes conectado a Render PostgreSQL")