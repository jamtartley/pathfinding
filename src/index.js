import Grid from "./logic/grid.js";
import * as Utils from "./logic/utils.js";
import Controller from "./vis/controller.js";

window.addEventListener("DOMContentLoaded", (event) => {
    let grid = new Grid(30, 20);
    let controller = new Controller(grid);

    let start = { x: Utils.getRandInt(0, grid.width - 1), y: Utils.getRandInt(0, grid.height - 1) };
    let end = { x: Utils.getRandInt(0, grid.width - 1), y: Utils.getRandInt(0, grid.height - 1) };
    while (end.x === start.x && end.y === start.y) end = { x: Utils.getRandInt(5, 20), y: Utils.getRandInt(5, 15) };

    controller.setStart(grid.getNodeAt(start.x, start.y));
    controller.setEnd(grid.getNodeAt(end.x, end.y));
});
