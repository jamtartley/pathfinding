import Grid from "./core/grid.js";
import Controller from "./vis/controller.js";

window.addEventListener("DOMContentLoaded", (event) => {
    let grid = new Grid(40, 40);
    let controller = new Controller(grid);

    controller.setStart(grid.getNodeAt(7, 12));
    controller.setEnd(grid.getNodeAt(24, 12));
});
