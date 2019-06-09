export interface ISubscriber {
    name: string
    callback: () => void
}

export default class Model {
    socket: SocketIOClient.Socket;

    subscribers: ISubscriber[] = [];
    log: string[] = [];

    devices: any[] = [];

    registerSubscriber(subscriber: ISubscriber) {
        this.subscribers.push(subscriber);
    }

    fire(name: string) {
        this.subscribers.forEach(subscriber => {
            if (subscriber.name !== name) {
                return;
            }

            subscriber.callback();
        });
    }

    event_log(message: string) {
        this.log.push(message);

        while (this.log.length > 5) {
            this.log.splice(0, 1);
        }

        this.fire('log');
    }

    event_devices(devices: any[]) {
        this.devices = devices;

        this.fire('devices');
    }

    constructor() {
        this.socket = io();

        this.socket.on('log', this.event_log.bind(this));
        this.socket.on('devices', this.event_devices.bind(this));
    }
}