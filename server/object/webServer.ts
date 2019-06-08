import ServerBase from "./serverBase";

import * as Path from "path";
import * as Express from "express";
import * as Http from "http";
import * as SocketIo from "socket.io";

export default class WebServer extends ServerBase {
    constructor(port: number) {
        super('SERVER-WEB');

        this.log(`Initialising web server on port ${port}`);

        const app = Express();
        const http = Http.createServer(app);
        const io = SocketIo(http);

        app.get('/', (req, res) => {
            res.sendFile(Path.join(__dirname, '../../client', 'index.html'));
        });

        http.listen(port, () => {
            this.log('Listening on ' + port);
        });

        io.on('connection', (socket) => {
            this.log('User connected');
        });
    }
}