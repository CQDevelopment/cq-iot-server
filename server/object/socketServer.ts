import ServerBase from "./serverBase";
import Model from "./model";

import * as WebSocket from "ws";
import RegisterPacket from "./registerPacket";
import Device from "./device";

export default class SocketServer extends ServerBase {
    port: number;
    webSocketServer: WebSocket.Server;

    processMessage(socket: WebSocket, message: string) {
        this.log(`Received: ${message}`);

        const split = message.split(',');

        if (message.startsWith('register')) {
            const registerPacket = new RegisterPacket(split);
            const device = new Device(socket, registerPacket);

            this.model.registerDevice(device);
            this.log(registerPacket.getJson());

            return;
        }
    };

    constructor(port: number, model: Model) {
        super("SCK", model);

        this.log(`Initialising socket server on port ${port}`);

        this.webSocketServer = new WebSocket.Server({ port: port });

        this.webSocketServer.on('connection', (socket: WebSocket) => {
            this.log('Client connected');

            socket.on('message', (message: string) => {
                try {
                    this.processMessage(socket, message);
                } catch (exception) {
                    this.log('Error: ' + exception);
                }
            });

            socket.on('close', () => {
                this.log('Client disconnected');
            });

            socket.on('error', this.log);
        });
    }
}