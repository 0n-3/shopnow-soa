import {Routes,Route}
from "react-router-dom";

import InventarioLogin from "./pages/inventario/InventarioLogin";
import InventarioDashboard from "./pages/inventario/InventarioDashboard";

import InventarioGet from "./pages/inventario/InventarioGet";

import InventarioGetOne from "./pages/inventario/InventarioGetOne";

import InventarioPost from "./pages/inventario/InventarioPost";

import InventarioPatch from "./pages/inventario/InventarioPatch";

import InventarioDelete from "./pages/inventario/InventarioDelete";


function App(){

return(

<Routes>

<Route
path="/"
element={<InventarioLogin/>}
/>

<Route
path="/dashboard"
element={<InventarioDashboard/>}
/>

<Route
path="/get"
element={<InventarioGet/>}
/>

<Route
path="/getone"
element={<InventarioGetOne/>}
/>

<Route
path="/post"
element={<InventarioPost/>}
/>

<Route
path="/patch"
element={<InventarioPatch/>}
/>

<Route
path="/delete"
element={<InventarioDelete/>}
/>

</Routes>

);

}

export default App;