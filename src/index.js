import Grid from "./logic/grid.js";
import * as Utils from "./logic/utils.js";

import store from "./redux/store.js";

import Controller from "./presentation/controller.js";

import React from "react";
import ReactDOM from "react-dom";

import ControlPanel from "./presentation/components/control_panel.js";

window.addEventListener("DOMContentLoaded", (event) => {
    let grid = new Grid(30, 20);
    let controller = new Controller(grid);
    let start = { x: Utils.getRandInt(0, grid.width - 1), y: Utils.getRandInt(0, grid.height - 1) };
    let end = { x: Utils.getRandInt(0, grid.width - 1), y: Utils.getRandInt(0, grid.height - 1) };

    while (end.x === start.x && end.y === start.y) end = { x: Utils.getRandInt(0, grid.width - 1), y: Utils.getRandInt(0, grid.height - 1) };

    controller.setStart(grid.getNodeAt(start.x, start.y));
    controller.setEnd(grid.getNodeAt(end.x, end.y));

    $("#control-panel").draggable({
        addClasses: true
    });

    ReactDOM.render(<ControlPanel controller={controller}/>, document.getElementById("control-panel"));
});
