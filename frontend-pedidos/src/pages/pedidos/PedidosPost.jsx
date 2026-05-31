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

            if (!idcliente || !idproducto || !cantidad) {

                alert("Todos los campos son obligatorios");

                return;
            }

            if (parseInt(idcliente) <= 0) {

                alert("El ID del cliente debe ser mayor a 0");

                return;
            }

            if (parseInt(idproducto) <= 0) {

                alert("El ID del producto debe ser mayor a 0");

                return;
            }

            if (parseInt(cantidad) <= 0) {

                alert("La cantidad debe ser mayor a 0");

                return;
            }

            const resultado =
                await crearPedido(
                    {
                        idcliente: parseInt(idcliente),
                        idproducto: parseInt(idproducto),
                        cantidad: parseInt(cantidad)
                    }
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
                error.message ||
                "Error al crear pedido"
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