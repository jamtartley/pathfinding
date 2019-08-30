import Grid from "./core/grid.js";
import Controller from "./vis/controller.js";

window.addEventListener("DOMContentLoaded", (event) => {
    let grid = new Grid(20, 20);
    let controller = new Controller(grid);

    controller.setStart(grid.getNodeAt(5, 9));
    controller.setEnd(grid.getNodeAt(14, 9));
});
