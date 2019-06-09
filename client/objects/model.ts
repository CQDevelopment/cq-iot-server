export interface ISubscriber {
    name: string
    callback: () => void
}

export default class Model {
    socket: SocketIOClient.Socket;

    subscribers: ISubscriber[] = [];
    log: string[] = [];

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

    constructor() {
        this.socket = io();

        this.socket.on('log', this.event_log.bind(this));
    }
}