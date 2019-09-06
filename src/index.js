import Grid from "./logic/grid.js";

import store from "./redux/store.js";

import Controller from "./presentation/controller.js";

import React from "react";
import ReactDOM from "react-dom";

import GeneratorPanel from "./presentation/components/generator/generator_panel.js";
import SolverPanel from "./presentation/components/solver/solver_panel.js";

window.addEventListener("DOMContentLoaded", (event) => {
    let grid = new Grid(30, 20);
    let controller = new Controller(grid);

    $("#solver-panel").draggable({
        addClasses: true
    });

    $("#generator-panel").draggable({
        addClasses: true
    });

    ReactDOM.render(<SolverPanel controller={controller}/>, document.getElementById("solver-panel"));
    ReactDOM.render(<GeneratorPanel controller={controller}/>, document.getElementById("generator-panel"));
});
