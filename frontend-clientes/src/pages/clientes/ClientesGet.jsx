import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { obtenerClientes } from "../../services/clientesService";

import "../../styles/clientes.css";

function ClientesGet() {

    const [clientes, setClientes] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {

        cargarClientes();

    }, []);

    const cargarClientes = async () => {

        try{

            const token = localStorage.getItem("token");

            const data = await obtenerClientes(token);

            setClientes(data);

        }catch(error){

            console.log(error);

            alert("Error obteniendo clientes");
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

                <h1>GET Clientes</h1>

                <table>

                    <thead>

                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Correo</th>
                            <th>Dirección</th>
                            <th>Teléfono</th>
                        </tr>

                    </thead>

                    <tbody>

                        {
                            clientes.map((c) => (

                                <tr key={c.idcliente}>

                                    <td>{c.idcliente}</td>
                                    <td>{c.nombre}</td>
                                    <td>{c.correo}</td>
                                    <td>{c.direccion}</td>
                                    <td>{c.telefono}</td>

                                </tr>
                            ))
                        }

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default ClientesGet;