import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { eliminarProducto } from "../../services/productosService";

import "../../styles/productos.css";

function ProductosDelete() {

    const navigate = useNavigate();

    const [idproducto, setIdproducto] = useState("");

    const eliminar = async () => {

        try{

            const token = localStorage.getItem("token");

            await eliminarProducto(
                idproducto,
                token
            );

            alert("Producto eliminado correctamente");

            setIdproducto("");

        }catch(error){

            console.log(error);

            alert("Error eliminando producto");
        }
    };

    return(

        <div className="delete-container">

            <div className="delete-card">

                <button
                    className="back-btn"
                    onClick={() => navigate("/dashboard")}
                >
                    ← Volver
                </button>

                <h1>DELETE Producto</h1>

                <input
                    type="number"
                    placeholder="ID Producto"
                    value={idproducto}
                    onChange={(e) => setIdproducto(e.target.value)}
                />

                <button onClick={eliminar}>
                    Eliminar Producto
                </button>

            </div>

        </div>
    );
}

export default ProductosDelete;