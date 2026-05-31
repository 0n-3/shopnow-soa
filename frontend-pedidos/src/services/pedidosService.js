const API_URL = import.meta.env.VITE_PEDIDOS_API_URL || "http://127.0.0.1:8003";


function getToken() {

    return localStorage.getItem("token_pedidos");
}


// ======================================================
// LEER RESPUESTA
// ======================================================

async function leerRespuesta(response) {

    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
        return await response.json();
    }

    return await response.text();
}


// ======================================================
// LOGIN
// ======================================================

async function login() {

    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: "admin",
            password: "admin123"
        })
    });

    const data = await leerRespuesta(response);

    if (!response.ok) {
        throw new Error(
            typeof data === "string"
                ? data
                : data.detail || data.error || "Error al iniciar sesión"
        );
    }

    localStorage.setItem(
        "token_pedidos",
        data.access_token
    );

    return data;
}


// ======================================================
// GET PEDIDOS
// ======================================================

async function getPedidos() {

    const response = await fetch(`${API_URL}/v1/pedidos`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${getToken()}`
        }
    });

    const data = await leerRespuesta(response);

    if (!response.ok) {

        throw new Error(
            typeof data === "string"
                ? data
                : data.detail || data.error || "Error al obtener pedidos"
        );
    }

    return data;
}


// ======================================================
// CREATE PEDIDO
// ======================================================

async function createPedido(pedido) {

    const response = await fetch(`${API_URL}/v1/pedidos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        },
        body: JSON.stringify(pedido)
    });

    const data = await leerRespuesta(response);

    if (!response.ok) {

        if (typeof data === "string") {
            throw new Error(data);
        }

        if (typeof data.detail === "string") {
            throw new Error(data.detail);
        }

        if (Array.isArray(data.detail)) {
            throw new Error("Datos inválidos");
        }

        throw new Error("Error al crear pedido");
    }

    return data;
}


// ======================================================
// GET PEDIDOS V2
// ======================================================

async function getPedidosV2() {

    const response = await fetch(`${API_URL}/v2/pedidos`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${getToken()}`
        }
    });

    const data = await leerRespuesta(response);

    if (!response.ok) {

        throw new Error(
            typeof data === "string"
                ? data
                : data.detail || data.error || "Error al obtener pedidos v2"
        );
    }

    return data;
}


export default {
    login,
    getPedidos,
    createPedido,
    getPedidosV2
};