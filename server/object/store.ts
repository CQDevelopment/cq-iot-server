import Device from "./device";

export default class Store {
    devices: Device[] = [];

    static Load(): Store {
        return new Store();
    }

    ensureDevice(device: Device): Device {
        for (let i = 0; i < this.devices.length; i++) {
            const existingDevice = this.devices[i];

            if (device.registerPacket.deviceId ===
                existingDevice.registerPacket.deviceId) {
                existingDevice.registerPacket = device.registerPacket;
                existingDevice.socket = device.socket;
            }

            return existingDevice;
        }

        this.devices.push(device);

        return device;
    }
}