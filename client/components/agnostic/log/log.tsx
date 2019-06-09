import * as React from "react";

export interface ILogProps {
    messages: string[]
}

export default class Log extends React.Component<ILogProps> {
    render() {
        return <div className="log col-lg-12">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Log</h5>
                    {
                        this.props.messages.map((entry, index) => {
                            return <div key={index}>
                                {entry}
                            </div>;
                        })
                    }
                </div>
            </div>
        </div>;
    }
}