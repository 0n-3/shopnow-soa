import pika
import json
import os

from dotenv import load_dotenv

load_dotenv()


def enviar_mensaje(mensaje):

    try:

        rabbit_url = os.getenv("RABBIT_URL")

        print("Conectando Rabbit:", rabbit_url)

        if not rabbit_url:

            print("RABBIT_URL no está configurada")
            return

        parametros = pika.URLParameters(rabbit_url)

        conexion = pika.BlockingConnection(parametros)

        canal = conexion.channel()

        canal.queue_declare(
            queue="pedidos",
            durable=True
        )

        canal.basic_publish(
            exchange="",
            routing_key="pedidos",
            body=json.dumps(mensaje),
            properties=pika.BasicProperties(
                delivery_mode=2
            )
        )

        print("Mensaje enviado a cola pedidos")

        conexion.close()

    except Exception as e:

        print("RabbitMQ no disponible")
        print(e)