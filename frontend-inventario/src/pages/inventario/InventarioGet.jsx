import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { obtenerInventario } from "../../services/inventarioService";

import "../../styles/inventario.css";

function InventarioGet() {

    const [inventario, setInventario] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {

        cargarInventario();

    }, []);

    const cargarInventario = async () => {

        try{

            const token = localStorage.getItem("token");

            const data = await obtenerInventario(token);

            setInventario(data);

        }catch(error){

            console.log(error);

            alert("Error obteniendo inventario");
        }
    };

    return(

        <div className="get-container">

            <div className="get-card">

                <button
                    className="back-btn"
                    onClick={() => navigate("/dashboard")}
                >
                    Volver
                </button>

                <h1>Inventario</h1>

                <table>

                    <thead>

                        <tr>

                            <th>ID Producto</th>

                            <th>Cantidad</th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            inventario.map((i, index) => (

                                <tr key={index}>

                                   

                                    <td>{i.idproducto || i.id_producto}</td>

                                    <td>{i.cantidad}</td>

                                </tr>
                            ))
                        }

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default InventarioGet;