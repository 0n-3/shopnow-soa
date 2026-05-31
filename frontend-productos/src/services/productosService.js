const API = import.meta.env.VITE_PRODUCTOS_API_URL || "http://127.0.0.1:8002";


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

export const loginProductos = async () => {

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
// GET PRODUCTOS
// =====================================================

export const obtenerProductos = async (token) => {

    const response = await fetch(
        `${API}/v1/productos`,
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
                : data.detail || data.error || "Error al obtener productos"
        );
    }

    return data;
};


// =====================================================
// POST PRODUCTO
// =====================================================

export const crearProducto = async (producto, token) => {

    const response = await fetch(
        `${API}/v1/productos`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },

            body: JSON.stringify(producto)
        }
    );

    const data = await leerRespuesta(response);

    if (!response.ok) {
        throw new Error(
            typeof data === "string"
                ? data
                : data.detail || data.error || "Error al crear producto"
        );
    }

    return data;
};


// =====================================================
// PATCH PRODUCTO
// =====================================================

export const actualizarProducto = async (
    idproducto,
    producto,
    token
) => {

    const response = await fetch(
        `${API}/v1/productos/${idproducto}`,
        {
            method: "PATCH",

            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },

            body: JSON.stringify(producto)
        }
    );

    const data = await leerRespuesta(response);

    if (!response.ok) {
        throw new Error(
            typeof data === "string"
                ? data
                : data.detail || data.error || "Error al actualizar producto"
        );
    }

    return data;
};


// =====================================================
// GET ONE PRODUCTO
// =====================================================

export const obtenerProducto = async (
    idproducto,
    token
) => {

    const response = await fetch(
        `${API}/v1/productos/${idproducto}`,
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
                : data.detail || data.error || "Error al obtener producto"
        );
    }

    return data;
};


// =====================================================
// DELETE PRODUCTO
// =====================================================

export const eliminarProducto = async (
    idproducto,
    token
) => {

    const response = await fetch(
        `${API}/v1/productos/${idproducto}`,
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
                : data.detail || data.error || "Error al eliminar producto"
        );
    }

    return data;
};