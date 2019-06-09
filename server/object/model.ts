export default class Model {
    subscribers: ((message: string) => void)[] = [];

    registerSubscriber(callback: (message: string) => void) {
        this.subscribers.push(callback);
    }

    fire(message: string) {
        this.subscribers.forEach(subscriber => {
            subscriber(message);
        })
    }
}