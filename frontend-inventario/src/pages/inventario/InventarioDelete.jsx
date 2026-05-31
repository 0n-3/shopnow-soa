import {useState} from "react";

import {useNavigate}
from "react-router-dom";

import {eliminarInventario}
from "../../services/inventarioService";

import "../../styles/inventario.css";


function InventarioDelete(){

const navigate=useNavigate();

const[idproducto,
setIdproducto]=useState("");


const eliminar=async()=>{

try{

const token=
localStorage.getItem(
"token"
);

const response=
await eliminarInventario(

idproducto,
token

);

alert(
response.mensaje
);

navigate(
"/dashboard"
);

}

catch(error){

console.log(
error
);

alert(
"Error DELETE"
);

}

};


return(

<div className="post-container">

<div className="post-card">

<button

className="back-btn"

onClick={()=>
navigate(
"/dashboard"
)
}

>

Regresar

</button>


<h1>

DELETE Inventario

</h1>


<input

type="number"

placeholder=
"ID Producto"

value=
{idproducto}

onChange={(e)=>

setIdproducto(

e.target.value

)

}

/>


<button

onClick={
eliminar
}

>

Eliminar

</button>

</div>

</div>

);

}

export default InventarioDelete;