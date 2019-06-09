export default abstract class PacketBase {
    type: string;
    deviceId: string;

    constructor(split: string[]) {
        this.type = split[0];
        this.deviceId = split[1];
    }

    getJson(): string {
        return JSON.stringify(this);
    }
}