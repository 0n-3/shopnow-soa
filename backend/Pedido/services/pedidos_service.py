# ==========================================================
# LÓGICA DE NEGOCIO - PEDIDOS
# ==========================================================

from db.connection import get_connection


# ==========================================================
# OBTENER TODOS LOS PEDIDOS
# ==========================================================
def obtener_pedidos():

    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
        SELECT * FROM rd_pedidos_listar()
    """)

    rows = cur.fetchall()

    cur.close()
    conn.close()

    return [

        {
            "idpedido": r[0],
            "idcliente": r[1],
            "idproducto": r[2],
            "cantidad": r[3],
            "created_at": str(r[4])
        }

        for r in rows
    ]


# ==========================================================
# CREAR PEDIDO
# ==========================================================
def crear_pedido(p):

    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
        SELECT * FROM rd_pedidos_agregar(
            %s,
            %s,
            %s
        )
    """, (

        p.idcliente,
        p.idproducto,
        p.cantidad

    ))

    resultado = cur.fetchone()

    conn.commit()

    cur.close()
    conn.close()

    return resultado[0]