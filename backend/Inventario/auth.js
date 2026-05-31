const jwt = require("jsonwebtoken");

const SECRET = "shopnow_secret"; // EXACTAMENTE igual que Python

function verificarToken(req, res, next) {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(403).json({ error: "Token requerido" });
    }

    const token = authHeader.split(" ")[1];

    try {
        jwt.verify(token, SECRET); // MISMO SECRET GLOBAL
        next();
    } catch (err) {
        return res.status(403).json({ error: "Token inválido" });
    }
}

module.exports = verificarToken;