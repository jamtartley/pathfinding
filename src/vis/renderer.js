import Raphael from "../lib/raphael.js";
import Grid from "../core/grid.js";
import { NodeType } from "../core/node.js";

const nodeTypeStyles = {
    [NodeType.EMPTY]: {
        fill: "#153042",
        "stroke": "#244153"
    },
    [NodeType.WALL]: {
        fill: "#244153"
    },
    [NodeType.START]: {
        fill: "#425F1A",
    },
    [NodeType.END]: {
        fill: "#641B22",
    }
};

export default class Renderer {
    constructor(grid, size) {
        this.grid = grid;
        this.paper = Raphael("grid-area");
        this.size = size;
        this.fill = "white";
        this.strokeOpacity = "grey";
        this.nodeRectMap = new WeakMap();

        this.paper.setSize(this.grid.width * this.size, this.grid.height * this.size);

        for (let node of this.grid.nodes) {
            let rect = this.paper.rect(node.x * this.size, node.y * this.size, this.size, this.size);
            this.nodeRectMap.set(node, rect); // Keep a map so we don't overwrite rects later when changing state

            this.renderNode(node);
        }
    }

    renderNode(node) {
        this.nodeRectMap.get(node).attr(nodeTypeStyles[node.state]);
    }
};
