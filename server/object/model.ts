import Store from "./store";
import Device from "./device";
import IEvent from "./IEvent";
import SwitchPacket from "./switchPacket";

export default class Model {
    subscribers: ((event: IEvent) => void)[] = [];
    store: Store;

    constructor() {
        this.store = Store.Load();
    }

    registerSubscriber(callback: (event: IEvent) => void) {
        this.subscribers.push(callback);
    }

    fire(event: IEvent) {
        this.subscribers.forEach(subscriber => {
            subscriber(event);
        })
    }

    sendDevices() {
        this.fire({ key: 'devices', data: this.store.devices });
    }

    updateDeviceState(device: Device) {
        this.fire({ key: 'deviceState', data: device })
    }

    registerDevice(device: Device) {
        this.store.ensureDevice(device);

        this.updateDeviceState(device);
        this.sendDevices();
    }

    handleSwitch(switchPacket: SwitchPacket) {
        this.store.updateSwitch(switchPacket);
        this.sendDevices();
    }

    handleSwitchUpdate(deviceId: string, index: number, state: boolean) {
        const device = this.store.getDeviceById(deviceId);

        if (!device) {
            return;
        }

        device.socket.send(`setSwitch,${index},${state ? 1 : 0}`);
    }
}