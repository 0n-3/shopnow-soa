import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { obtenerProductos } from "../../services/productosService";

import "../../styles/productos.css";

function ProductosGet() {

    const [productos, setProductos] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {

        cargarProductos();

    }, []);

    const cargarProductos = async () => {

        try{

            const token = localStorage.getItem("token");

            const data = await obtenerProductos(token);

            setProductos(data);

        }catch(error){

            console.log(error);

            alert("Error obteniendo productos");
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

                <h1>GET Productos</h1>

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

                        {
                            productos.map((p) => (

                                <tr key={p.idproducto}>

                                    <td>{p.idproducto}</td>

                                    <td>{p.descripcion}</td>

                                    <td>{p.precio}</td>

                                    <td>
                                        {
                                            p.activo
                                            ? "Sí"
                                            : "No"
                                        }
                                    </td>

                                </tr>
                            ))
                        }

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default ProductosGet;