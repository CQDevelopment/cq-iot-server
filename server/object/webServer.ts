import ServerBase from "./serverBase";
import Model from "./model";

import * as Path from "path";
import * as Express from "express";
import * as Http from "http";
import * as SocketIo from "socket.io";

export default class WebServer extends ServerBase {
    constructor(port: number, model: Model) {
        super('SERVER-WEB', model);

        this.log(`Initialising web server on port ${port}`);

        const app = Express();
        const http = Http.createServer(app);
        const io = SocketIo(http);

        app.use(Express.static(Path.join(__dirname, '../../client')));

        app.get('/', (request, response) => {
            response.sendFile(Path.join(__dirname, '../../client', 'index.html'));
        });

        http.listen(port, () => {
            this.log('Listening on ' + port);
        });

        io.on('connection', (socket) => {
            this.log('User connected');
        });
    }
}