import Model from "./model";

export default abstract class ServerBase {
    serverName: string;
    model: Model;

    constructor(serverName: string, model: Model) {
        this.serverName = serverName;
        this.model = model;
    }

    log(message: string) {
        const result = `[${new Date().toISOString()}] ${this.serverName}: ${message}`;
        console.log(result);

        this.model.fire({ key: 'log', data: result });
    };
}