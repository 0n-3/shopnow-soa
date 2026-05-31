import { useNavigate } from "react-router-dom";

import { loginClientes } from "../../services/clientesService";

import "../../styles/clientes.css";

function ClientesLogin() {

    const navigate = useNavigate();

    const entrar = async () => {

        try{

            const token = await loginClientes();

            localStorage.setItem("token", token);

            navigate("/dashboard");

        }catch(error){

            console.log(error);

            alert("Error login");
        }
    };

    return(

        <div className="clientes-container">

            <div className="login-card">

                <h1>ShopNow</h1>

                <h2>Gestión de Clientes</h2>

                <input
                    type="text"
                    placeholder="Usuario"
                    value="admin"
                    readOnly
                />

                <input
                    type="password"
                    placeholder="Contraseña"
                    value="admin123"
                    readOnly
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

export default ClientesLogin;