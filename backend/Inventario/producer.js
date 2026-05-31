const amqp = require("amqplib");

async function enviarMensaje(mensaje) {

    try {

        console.log("Conectando Rabbit:", process.env.RABBIT_URL);

        const conexion = await amqp.connect(
            process.env.RABBIT_URL
        );

        const canal = await conexion.createChannel();

        await canal.assertQueue(
            "inventario",
            {
                durable: true
            }
        );

        canal.sendToQueue(
            "inventario",
            Buffer.from(JSON.stringify(mensaje)),
            {
                persistent: true
            }
        );

        console.log("Mensaje enviado a cola inventario");

        await canal.close();
        await conexion.close();

    } catch (error) {

        console.log("RabbitMQ no disponible");
        console.log(error.message);
    }
}

module.exports = enviarMensaje;