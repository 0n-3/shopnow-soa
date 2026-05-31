import { useNavigate } from "react-router-dom";

import "../../styles/productos.css";

function ProductosDashboard() {

    const navigate = useNavigate();

    return(

        <div className="dashboard-container">

            <div className="dashboard-card">

                <h1>Productos API</h1>

                <h2>Selecciona un Endpoint</h2>

                <div className="endpoint-grid">

                    <button
                        className="endpoint-btn"
                        onClick={() => navigate("/get")}
                    >
                        GET Productos
                    </button>

                    <button
                        className="endpoint-btn"
                        onClick={() => navigate("/getone")}
                    >
                        GET One
                    </button>

                    <button
                        className="endpoint-btn"
                        onClick={() => navigate("/post")}
                    >
                        POST Producto
                    </button>

                    <button
                        className="endpoint-btn"
                        onClick={() => navigate("/patch")}
                    >
                        PATCH Producto
                    </button>

                    <button
                        className="endpoint-btn"
                        onClick={() => navigate("/delete")}
                    >
                        DELETE Producto
                    </button>

                </div>

            </div>

        </div>
    );
}

export default ProductosDashboard;