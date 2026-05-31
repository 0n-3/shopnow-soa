import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import PedidosLogin from "./pages/pedidos/PedidosLogin";
import PedidosDashboard from "./pages/pedidos/PedidosDashboard";
import PedidosGet from "./pages/pedidos/PedidosGet";
import PedidosPost from "./pages/pedidos/PedidosPost";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<PedidosLogin />}
                />

                <Route
                    path="/dashboard"
                    element={<PedidosDashboard />}
                />

                <Route
                    path="/get"
                    element={<PedidosGet />}
                />

                <Route
                    path="/post"
                    element={<PedidosPost />}
                />

            </Routes>

        </BrowserRouter>

    );
}

export default App;