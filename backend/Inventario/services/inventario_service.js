const pool = require("../db/connection");


// ======================================================
// OBTENER INVENTARIO
// ======================================================

async function obtenerInventario() {

    const res = await pool.query(`
        SELECT * FROM rd_inventario_listar()
    `);

    return res.rows;
}


// ======================================================
// OBTENER INVENTARIO POR PRODUCTO
// ======================================================

async function obtenerPorProducto(idproducto) {

    const res = await pool.query(
        `
        SELECT * FROM rd_inventario_obtenerporproducto($1)
        `,
        [
            idproducto
        ]
    );

    return res.rows[0];
}


// ======================================================
// CREAR / INGRESAR STOCK
// ======================================================

async function crearInventario(i) {

    const res = await pool.query(
        `
        SELECT * FROM rd_inventario_agregar($1,$2)
        `,
        [
            i.idproducto,
            i.cantidad
        ]
    );

    return res.rows[0];
}


// ======================================================
// ACTUALIZAR INVENTARIO
// ======================================================

async function actualizarInventario(id, i) {

    const res = await pool.query(
        `
        SELECT * FROM rd_inventario_actualizar($1,$2)
        `,
        [
            id,
            i.cantidad
        ]
    );

    return res.rows[0];
}


// ======================================================
// ELIMINAR INVENTARIO
// ======================================================

async function eliminarInventario(id) {

    const res = await pool.query(
        `
        SELECT * FROM rd_inventario_eliminar($1)
        `,
        [
            id
        ]
    );

    return res.rows[0];
}


module.exports = {
    obtenerInventario,
    obtenerPorProducto,
    crearInventario,
    actualizarInventario,
    eliminarInventario
};