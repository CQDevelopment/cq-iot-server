import * as React from "react";
import Model from "../../../objects/model";

export interface IDeviceProps {
    device: any,
    model: Model
}

export default class Device extends React.PureComponent<IDeviceProps> {
    switchClick(index: number, state: boolean) {
        state = !state;

        this.props.model.send_switch(
            this.props.device.registerPacket.deviceId,
            index, 
            state);
    }

    render() {
        const switchers = this.props.device.state.switches.map((value: boolean, index: number) => {
            const buttonClass = value ? 'btn btn-success' : 'btn btn-danger';

            return <div key={index} className="form-group row">
                <label className="col-form-label">{index + 1}</label>
                <button type="button" className={buttonClass} onClick={() => { this.switchClick.bind(this)(index, value) }}>{value ? 'On' : 'Off'}</button>
            </div>;
        });

        return <div className="device col-lg-4">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{this.props.device.name}</h5>
                    <form>
                        {switchers}
                    </form>
                </div>
            </div>
        </div >;
    }
}