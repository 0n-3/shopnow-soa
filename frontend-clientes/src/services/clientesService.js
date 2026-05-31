const API = "http://127.0.0.1:8001";


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

    const data = await response.json();

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

    return await response.json();
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

    return await response.json();
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

    return await response.json();
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

    return await response.json();
};