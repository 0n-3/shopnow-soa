import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { eliminarCliente } from "../../services/clientesService";

import "../../styles/clientes.css";

function ClientesDelete() {

    const navigate = useNavigate();

    const [idcliente, setIdcliente] = useState("");

    const eliminar = async () => {

        try{

            const token = localStorage.getItem("token");

            await eliminarCliente(
                idcliente,
                token
            );

            alert("Cliente eliminado correctamente");

            setIdcliente("");

        }catch(error){

            console.log(error);

            alert("Error eliminando cliente");
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

                <h1>DELETE Cliente</h1>

                <input
                    type="number"
                    placeholder="ID Cliente"
                    value={idcliente}
                    onChange={(e) =>
                        setIdcliente(e.target.value)
                    }
                />

                <button onClick={eliminar}>
                    Eliminar Cliente
                </button>

            </div>

        </div>
    );
}

export default ClientesDelete;