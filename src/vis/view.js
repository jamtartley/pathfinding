import Raphael from "../lib/raphael.js";
import Grid from "../core/grid.js";

export default class View {
    constructor(grid) {
        this.grid = grid;
        this.paper = Raphael("grid-area");
        this.size = 40;
        this.fill = "white";
        this.strokeOpacity = "grey";
        this.nodeStateStyles = {
            "empty": {
                fill: "white",
                "stroke-opacity": 0.2
            }
        };

        this.paper.setSize(this.grid.width * this.size, this.grid.height * this.size);
        this.render();
    }

    render() {
        for (let node of this.grid.nodes) {
            let rect = this.paper.rect(node.x * this.size, node.y * this.size, this.size, this.size);
            rect.attr(this.nodeStateStyles[node.state]);
        }
    }
};
