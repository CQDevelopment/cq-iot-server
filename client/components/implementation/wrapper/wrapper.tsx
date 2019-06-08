import * as React from "react";
import "./wrapper.scss";

export default class Wrapper extends React.Component {
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
                    Hello, World!
                </div>
            </main>

            <footer>
                <div className="container">
                </div>
            </footer>
        </div>;
    }
}