import Grid from "./logic/grid.js";

import store from "./redux/store.js";

import Controller from "./presentation/controller.js";

import React from "react";
import ReactDOM from "react-dom";

import ControlPanel from "./presentation/components/control_panel.js";

window.addEventListener("DOMContentLoaded", (event) => {
    let grid = new Grid(30, 20);
    let controller = new Controller(grid);

    $("#control-panel").draggable({
        addClasses: true
    });

    ReactDOM.render(<ControlPanel controller={controller}/>, document.getElementById("control-panel"));
});
