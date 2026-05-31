# ==========================================================
# LÓGICA DE NEGOCIO - PRODUCTOS
# ==========================================================

from db.connection import get_connection


# ==========================================================
# OBTENER TODOS LOS PRODUCTOS
# ==========================================================
def obtener_productos():

    conn = get_connection()
    cur = conn.cursor()

    # ======================================================
    # USANDO FUNCTION DE POSTGRESQL
    # ======================================================
    cur.execute("""
        SELECT * FROM rd_productos_listar()
        ORDER BY id_producto ASC
    """)

    rows = cur.fetchall()

    cur.close()
    conn.close()

    return [
        {
            "idproducto": r[0],
            "descripcion": r[1],
            "precio": float(r[2]),
            "activo": r[3]
        }
        for r in rows
    ]


# ==========================================================
# OBTENER PRODUCTO POR ID
# ==========================================================
def obtener_producto(idproducto):

    conn = get_connection()
    cur = conn.cursor()

    # ======================================================
    # OBTENER PRODUCTO POR ID DESDE FUNCTION
    # ======================================================
    cur.execute("""
        SELECT * FROM rd_productos_obtenerporid(%s)
    """, (idproducto,))

    row = cur.fetchone()

    cur.close()
    conn.close()

    if not row:
        return None

    return {
        "idproducto": row[0],
        "descripcion": row[1],
        "precio": float(row[2]),
        "activo": row[3]
    }


# ==========================================================
# CREAR PRODUCTO
# ==========================================================
def crear_producto(p):

    conn = get_connection()
    cur = conn.cursor()

    # ======================================================
    # INSERTAR PRODUCTO USANDO FUNCTION
    # ======================================================
    cur.execute("""
        SELECT * FROM rd_productos_agregar(%s,%s)
    """, (
        p.descripcion,
        p.precio
    ))

    conn.commit()

    cur.close()
    conn.close()


# ==========================================================
# ACTUALIZAR PRODUCTO
# ==========================================================
def actualizar_producto(idproducto, p):

    conn = get_connection()
    cur = conn.cursor()

    # ======================================================
    # ACTUALIZAR PRODUCTO USANDO FUNCTION
    # ======================================================
    cur.execute("""
        SELECT * FROM rd_productos_actualizar(%s,%s,%s,%s)
    """, (
        idproducto,
        p.descripcion,
        p.precio,
        p.activo
    ))

    conn.commit()

    cur.close()
    conn.close()


# ==========================================================
# ELIMINAR PRODUCTO
# ==========================================================
def eliminar_producto(idproducto):

    conn = get_connection()
    cur = conn.cursor()

    # ======================================================
    # ELIMINAR PRODUCTO USANDO FUNCTION
    # ======================================================
    cur.execute("""
        SELECT * FROM rd_productos_eliminar(%s)
    """, (
        idproducto,
    ))

    conn.commit()

    cur.close()
    conn.close()