from dotenv import load_dotenv

load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.pedidos_routes import router
from auth import login


app = FastAPI(title="Pedidos Service")


# ======================================================
# CORS
# ======================================================

origins = [
    "http://localhost:5176"
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