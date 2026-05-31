const express = require("express");

const router = express.Router();

const service = require("../services/inventario_service");
const verificarToken = require("../auth");
const enviarMensaje = require("../producer");


// ======================================================
// GET INVENTARIO
// ======================================================

router.get("/v1/inventario", verificarToken, async (req, res) => {

    try {

        const data = await service.obtenerInventario();

        res.json(data);

    } catch (error) {

        console.log("Error en GET /v1/inventario");
        console.log(error.message);

        res.status(500).json({
            error: "Error al obtener inventario"
        });
    }

});


// ======================================================
// GET INVENTARIO POR PRODUCTO
// ======================================================

router.get("/v1/inventario/producto/:id", verificarToken, async (req, res) => {

    try {

        const data = await service.obtenerPorProducto(req.params.id);

        if (!data) {

            return res.status(404).json({
                error: "No encontrado"
            });
        }

        res.json(data);

    } catch (error) {

        console.log("Error en GET /v1/inventario/producto/:id");
        console.log(error.message);

        res.status(500).json({
            error: "Error al obtener inventario por producto"
        });
    }

});


// ======================================================
// CREAR / INGRESAR STOCK
// ======================================================

router.post("/v1/inventario", verificarToken, async (req, res) => {

    try {

        const resultado = await service.crearInventario(req.body);

        enviarMensaje({
            evento: "inventario_creado",
            data: req.body
        });

        res.json(resultado);

    } catch (error) {

        console.log("Error en POST /v1/inventario");
        console.log(error.message);

        res.status(500).json({
            error: "Error al crear inventario"
        });
    }

});


// ======================================================
// ACTUALIZAR INVENTARIO
// ======================================================

router.patch("/v1/inventario/:id", verificarToken, async (req, res) => {

    try {

        const resultado = await service.actualizarInventario(
            req.params.id,
            req.body
        );

        enviarMensaje({
            evento: "inventario_actualizado",
            data: {
                idproducto: Number(req.params.id),
                cantidad: req.body.cantidad
            }
        });

        res.json({
            mensaje: "actualizado",
            resultado: resultado
        });

    } catch (error) {

        console.log("Error en PATCH /v1/inventario/:id");
        console.log(error.message);

        res.status(500).json({
            error: "Error al actualizar inventario"
        });
    }

});


// ======================================================
// ELIMINAR INVENTARIO
// ======================================================

router.delete("/v1/inventario/:id", verificarToken, async (req, res) => {

    try {

        const resultado = await service.eliminarInventario(req.params.id);

        enviarMensaje({
            evento: "inventario_eliminado",
            data: {
                idproducto: Number(req.params.id)
            }
        });

        res.json({
            mensaje: "eliminado",
            resultado: resultado
        });

    } catch (error) {

        console.log("Error en DELETE /v1/inventario/:id");
        console.log(error.message);

        res.status(500).json({
            error: "Error al eliminar inventario"
        });
    }

});


// ======================================================
// V2 INVENTARIO
// ======================================================

router.get("/v2/inventario", verificarToken, async (req, res) => {

    try {

        const data = await service.obtenerInventario();

        const result = data.map(i => ({
            ...i,
            estado: i.cantidad > 0 ? "disponible" : "agotado",
            stock_bajo: i.cantidad <= 5
        }));

        res.json(result);

    } catch (error) {

        console.log("Error en GET /v2/inventario");
        console.log(error.message);

        res.status(500).json({
            error: "Error al obtener inventario v2"
        });
    }

});


module.exports = router;