import ServerBase from "./serverBase";
import Model from "./model";

import * as WebSocket from "ws";
import RegisterPacket from "./registerPacket";

export default class SocketServer extends ServerBase {
    port: number;
    webSocketServer: WebSocket.Server;

    processMessage(message: string) {
        this.log(`Received: ${message}`);

        if (message.startsWith('register')) {
            const registerPacket = new RegisterPacket(message);

            this.log(registerPacket.getJson());
        }
    };

    constructor(port: number, model: Model) {
        super("SERVER-SCK", model);

        this.log(`Initialising socket server on port ${port}`);

        this.webSocketServer = new WebSocket.Server({ port: port });

        this.webSocketServer.on('connection', (socket) => {
            this.log('Client connected');

            socket.on('message', (message: string) => {
                try {
                    this.processMessage(message);
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