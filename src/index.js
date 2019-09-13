import Grid from "core/grid.js";

import store from "redux/store.js";

import Controller from "view/controller.js";

import React from "react";
import ReactDOM from "react-dom";

import GeneratorPanel from "view/components/generator/generator_panel.js";
import SolverPanel from "view/components/solver/solver_panel.js";

window.addEventListener("DOMContentLoaded", (event) => {
    let grid = new Grid(25, 25);
    let controller = new Controller(grid);

    $("#solver-panel").draggable({
        addClasses: true
    });

    $("#generator-panel").draggable({
        addClasses: true
    });

    ReactDOM.render(<GeneratorPanel controller={controller}/>, document.getElementById("generator-panel"));
    ReactDOM.render(<SolverPanel controller={controller}/>, document.getElementById("solver-panel"));
});
