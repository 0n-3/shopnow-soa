import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { actualizarProducto } from "../../services/productosService";

import "../../styles/productos.css";

function ProductosPatch() {

    const navigate = useNavigate();

    const [producto, setProducto] = useState({
        idproducto:"",
        descripcion:"",
        precio:"",
        activo:true
    });

    const handleChange = (e) => {

        setProducto({
            ...producto,
            [e.target.name]: e.target.value
        });
    };

    const actualizar = async () => {

        try{

            const token = localStorage.getItem("token");

            const data = {
                descripcion: producto.descripcion,
                precio: parseFloat(producto.precio),
                activo: true
            };

            await actualizarProducto(
                producto.idproducto,
                data,
                token
            );

            alert("Producto actualizado correctamente");

        }catch(error){

            console.log(error);

            alert("Error actualizando producto");
        }
    };

    return(

        <div className="patch-container">

            <div className="patch-card">

                <button
                    className="back-btn"
                    onClick={() => navigate("/dashboard")}
                >
                    ← Volver
                </button>

                <h1>PATCH Producto</h1>

                <input
                    type="number"
                    name="idproducto"
                    placeholder="ID Producto"
                    value={producto.idproducto}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="descripcion"
                    placeholder="Nueva Descripción"
                    value={producto.descripcion}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    step="0.01"
                    name="precio"
                    placeholder="Nuevo Precio"
                    value={producto.precio}
                    onChange={handleChange}
                />

                <button onClick={actualizar}>
                    Actualizar Producto
                </button>

            </div>

        </div>
    );
}

export default ProductosPatch;