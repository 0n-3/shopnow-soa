const API_URL = "http://127.0.0.1:8003";


function getToken() {

    return localStorage.getItem("token_pedidos");
}


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

    const data = await response.json();

    localStorage.setItem(
        "token_pedidos",
        data.access_token
    );

    return data;
}


async function getPedidos() {

    const response = await fetch(`${API_URL}/v1/pedidos`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${getToken()}`
        }
    });

    const data = await response.json();

    if (!response.ok) {

        throw new Error(
            data.detail || "Error al obtener pedidos"
        );
    }

    return data;
}


async function createPedido(pedido) {

    const response = await fetch(`${API_URL}/v1/pedidos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        },
        body: JSON.stringify(pedido)
    });

    const data = await response.json();

    if (!response.ok) {

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


async function getPedidosV2() {

    const response = await fetch(`${API_URL}/v2/pedidos`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${getToken()}`
        }
    });

    const data = await response.json();

    if (!response.ok) {

        throw new Error(
            data.detail || "Error al obtener pedidos v2"
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