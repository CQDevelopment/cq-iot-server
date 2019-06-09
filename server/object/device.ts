import RegisterPacket from "./registerPacket";
import * as WebSocket from "ws";

export interface IDeviceState {
    switches: boolean[];
}

export default class Device {
    registerPacket: RegisterPacket;
    socket: WebSocket;
    name: string;

    state: IDeviceState;

    constructor(socket: WebSocket, registerPacket: RegisterPacket) {
        this.socket = socket;
        this.registerPacket = registerPacket;

        this.name = this.registerPacket.deviceId;

        this.state = {
            switches: new Array(this.registerPacket.switchCount)
        };
    }

    // updateState() {
    //     this.socket.send('')
    // }
}