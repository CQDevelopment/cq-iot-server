import * as React from "react";

import Model from "../../../objects/model";
import Log, { ILogProps } from "../../agnostic/log/log";

import "./wrapper.scss";

export interface IWrapperProps {
    model: Model
}

export interface IWrapperState {
    logProps: ILogProps
}

export default class Wrapper extends React.Component<IWrapperProps, IWrapperState> {
    state: IWrapperState = {
        logProps: {
            messages: []
        }
    };

    componentDidMount() {
        this.props.model.registerSubscriber({
            name: 'log',
            callback: () => {
                console.log('xxx');

                this.setState({
                    logProps: {
                        ...this.state.logProps,
                        messages: this.props.model.log
                    }
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