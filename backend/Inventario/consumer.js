const amqp = require("amqplib");

async function consumir() {

    try {

        console.log("Intentando conectar RabbitMQ...");
        console.log("RABBIT_URL:", process.env.RABBIT_URL);

        const conexion = await amqp.connect(
            process.env.RABBIT_URL
        );

        const canal = await conexion.createChannel();

        await canal.assertQueue(
            "pedidos",
            {
                durable: true
            }
        );

        console.log("RabbitMQ conectado");
        console.log("Inventario escuchando cola pedidos");

        canal.consume(
            "pedidos",
            async (msg) => {

                try {

                    if (!msg) {
                        return;
                    }

                    const mensaje = JSON.parse(
                        msg.content.toString()
                    );

                    console.log("================================");
                    console.log("EVENTO RECIBIDO EN INVENTARIO DESDE COLA PEDIDOS");
                    console.log(mensaje);
                    console.log("================================");

                    /*
                        IMPORTANTE:
                        Este consumer solo escucha eventos de pedidos.

                        No actualiza inventario aquí.

                        El stock se actualiza desde el endpoint:
                        PATCH /v1/inventario/:id
                    */

                    canal.ack(msg);

                } catch (error) {

                    console.log("Error procesando mensaje de RabbitMQ");
                    console.log(error.message);

                    canal.ack(msg);
                }
            }
        );

    } catch (error) {

        console.log("RabbitMQ no disponible");
        console.log(error.message);
    }
}

module.exports = consumir;