import Grid from "./core/grid.js";
import Controller from "./vis/controller.js";

window.addEventListener("DOMContentLoaded", (event) => {
    let g = new Grid(20, 20);
    let c = new Controller(g);
});
