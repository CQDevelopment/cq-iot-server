import Device from "./device";
import SwitchPacket from "./switchPacket";
import PacketBase from "./packetBase";

export default class Store {
    devices: Device[] = [];

    static Load(): Store {
        return new Store();
    }

    getDeviceById(id: string): Device {
        for (let i = 0; i < this.devices.length; i++) {
            const existingDevice = this.devices[i];

            if (id === existingDevice.registerPacket.deviceId) {
                return existingDevice;
            }
        }

        return null;
    }

    getDeviceByPacket(packet: PacketBase): Device {
        return this.getDeviceById(packet.deviceId);
    }

    ensureDevice(device: Device): Device {
        const existingDevice = this.getDeviceByPacket(device.registerPacket);

        if (existingDevice) {
            existingDevice.registerPacket = device.registerPacket;
            existingDevice.socket = device.socket;

            return;
        }

        this.devices.push(device);

        return device;
    }

    updateSwitch(switchPacket: SwitchPacket) {
        const existingDevice = this.getDeviceByPacket(switchPacket);

        if (!existingDevice) {
            return;
        }

        existingDevice.state.switches[switchPacket.index] = switchPacket.state;
    }
}