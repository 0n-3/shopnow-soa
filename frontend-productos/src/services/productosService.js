const API = "http://127.0.0.1:8002";


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

    const data = await response.json();

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

    return await response.json();
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

    return await response.json();
};

// PATCH PRODUCTO

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

    return await response.json();
};

// GET ONE PRODUCTO

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

    return await response.json();
};


// DELETE PRODUCTO

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

    return await response.json();
};