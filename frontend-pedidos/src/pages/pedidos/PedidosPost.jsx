import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { crearPedido } from "../../services/pedidosService";

import "../../styles/pedidos.css";

function PedidosPost() {

    const navigate = useNavigate();

    const [idcliente, setIdcliente] = useState("");

    const [idproducto, setIdproducto] = useState("");

    const [cantidad, setCantidad] = useState("");

    const guardar = async () => {

        try {

            const token =
                localStorage.getItem(
                    "token"
                );

            const resultado =
                await crearPedido(
                    {
                        idcliente:
                            parseInt(idcliente),

                        idproducto:
                            parseInt(idproducto),

                        cantidad:
                            parseInt(cantidad)
                    },
                    token
                );

            alert(
                resultado.mensaje ||
                "Pedido creado"
            );

            navigate(
                "/dashboard"
            );

        } catch (error) {

            console.log(
                "ERROR COMPLETO:",
                error
            );

            alert(
                JSON.stringify(
                    error,
                    null,
                    2
                )
            );
        }
    };

    return (

        <div className="post-container">

            <div className="post-card">

                <button
                    className="back-btn"
                    onClick={() =>
                        navigate("/dashboard")
                    }
                >
                    Regresar
                </button>

                <h1>
                    Crear Pedido
                </h1>

                <input
                    type="number"
                    placeholder="ID Cliente"
                    value={idcliente}
                    onChange={(e) =>
                        setIdcliente(
                            e.target.value
                        )
                    }
                />

                <input
                    type="number"
                    placeholder="ID Producto"
                    value={idproducto}
                    onChange={(e) =>
                        setIdproducto(
                            e.target.value
                        )
                    }
                />

                <input
                    type="number"
                    placeholder="Cantidad"
                    value={cantidad}
                    onChange={(e) =>
                        setCantidad(
                            e.target.value
                        )
                    }
                />

                <button
                    onClick={guardar}
                >
                    Guardar Pedido
                </button>

            </div>

        </div>
    );
}

export default PedidosPost;