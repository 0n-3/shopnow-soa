# ==========================================================
# LÓGICA DE NEGOCIO - CLIENTES
# ==========================================================

from db.connection import get_connection


# ==========================================================
# OBTENER TODOS LOS CLIENTES
# ==========================================================
def obtener_clientes():

    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
        SELECT
            id_cliente,
            nombre,
            correo,
            direccion,
            telefono
        FROM clientes
        ORDER BY id_cliente ASC
    """)

    rows = cur.fetchall()

    cur.close()
    conn.close()

    return [
        {
            "idcliente": r[0],
            "nombre": r[1],
            "correo": r[2],
            "direccion": r[3],
            "telefono": r[4]
        }
        for r in rows
    ]


# ==========================================================
# OBTENER CLIENTE POR ID
# ==========================================================
def obtener_cliente(idcliente):

    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
        SELECT
            id_cliente,
            nombre,
            correo,
            direccion,
            telefono
        FROM clientes
        WHERE id_cliente=%s
    """, (idcliente,))

    row = cur.fetchone()

    cur.close()
    conn.close()

    if not row:
        return None

    return {
        "idcliente": row[0],
        "nombre": row[1],
        "correo": row[2],
        "direccion": row[3],
        "telefono": row[4]
    }


# ==========================================================
# CREAR CLIENTE
# ==========================================================
def crear_cliente(c):

    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
        SELECT rd_clientes_agregar(%s,%s,%s,%s)
    """, (
        c.nombre,
        c.correo,
        c.direccion,
        c.telefono
    ))

    conn.commit()

    cur.close()
    conn.close()


# ==========================================================
# ACTUALIZAR CLIENTE
# ==========================================================
def actualizar_cliente(idcliente, c):

    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
        SELECT * FROM rd_clientes_actualizar(%s,%s,%s,%s,%s,%s)
    """, (
        idcliente,
        c.nombre,
        c.correo,
        c.direccion,
        c.telefono,
        c.activo
    ))

    conn.commit()

    cur.close()
    conn.close()


# ==========================================================
# ELIMINAR CLIENTE
# ==========================================================
def eliminar_cliente(idcliente):

    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
        SELECT rd_clientes_eliminar(%s)
    """, (
        idcliente,
    ))

    conn.commit()

    cur.close()
    conn.close()