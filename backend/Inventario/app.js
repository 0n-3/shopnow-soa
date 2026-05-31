require("dotenv").config();

const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const router = require("./routes/inventario_routes");
const consumir = require("./consumer");

const app = express();

app.use(cors());
app.use(express.json());


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

    // RabbitMQ consumer activo
    consumir();

});