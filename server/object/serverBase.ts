export default abstract class ServerBase {
    serverName: string;

    constructor(serverName: string) {
        this.serverName = serverName;
    }

    log(message: string) {
        console.log(`${this.serverName}: ${message}`);
    };
}