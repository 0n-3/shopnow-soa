const API = import.meta.env.VITE_INVENTARIO_API_URL || "http://127.0.0.1:8004";


// ======================================================
// LEER RESPUESTA
// ======================================================

const leerRespuesta = async (response) => {

    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
        return await response.json();
    }

    return await response.text();
};


// ======================================================
// LOGIN
// ======================================================

export const loginInventario = async () => {

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


// ======================================================
// GET INVENTARIO
// ======================================================

export const obtenerInventario = async (token) => {

    const response = await fetch(
        `${API}/v1/inventario`,
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
                : data.detail || data.error || "Error al obtener inventario"
        );
    }

    return data;
};


// ======================================================
// GET ONE INVENTARIO
// ======================================================

export const obtenerInventarioProducto = async (id, token) => {

    const response = await fetch(
        `${API}/v1/inventario/producto/${id}`,
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
                : data.detail || data.error || "Error al obtener inventario del producto"
        );
    }

    return data;
};


// ======================================================
// POST INVENTARIO
// ======================================================

export const crearInventario = async (data, token) => {

    const response = await fetch(
        `${API}/v1/inventario`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },

            body: JSON.stringify(data)
        }
    );

    const respuesta = await leerRespuesta(response);

    if (!response.ok) {
        throw new Error(
            typeof respuesta === "string"
                ? respuesta
                : respuesta.detail || respuesta.error || "Error al crear inventario"
        );
    }

    return respuesta;
};


// ======================================================
// PATCH INVENTARIO
// ======================================================

export const actualizarInventario = async (
    id,
    data,
    token
) => {

    const response = await fetch(
        `${API}/v1/inventario/${id}`,
        {
            method: "PATCH",

            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },

            body: JSON.stringify(data)
        }
    );

    const respuesta = await leerRespuesta(response);

    if (!response.ok) {
        throw new Error(
            typeof respuesta === "string"
                ? respuesta
                : respuesta.detail || respuesta.error || "Error al actualizar inventario"
        );
    }

    return respuesta;
};


// ======================================================
// DELETE INVENTARIO
// ======================================================

export const eliminarInventario = async (
    id,
    token
) => {

    const response = await fetch(
        `${API}/v1/inventario/${id}`,
        {
            method: "DELETE",

            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    );

    const respuesta = await leerRespuesta(response);

    if (!response.ok) {
        throw new Error(
            typeof respuesta === "string"
                ? respuesta
                : respuesta.detail || respuesta.error || "Error al eliminar inventario"
        );
    }

    return respuesta;
};