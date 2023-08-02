#!/usr/bin/env node

const amqp = require('amqplib/callback_api');
const io = require("socket.io")(4000, {
    cors: {
        origin: '*'
    }
})
const PRIORITY_LIMIT = 7

// executes after connection is established
io.on('connection', socket => {
    let check = true
    console.log("a user connected")
    amqp.connect(process.env.AMQP_URL, function (error, connection) {
        connection.createChannel(function (error, channel) {
            const queue = 'task_queue';
            channel.assertQueue(queue, {
                durable: true
            });
            channel.prefetch(1); // won't consume more than 1 message from queue unless that message is acknowledged
            console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
            channel.consume(queue, function (msg) {
                let parsedMessage = JSON.parse(msg.content)
                console.log(" [x] Received", parsedMessage);
                if (parsedMessage.priority >= PRIORITY_LIMIT) {
                    io.emit('chat message', parsedMessage);
                }
                setTimeout(function () {
                    console.log(" [x] Done");
                    if (check)
                        channel.ack(msg);
                }, 1000);
            }, {
                noAck: false
            });

            // Handle disconnection
            socket.on('disconnect', () => {
                console.log('A user disconnected');
                check = false
            });
        });
    });
})
