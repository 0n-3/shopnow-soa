import { useNavigate } from "react-router-dom";

import { loginInventario } from "../../services/inventarioService";

import "../../styles/inventario.css";

function InventarioLogin() {

    const navigate = useNavigate();

    const entrar = async () => {

        try{

            const token = await loginInventario();

            localStorage.setItem("token", token);

            navigate("/dashboard");

        }catch(error){

            console.log(error);

            alert("Error login");
        }
    };

    return(

        <div className="inventario-container">

            <div className="login-card">

                <h1>ShopNow</h1>

                <h2>Gestión Inventario</h2>

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

export default InventarioLogin;