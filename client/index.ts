import * as ReactDOM from "react-dom";
import * as React from "react";

import "bootstrap";
import "./style/style.scss";

import Wrapper from "./components/implementation/wrapper/wrapper";
import Model from "./objects/model";

const model = new Model();

ReactDOM.render(
    React.createElement(Wrapper, { model: model }),
    document.getElementById("wrapper"));