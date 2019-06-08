import * as WebSocket from "ws";

export default class SocketServer {
    port: number;
    webSocketServer: WebSocket.Server;

    log(message: string) {
        console.log(`SERVER-SCK: ${message}`);
    };

    processMessage(message: string) {
        this.log(`Received: ${message}`);
    };

    constructor(port: number) {
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