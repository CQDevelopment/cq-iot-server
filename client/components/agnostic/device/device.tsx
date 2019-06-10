import * as React from "react";
import Model from "../../../objects/model";
import "./device.scss";

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
            let buttonClass = 'btn btn-lg ';
            buttonClass += value ? 'btn-success' : 'btn-danger';

            return <button
                key={index}
                type="button"
                className={buttonClass}
                onClick={() => { this.switchClick.bind(this)(index, value) }}>
                {index + 1}
            </button>;
        });

        return <div className="device col-lg-3">
            <div className="device__card card">
                <div className="device__card__body card-body">
                    <h5 className="card-title">{this.props.device.name}</h5>
                    <form className="device__card__body__switchers">
                        {switchers}
                    </form>
                </div>
            </div>
        </div >;
    }
}