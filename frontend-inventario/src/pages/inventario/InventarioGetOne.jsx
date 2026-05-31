import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { obtenerInventarioProducto } from "../../services/inventarioService";

import "../../styles/inventario.css";

function InventarioGetOne() {

    const navigate = useNavigate();

    const [idproducto, setIdproducto] = useState("");

    const [inventario, setInventario] = useState(null);

    const buscar = async () => {

        try{

            const token = localStorage.getItem("token");

            const data = await obtenerInventarioProducto(
                idproducto,
                token
            );

            setInventario(data);

        }catch(error){

            console.log(error);

            alert("Error GET ONE");
        }
    };

    return(

        <div className="get-container">

            <div className="get-card">

                <button
                    className="back-btn"
                    onClick={() => navigate("/dashboard")}
                >
                    Regresar
                </button>

                <h1>GET ONE Inventario</h1>

                <input
                    type="number"
                    placeholder="ID Producto"
                    value={idproducto}
                    onChange={(e) => setIdproducto(e.target.value)}
                />

                <button
                    className="action-btn"
                    onClick={buscar}
                >
                    Buscar
                </button>

                {
                    inventario && (

                        <table>

                            <thead>

                                <tr>

                                    <th>ID Producto</th>

                                    <th>Cantidad</th>

                                </tr>

                            </thead>

                            <tbody>

                                <tr>

                                    <td>{inventario.id_producto}</td>

                                    <td>{inventario.cantidad}</td>

                                </tr>

                            </tbody>

                        </table>
                    )
                }

            </div>

        </div>
    );
}

export default InventarioGetOne;