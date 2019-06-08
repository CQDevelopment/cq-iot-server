import * as ReactDOM from "react-dom";
import * as React from "react";

import "bootstrap";
import "./style/style.scss";

import Wrapper from "./components/implementation/wrapper/wrapper";

ReactDOM.render(
    React.createElement(Wrapper),
    document.getElementById("wrapper"));