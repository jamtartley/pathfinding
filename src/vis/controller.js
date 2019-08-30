import Grid from "../core/grid.js";
import View from "./view.js";

export default class Controller {
    constructor(grid) {
        this.grid = grid;
        this.view = new View(grid);
    }
};
