import { useNavigate } from "react-router-dom";

import "../../styles/clientes.css";

function ClientesDashboard() {

    const navigate = useNavigate();

    return (

        <div className="dashboard-container">

            <div className="dashboard-card">

                <h1>Clientes API</h1>

                <div className="endpoint-grid">

                    <button
                        className="endpoint-btn"
                        onClick={() => navigate("/get")}
                    >
                        GET
                    </button>

                    <button
                        className="endpoint-btn"
                        onClick={() => navigate("/post")}
                    >
                        POST
                    </button>

                    <button
                        className="endpoint-btn"
                        onClick={() => navigate("/patch")}
                    >
                        PATCH
                    </button>

                    <button
                        className="endpoint-btn"
                        onClick={() => navigate("/delete")}
                    >
                        DELETE
                    </button>

                </div>

            </div>

        </div>
    );
}

export default ClientesDashboard;