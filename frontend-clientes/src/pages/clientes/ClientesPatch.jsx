import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { actualizarCliente } from "../../services/clientesService";

import "../../styles/clientes.css";

function ClientesPatch() {

    const navigate = useNavigate();

    const [cliente, setCliente] = useState({
        idcliente:"",
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

    const actualizar = async () => {

        try{

            const token = localStorage.getItem("token");

            const data = {
                nombre: cliente.nombre,
                correo: cliente.correo,
                direccion: cliente.direccion,
                telefono: cliente.telefono
            };

            await actualizarCliente(
                cliente.idcliente,
                data,
                token
            );

            alert("Cliente actualizado correctamente");

            setCliente({
                idcliente:"",
                nombre:"",
                correo:"",
                direccion:"",
                telefono:""
            });

        }catch(error){

            console.log(error);

            alert("Error actualizando cliente");
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

                <h1>PATCH Cliente</h1>

                <input
                    type="number"
                    name="idcliente"
                    placeholder="ID Cliente"
                    value={cliente.idcliente}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="nombre"
                    placeholder="Nuevo Nombre"
                    value={cliente.nombre}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="correo"
                    placeholder="Nuevo Correo"
                    value={cliente.correo}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="direccion"
                    placeholder="Nueva Dirección"
                    value={cliente.direccion}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="telefono"
                    placeholder="Nuevo Teléfono"
                    value={cliente.telefono}
                    onChange={handleChange}
                />

                <button onClick={actualizar}>
                    Actualizar Cliente
                </button>

            </div>

        </div>
    );
}

export default ClientesPatch;