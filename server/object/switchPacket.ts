import PacketBase from "./packetBase";

export default class SwitchPacket extends PacketBase {
    index: number;
    state: boolean;
    
    constructor(split: string[]) {
        super(split);

        this.index = parseInt(split[2]);
        this.state = parseInt(split[3]) == 1;
    }
}