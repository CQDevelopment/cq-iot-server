import ServerBase from "./serverBase";
import Model from "./model";

import * as Path from "path";
import * as Express from "express";
import * as Http from "http";
import * as SocketIo from "socket.io";
import IEvent from "./IEvent";

export default class WebServer extends ServerBase {
    io: SocketIo.Server;

    fire(event: IEvent) {
        this.io.emit(event.key, event.data);
    }

    constructor(port: number, model: Model) {
        super('WEB', model);

        this.log(`Initialising web server on port ${port}`);

        const app = Express();
        const http = Http.createServer(app);

        this.io = SocketIo(http);
        this.model.registerSubscriber(this.fire.bind(this));

        app.use(Express.static(Path.join(__dirname, '../../client')));

        app.get('/', (request, response) => {
            response.sendFile(Path.join(__dirname, '../../client', 'index.html'));
        });

        http.listen(port, () => {
            this.log('Listening on ' + port);
        });

        this.io.on('connection', (socket) => {
            this.log('User connected, sending devices');
            this.model.sendDevices();
        });
    }
}