import Store from "./store";
import Device from "./device";
import IEvent from "./IEvent";

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

    registerDevice(device: Device) {
        this.store.ensureDevice(device);
        this.sendDevices();
    }
}