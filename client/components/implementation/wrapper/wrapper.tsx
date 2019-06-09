import * as React from "react";

import Model from "../../../objects/model";
import Log, { ILogProps } from "../../agnostic/log/log";

import "./wrapper.scss";
import Device, { IDeviceProps } from "../../agnostic/device/device";

export interface IWrapperProps {
    model: Model
}

export interface IWrapperState {
    logProps: ILogProps
    devicesProps: IDeviceProps[]
}

export default class Wrapper extends React.Component<IWrapperProps, IWrapperState> {
    state: IWrapperState = {
        logProps: {
            messages: []
        },
        devicesProps: []
    };

    componentDidMount() {
        this.props.model.registerSubscriber({
            name: 'log',
            callback: () => {
                this.setState({
                    logProps: {
                        ...this.state.logProps,
                        messages: this.props.model.log
                    }
                });
            }
        });

        this.props.model.registerSubscriber({
            name: 'devices',
            callback: () => {
                const result: IDeviceProps[] = [];

                this.props.model.devices.forEach(device => {
                    result.push({
                        model: this.props.model,
                        device: device
                    });
                });

                this.setState({
                    devicesProps: result
                });
            }
        });
    }

    render() {
        return <div className="wrapper">
            <header>
                <div className="navbar navbar-dark bg-dark shadow-sm">
                    <div className="container d-flex justify-content-between">
                        <a href="#" className="navbar-brand d-flex align-items-center">
                            <strong>CQ IOT Dashboard</strong>
                        </a>
                    </div>
                </div>
            </header>

            <main role="main" className="wrapper__main">
                <div className="container">
                    <div className="row">
                        <Log {...this.state.logProps} />
                        {
                            this.state.devicesProps.map((deviceProps, index) => {
                                return <Device key={index} {...deviceProps} />
                            })
                        }
                    </div>
                </div>
            </main>

            <footer>
                <div className="container">
                </div>
            </footer>
        </div>;
    }
}