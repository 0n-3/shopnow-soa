import { useNavigate } from "react-router-dom";

import "../../styles/inventario.css";

function InventarioDashboard() {

    const navigate = useNavigate();

    return(

        <div className="dashboard-container">

            <div className="dashboard-card">

                <h1>Inventario API</h1>

                <div className="endpoint-grid">

                    <button
                        className="endpoint-btn"
                        onClick={() => navigate("/get")}
                    >
                        GET Inventario
                    </button>

                    <button
                        className="endpoint-btn"
                        onClick={() => navigate("/getone")}
                    >
                        GET ONE
                    </button>

                    <button
                        className="endpoint-btn"
                        onClick={() => navigate("/post")}
                    >
                        POST Inventario
                    </button>

                    <button
                        className="endpoint-btn"
                        onClick={() => navigate("/patch")}
                    >
                        PATCH Inventario
                    </button>

                    <button
                        className="endpoint-btn"
                        onClick={() => navigate("/delete")}
                    >
                        DELETE Inventario
                    </button>

                </div>

            </div>

        </div>
    );
}

export default InventarioDashboard;