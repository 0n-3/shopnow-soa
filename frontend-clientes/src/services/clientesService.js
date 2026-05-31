const API = import.meta.env.VITE_CLIENTES_API_URL || "http://127.0.0.1:8001";


// =====================================================
// LEER RESPUESTA
// =====================================================

const leerRespuesta = async (response) => {

    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
        return await response.json();
    }

    return await response.text();
};


// =====================================================
// LOGIN
// =====================================================

export const loginClientes = async () => {

    const response = await fetch(
        `${API}/login`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                username: "admin",
                password: "admin123"
            })
        }
    );

    const data = await leerRespuesta(response);

    if (!response.ok) {
        throw new Error(
            typeof data === "string"
                ? data
                : data.detail || data.error || "Error al iniciar sesión"
        );
    }

    return data.access_token;
};


// =====================================================
// GET CLIENTES
// =====================================================

export const obtenerClientes = async (token) => {

    const response = await fetch(
        `${API}/v1/clientes`,
        {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    );

    const data = await leerRespuesta(response);

    if (!response.ok) {
        throw new Error(
            typeof data === "string"
                ? data
                : data.detail || data.error || "Error al obtener clientes"
        );
    }

    return data;
};


// =====================================================
// POST CLIENTE
// =====================================================

export const crearCliente = async (cliente, token) => {

    const response = await fetch(
        `${API}/v1/clientes`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },

            body: JSON.stringify(cliente)
        }
    );

    const data = await leerRespuesta(response);

    if (!response.ok) {
        throw new Error(
            typeof data === "string"
                ? data
                : data.detail || data.error || "Error al crear cliente"
        );
    }

    return data;
};


// =====================================================
// PATCH CLIENTE
// =====================================================

export const actualizarCliente = async (
    idcliente,
    cliente,
    token
) => {

    const response = await fetch(
        `${API}/v1/clientes/${idcliente}`,
        {
            method: "PATCH",

            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },

            body: JSON.stringify(cliente)
        }
    );

    const data = await leerRespuesta(response);

    if (!response.ok) {
        throw new Error(
            typeof data === "string"
                ? data
                : data.detail || data.error || "Error al actualizar cliente"
        );
    }

    return data;
};


// =====================================================
// DELETE CLIENTE
// =====================================================

export const eliminarCliente = async (
    idcliente,
    token
) => {

    const response = await fetch(
        `${API}/v1/clientes/${idcliente}`,
        {
            method: "DELETE",

            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    );

    const data = await leerRespuesta(response);

    if (!response.ok) {
        throw new Error(
            typeof data === "string"
                ? data
                : data.detail || data.error || "Error al eliminar cliente"
        );
    }

    return data;
};