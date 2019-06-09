import * as React from "react";

export interface IDeviceProps {
    data: any
}

export default class Device extends React.PureComponent<IDeviceProps> {
    render() {
        //         this.props.data.name
        // "810de"
        // this.props.data.state

        return <div className="device col-lg-4">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{this.props.data.name}</h5>

                </div>
            </div>
        </div>;
    }
}