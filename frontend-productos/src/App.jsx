import { Routes, Route } from "react-router-dom";

import ProductosLogin from "./pages/productos/ProductosLogin";
import ProductosDashboard from "./pages/productos/ProductosDashboard";

import ProductosGet from "./pages/productos/ProductosGet";
import ProductosPost from "./pages/productos/ProductosPost";
import ProductosPatch from "./pages/productos/ProductosPatch";
import ProductosDelete from "./pages/productos/ProductosDelete";
import ProductosGetOne from "./pages/productos/ProductosGetOne";

function App() {

  return (

    <Routes>

      {/* LOGIN */}
      <Route
        path="/"
        element={<ProductosLogin />}
      />

      {/* DASHBOARD */}
      <Route
        path="/dashboard"
        element={<ProductosDashboard />}
      />

      {/* ENDPOINTS */}
      <Route
        path="/get"
        element={<ProductosGet />}
      />

      <Route
        path="/getone"
        element={<ProductosGetOne />}
      />

      <Route
        path="/post"
        element={<ProductosPost />}
      />

      <Route
        path="/patch"
        element={<ProductosPatch />}
      />

      <Route
        path="/delete"
        element={<ProductosDelete />}
      />

    </Routes>
  );
}

export default App;