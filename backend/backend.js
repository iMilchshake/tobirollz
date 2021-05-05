const ws = require('ws');
const dice = require('./dicing.js')
const express = require('express');
const app = express();

// messages are saved using runtime variables
let message_log = []
let message_counter = 0;
const getMessageLog = function () {
    return JSON.stringify({
        type: "log",
        log: message_log.slice(0, 20)
    });
}

// setup websocket server
const wsServer = new ws.Server({noServer: true});
wsServer.on('connection', socket => {
    console.log(new Date().toLocaleString('de-DE') + " - new connection, sending log..");

    // send new clients previous chat log
    socket.send(getMessageLog());

    // setup message response
    socket.on('message', message => {
            let msg_obj = JSON.parse(message);

            // apply dicing
            msg_obj.message = dice.applyDice(msg_obj.message);

            // add message to message log
            console.log(new Date().toLocaleString('de-DE') + " - " + msg_obj.user + ": " + msg_obj.message);
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

// host server on port 3000
const server = app.listen(3000);
console.log("server listening at port 3000");
server.on('upgrade', (request, socket, head) => {
    wsServer.handleUpgrade(request, socket, head, socket => {
        wsServer.emit('connection', socket, request);
    });
});
