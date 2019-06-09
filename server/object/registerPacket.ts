import PacketBase from "./packetBase";

export default class RegisterPacket extends PacketBase {
    switchCount: number;
    sensorCount: number;
    pushCount: number;

    constructor(split: string[]) {
        super(split);

        this.switchCount = parseInt(split[2]);
        this.sensorCount = parseInt(split[3]);
        this.pushCount = parseInt(split[4]);
    }
}