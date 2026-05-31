import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { crearInventario } from "../../services/inventarioService";

import "../../styles/inventario.css";

function InventarioPost() {

    const navigate = useNavigate();

    const [idproducto,setIdproducto]=useState("");

    const [cantidad,setCantidad]=useState("");

    const guardar = async()=>{

        try{

            const token=localStorage.getItem("token");

            const response=await crearInventario(

                {
                    idproducto:parseInt(idproducto),
                    cantidad:parseInt(cantidad)
                },

                token
            );

            alert(response.mensaje);

            if(
                response.mensaje !==
                "Producto no existe"
            ){

                navigate("/dashboard");

            }

        }catch(error){

            console.log(error);

            alert("Error POST");
        }
    };

    return(

        <div className="post-container">

            <div className="post-card">

                <button
                    className="back-btn"
                    onClick={()=>navigate("/dashboard")}
                >
                    Regresar
                </button>

                <h1>POST Inventario</h1>

                <input
                    type="number"
                    placeholder="ID Producto"
                    value={idproducto}
                    onChange={(e)=>
                        setIdproducto(e.target.value)
                    }
                />

                <input
                    type="number"
                    placeholder="Cantidad"
                    value={cantidad}
                    onChange={(e)=>
                        setCantidad(e.target.value)
                    }
                />

                <button onClick={guardar}>
                    Guardar
                </button>

            </div>

        </div>
    );
}

export default InventarioPost;