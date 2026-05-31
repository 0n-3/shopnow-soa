from fastapi import FastAPI
from routes.productos_routes import router
from auth import login
from fastapi.middleware.cors import CORSMiddleware 


app = FastAPI(title="Productos Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# LOGIN
app.post("/login")(login)

# ROUTES
app.include_router(router)

# HEALTHCHECK
@app.get("/")
def home():
    return {
        "service": "productos",
        "status": "ok"
    }

print("✔ productos conectado a Render PostgreSQL")