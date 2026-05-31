import { useNavigate } from "react-router-dom";

import { loginProductos } from "../../services/productosService";

import "../../styles/productos.css";

function ProductosLogin() {

    const navigate = useNavigate();

    const entrar = async () => {

        try{

            const token = await loginProductos();

            localStorage.setItem("token", token);

            navigate("/dashboard");

        }catch(error){

            alert("Error login");
        }
    };

    return(

        <div className="productos-container">

            <div className="login-card">

                <h1>ShopNow</h1>

                <h2>Gestión de Productos</h2>

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

export default ProductosLogin;