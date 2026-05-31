import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { crearCliente } from "../../services/clientesService";

import "../../styles/clientes.css";

function ClientesPost() {

    const navigate = useNavigate();

    const [cliente, setCliente] = useState({
        nombre:"",
        correo:"",
        direccion:"",
        telefono:""
    });

    const handleChange = (e) => {

        setCliente({
            ...cliente,
            [e.target.name]: e.target.value
        });
    };

    const guardarCliente = async () => {

        try{

            const token = localStorage.getItem("token");

            await crearCliente(cliente, token);

            alert("Cliente creado correctamente");

            setCliente({
                nombre:"",
                correo:"",
                direccion:"",
                telefono:""
            });

        }catch(error){

            console.log(error);

            alert("Error creando cliente");
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

                <h1>POST Cliente</h1>

                <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre"
                    value={cliente.nombre}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="correo"
                    placeholder="Correo"
                    value={cliente.correo}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="direccion"
                    placeholder="Dirección"
                    value={cliente.direccion}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="telefono"
                    placeholder="Teléfono"
                    value={cliente.telefono}
                    onChange={handleChange}
                />

                <button onClick={guardarCliente}>
                    Crear Cliente
                </button>

            </div>

        </div>
    );
}

export default ClientesPost;