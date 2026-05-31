import { useNavigate } from "react-router-dom";

import { loginPedidos } from "../../services/pedidosService";

import "../../styles/pedidos.css";

function PedidosLogin() {

    const navigate = useNavigate();

    const entrar = async () => {

        try{

            const token = await loginPedidos();

            localStorage.setItem("token", token);

            navigate("/dashboard");

        }catch(error){

            alert("Error login");
        }
    };

    return(

        <div className="pedidos-container">

            <div className="login-card">

                <h1>ShopNow</h1>

                <h2>Gestión de Pedidos</h2>

                <input
                    type="text"
                    placeholder="Usuario"
                />

                <input
                    type="password"
                    placeholder="Contraseña"
                />

                <button onClick={entrar}>
                    Iniciar Sesión
                </button>

                <div className="credenciales-box">

                    <h3>Credenciales Demo</h3>

                    <p>
                        <strong>Usuario:</strong> admin
                    </p>

                    <p>
                        <strong>Password:</strong> admin123
                    </p>

                </div>

            </div>

        </div>
    );
}

export default PedidosLogin;