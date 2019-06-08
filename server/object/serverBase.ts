import Model from "./model";

export default abstract class ServerBase {
    serverName: string;
    model: Model;

    constructor(serverName: string, model: Model) {
        this.serverName = serverName;
        this.model = model;
    }

    log(message: string) {
        console.log(`${this.serverName}: ${message}`);
    };
}