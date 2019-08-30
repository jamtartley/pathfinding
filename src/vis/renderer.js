import Raphael from "../lib/raphael.js";
import Grid from "../core/grid.js";
import { NodeState } from "../core/node.js";

export default class Renderer {
    constructor(grid, size) {
        this.grid = grid;
        this.paper = Raphael("grid-area");
        this.size = size;
        this.fill = "white";
        this.strokeOpacity = "grey";
        this.nodeRectMap = new WeakMap();
        this.nodeStateStyles = {
            [NodeState.EMPTY]: {
                fill: "white",
                "stroke-opacity": 0.2
            },
            [NodeState.START]: {
                fill: "blue",
                "stroke-opacity": 0
            },
            [NodeState.END]: {
                fill: "orange",
                "stroke-opacity": 0
            }
        };

        this.paper.setSize(this.grid.width * this.size, this.grid.height * this.size);

        for (let node of this.grid.nodes) {
            let rect = this.paper.rect(node.x * this.size, node.y * this.size, this.size, this.size);
            this.nodeRectMap.set(node, rect);

            this.renderNode(node);
        }
    }

    renderNode(node) {
        this.nodeRectMap.get(node).attr(this.nodeStateStyles[node.state]);
    }
};
