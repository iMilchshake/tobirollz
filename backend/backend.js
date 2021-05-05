const express = require('express');
const ws = require('ws');
const dice = require('./dicing.js')

const app = express();
let message_log = []
let message_counter = 0;

const getMessageLog = function () {
    return JSON.stringify({
        type: "log",
        log: message_log.slice(0, 20)
    });
}

const wsServer = new ws.Server({noServer: true});
wsServer.on('connection', socket => {
    console.log("new connection, sending log..");
    socket.send(getMessageLog());

    // setup message response
    socket.on('message', message => {
            let msg_obj = JSON.parse(message);

            //apply dicing
            msg_obj.message = dice.applyDice(msg_obj.message);

            console.log(msg_obj.user + ": " + msg_obj.message);
            msg_obj.id = message_counter++;
            message_log.unshift(msg_obj);

            // broadcast message_log to every user
            wsServer.clients.forEach(function each(client) {
                if (client.readyState === ws.OPEN) {
                    client.send(getMessageLog());
                }
            });

        }
    );
});


const server = app.listen(3000);
server.on('upgrade', (request, socket, head) => {
    wsServer.handleUpgrade(request, socket, head, socket => {
        wsServer.emit('connection', socket, request);
    });
});