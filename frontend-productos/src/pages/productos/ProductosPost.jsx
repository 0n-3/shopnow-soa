import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { crearProducto } from "../../services/productosService";

import "../../styles/productos.css";

function ProductosPost() {

    const navigate = useNavigate();

    const [producto, setProducto] = useState({
        descripcion:"",
        precio:""
    });

    const handleChange = (e) => {

        setProducto({
            ...producto,
            [e.target.name]: e.target.value
        });
    };

    const guardarProducto = async () => {

        try{

            const token = localStorage.getItem("token");

            await crearProducto(producto, token);

            alert("Producto creado correctamente");

            setProducto({
                descripcion:"",
                precio:""
            });

        }catch(error){

            console.log(error);

            alert("Error creando producto");
        }
    };

    return(

        <div className="post-container">

            <div className="post-card">

                <button
                    className="back-btn"
                    onClick={() => navigate("/dashboard")}
                >
                    ← Volver
                </button>

                <h1>POST Producto</h1>

                <input
                    type="text"
                    name="descripcion"
                    placeholder="Descripción"
                    value={producto.descripcion}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="precio"
                    placeholder="Precio"
                    value={producto.precio}
                    onChange={handleChange}
                />

                <button onClick={guardarProducto}>
                    Crear Producto
                </button>

            </div>

        </div>
    );
}

export default ProductosPost;