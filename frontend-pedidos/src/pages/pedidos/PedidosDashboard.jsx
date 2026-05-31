import { useNavigate } from "react-router-dom";

import "../../styles/pedidos.css";

function PedidosDashboard() {

    const navigate = useNavigate();

    return (

        <div className="dashboard-container">

            <div className="dashboard-card">

                <h1>
                    Dashboard Pedidos
                </h1>

                <div className="endpoint-grid">

                    <button
                        className="endpoint-btn"
                        onClick={() => navigate("/get")}
                    >
                        GET PEDIDOS
                    </button>

                    <button
                        className="endpoint-btn"
                        onClick={() => navigate("/post")}
                    >
                        POST PEDIDO
                    </button>

                </div>

            </div>

        </div>
    );
}

export default PedidosDashboard;