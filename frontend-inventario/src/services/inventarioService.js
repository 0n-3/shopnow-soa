const API = "http://127.0.0.1:8004";


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

    const data = await response.json();

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

    return await response.json();
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

    return await response.json();
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

    return await response.json();
};

// ======================================================
// PATCH INVENTARIO
// ======================================================

export const actualizarInventario = async (
    id,
    data,
    token
)=>{

    const response = await fetch(

        `${API}/v1/inventario/${id}`,

        {
            method:"PATCH",

            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            },

            body:JSON.stringify(data)
        }
    );

    return await response.json();

};

// ======================================================
// DELETE INVENTARIO
// ======================================================

export const eliminarInventario = async (
    id,
    token
)=>{

    const response=await fetch(

        `${API}/v1/inventario/${id}`,

        {

            method:"DELETE",

            headers:{

                "Authorization":
                `Bearer ${token}`

            }

        }
    );

    return await response.json();

};