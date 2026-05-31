const API_URL = import.meta.env.VITE_PEDIDOS_API_URL || "http://127.0.0.1:8003";


// ======================================================
// TOKEN
// ======================================================

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

export async function loginPedidos() {

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

    return data.access_token;
}


// ======================================================
// GET PEDIDOS
// ======================================================

export async function obtenerPedidos() {

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

export async function crearPedido(pedido) {

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

export async function obtenerPedidosV2() {

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


// ======================================================
// EXPORT DEFAULT OPCIONAL
// ======================================================

export default {
    loginPedidos,
    obtenerPedidos,
    crearPedido,
    obtenerPedidosV2
};