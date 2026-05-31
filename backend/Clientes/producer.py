import pika
import json
import os
from dotenv import load_dotenv

load_dotenv()

def enviar_mensaje(mensaje):

    try:

        print(
            "Conectando Rabbit:",
            os.getenv("RABBIT_URL")
        )

        parametros = pika.URLParameters(
            os.getenv("RABBIT_URL")
        )

        conexion = pika.BlockingConnection(
            parametros
        )

        canal = conexion.channel()

        canal.queue_declare(
            queue='clientes'
        )

        canal.basic_publish(

            exchange='',

            routing_key='clientes',

            body=json.dumps(
                mensaje
            )

        )

        print(
            "Mensaje enviado a RabbitMQ"
        )

        conexion.close()

    except Exception as e:

        print(
            "RabbitMQ no disponible"
        )

        print(e)