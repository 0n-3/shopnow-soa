require("dotenv").config();

const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const router = require("./routes/inventario_routes");
const consumir = require("./consumer");

const app = express();

app.use(express.json());


// ======================================================
// CORS
// ======================================================

const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(",").map(origin => origin.trim())
    : [
        "http://localhost:5175",
        "http://127.0.0.1:5175"
    ];

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));


// ======================================================
// LOGIN
// ======================================================

app.post("/login", (req, res) => {

    res.json({
        access_token: jwt.sign(
            { user: "admin" },
            "shopnow_secret"
        )
    });

});


// ======================================================
// HEALTHCHECK
// ======================================================

app.get("/", (req, res) => {

    res.json({
        service: "inventario",
        status: "ok"
    });

});


// ======================================================
// ROUTES
// ======================================================

app.use("/", router);


// ======================================================
// START SERVER
// ======================================================

const PORT = process.env.PORT || 8004;

app.listen(PORT, "0.0.0.0", () => {

    console.log(`✔ inventario corriendo en puerto ${PORT}`);

    consumir();

});