const ws = require('ws');
const dice = require('./dicing.js')
const express = require('express');
const app = express();

// messages are saved using runtime variables
let message_log = []
let message_counter = 0;

// define backend responses
const sendResponse = function (type) {
    switch (type) {
        case 'log':
            return JSON.stringify({
                type: "log",
                content: message_log.slice(0, 15)
            });
        case 'invalid':
            return JSON.stringify({
                type: "error",
                content: "invalid request"
            });
        default:
            throw Error("invalid response-type");
    }
}

const getDateString = function () {
    return new Date().toLocaleString('de-DE');
}

// setup websocket server
const wsServer = new ws.Server({noServer: true});
wsServer.on('connection', socket => {
    console.log(getDateString(), "new connection, sending log..");

    // send new clients previous chat log
    socket.send(sendResponse('log'));

    // setup message response
    socket.on('message', message => {
        try {
            // parse message to json
            let msg_obj = JSON.parse(message);

            // react to message
            switch (msg_obj.type) {
                case 'message':
                    // apply dicing to message
                    msg_obj.content.message = dice.applyDice(msg_obj.content.message);

                    // add message to message log
                    console.log(getDateString(), msg_obj.content.user + ": " + msg_obj.content.message);
                    msg_obj.content.id = message_counter++;
                    message_log.unshift(msg_obj.content);

                    // broadcast message_log to every user
                    wsServer.clients.forEach(function each(client) {
                        if (client.readyState === ws.OPEN) {
                            client.send(sendResponse('log'));
                        }
                    });
                    break;
                case 'stay_alive':
                    console.log(getDateString(), "stay_alive requested");
                    break;
                default:
                    socket.send(sendResponse('invalid'));
                    break;
            }
        } catch (e) {
            console.error(getDateString(), "Invalid Request!", e);
        }
    });
});

// host server on port 3000
const server = app.listen(3000);
console.log("server listening at port 3000");
server.on('upgrade', (request, socket, head) => {
    wsServer.handleUpgrade(request, socket, head, socket => {
        wsServer.emit('connection', socket, request);
    });
});
