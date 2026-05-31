import {useState} from "react";

import {useNavigate} from "react-router-dom";

import {actualizarInventario}
from "../../services/inventarioService";

import "../../styles/inventario.css";

function InventarioPatch(){

    const navigate=useNavigate();

    const[idproducto,setIdproducto]=useState("");

    const[cantidad,setCantidad]=useState("");


    const actualizar=async()=>{

        try{

            const token=
            localStorage.getItem("token");


            const response=
            await actualizarInventario(

                idproducto,

                {
                    cantidad:parseInt(cantidad)
                },

                token
            );

            alert(response.mensaje);

            navigate("/dashboard");

        }

        catch(error){

            console.log(error);

            alert("Error PATCH");

        }

    };


    return(

        <div className="post-container">

            <div className="post-card">

                <button
                className="back-btn"
                onClick={()=>
                navigate("/dashboard")
                }
                >
                    Regresar
                </button>

                <h1>
                    PATCH Inventario
                </h1>


                <input

                type="number"

                placeholder=
                "ID Producto"

                value={idproducto}

                onChange={(e)=>
                setIdproducto(
                e.target.value
                )
                }

                />


                <input

                type="number"

                placeholder=
                "Nueva cantidad"

                value={cantidad}

                onChange={(e)=>
                setCantidad(
                e.target.value
                )
                }

                />


                <button
                onClick={actualizar}
                >
                    Actualizar
                </button>

            </div>

        </div>

    );

}

export default InventarioPatch;