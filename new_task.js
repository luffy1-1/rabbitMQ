#!/usr/bin/env node

const amqp = require('amqplib/callback_api');
const { getQuote } = require("node-quotegen");
const exitInMilliSec = process.env.EXIT_TIME || 50000
function randomIntFromInterval(min = 1, max = 10) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}
amqp.connect(process.env.AMQP_URL, function (error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }
        const queue = 'task_queue';
        channel.assertQueue(queue, {
            durable: true
        });
        for (let i = 0; i < 60000; i += 3) {
            setTimeout(function () {
                let messagePayload = {
                    message: getQuote(),
                    priority: randomIntFromInterval(),
                    timestamp: Date.now(),
                    order: i / 3
                }
                console.log(messagePayload)
                channel.sendToQueue(queue, Buffer.from(JSON.stringify(messagePayload)), {
                    persistent: true
                });
            }, i * 1000);
        }
    });
    setTimeout(function () {
        connection.close();
        process.exit(0);
    }, exitInMilliSec);
});