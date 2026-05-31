import { Routes, Route } from "react-router-dom";

import ClientesLogin from "./pages/clientes/ClientesLogin";
import ClientesDashboard from "./pages/clientes/ClientesDashboard";
import ClientesGet from "./pages/clientes/ClientesGet";
import ClientesPost from "./pages/clientes/ClientesPost";
import ClientesPatch from "./pages/clientes/ClientesPatch";
import ClientesDelete from "./pages/clientes/ClientesDelete";

function App() {

  return (

    <Routes>

      <Route
        path="/"
        element={<ClientesLogin />}
      />

      <Route
        path="/dashboard"
        element={<ClientesDashboard />}
      />

      <Route
        path="/get"
        element={<ClientesGet />}
      />

      <Route
        path="/post"
        element={<ClientesPost />}
      />

      <Route
        path="/patch"
        element={<ClientesPatch />}
      />

      <Route
        path="/delete"
        element={<ClientesDelete />}
      />

    </Routes>
  );
}

export default App;