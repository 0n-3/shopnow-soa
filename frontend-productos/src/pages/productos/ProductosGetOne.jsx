import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { obtenerProducto } from "../../services/productosService";

import "../../styles/productos.css";

function ProductosGetOne() {

    const navigate = useNavigate();

    const [idproducto, setIdproducto] = useState("");

    const [producto, setProducto] = useState(null);

    const buscarProducto = async () => {

        try{

            const token = localStorage.getItem("token");

            const data = await obtenerProducto(
                idproducto,
                token
            );

            setProducto(data);

        }catch(error){

            console.log(error);

            alert("Error obteniendo producto");
        }
    };

    return(

        <div className="get-container">

            <div className="get-card">

                <button
                    className="back-btn"
                    onClick={() => navigate("/dashboard")}
                >
                    ← Volver
                </button>

                <h1>GET ONE Producto</h1>

                <input
                    type="number"
                    placeholder="ID Producto"
                    value={idproducto}
                    onChange={(e) => setIdproducto(e.target.value)}
                />

                <button
                    className="endpoint-btn"
                    onClick={buscarProducto}
                >
                    Buscar
                </button>

                {
                    producto && (

                        <table>

                            <thead>

                                <tr>
                                    <th>ID</th>
                                    <th>Descripción</th>
                                    <th>Precio</th>
                                    <th>Activo</th>
                                </tr>

                            </thead>

                            <tbody>

                                <tr>

                                    <td>{producto.idproducto}</td>
                                    <td>{producto.descripcion}</td>
                                    <td>{producto.precio}</td>
                                    <td>
                                        {producto.activo ? "Sí" : "No"}
                                    </td>

                                </tr>

                            </tbody>

                        </table>
                    )
                }

            </div>

        </div>
    );
}

export default ProductosGetOne;