import * as React from "react";
import Model from "../../../objects/model";

export interface IDeviceProps {
    device: any,
    model: Model
}

export default class Device extends React.PureComponent<IDeviceProps> {
    render() {
        

        return <div className="device col-lg-4">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{this.props.device.name}</h5>

                </div>
            </div>
        </div>;
    }
}