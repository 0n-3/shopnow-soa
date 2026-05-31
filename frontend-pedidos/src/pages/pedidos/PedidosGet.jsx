import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { obtenerPedidos } from "../../services/pedidosService";

import "../../styles/pedidos.css";

function PedidosGet() {

    const navigate = useNavigate();

    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {

        cargar();

    }, []);

    const cargar = async () => {

        try {

            const token = localStorage.getItem(
                "token"
            );

            const data = await obtenerPedidos(
                token
            );

            setPedidos(
                data
            );

        } catch (error) {

            console.log(
                error
            );
        }
    };

    return (

        <div className="get-container">

            <div className="get-card">

                <button
                    className="back-btn"
                    onClick={() => navigate("/dashboard")}
                >
                    Regresar
                </button>

                <h1>
                    Lista de Pedidos
                </h1>

                <table>

                    <thead>

                        <tr>

                            <th>ID Pedido</th>

                            <th>ID Cliente</th>

                            <th>ID Producto</th>

                            <th>Cantidad</th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            pedidos.map(
                                (p) => (

                                    <tr
                                        key={p.idpedido}
                                    >

                                        <td>
                                            {p.idpedido}
                                        </td>

                                        <td>
                                            {p.idcliente}
                                        </td>

                                        <td>
                                            {p.idproducto}
                                        </td>

                                        <td>
                                            {p.cantidad}
                                        </td>

                                    </tr>
                                )
                            )
                        }

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default PedidosGet;