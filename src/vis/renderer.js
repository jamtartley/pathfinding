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

const wallEffect = {
    duration: 150,
    transform: "s0.6",
    transformBack: "s1"
};

const clearEffect = {
    duration: 150,
    transform: "s0.6",
    transformBack: "s1"
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
        let rect = this.nodeRectMap.get(node);
        rect.attr(nodeTypeStyles[node.state]);

        if (node.state === NodeType.WALL) {
            rect.attr({transform: wallEffect.transform}).animate({transform: wallEffect.transformBack}, wallEffect.duration);
        } else if (node.state == NodeType.EMPTY) {
            rect.attr({transform: clearEffect.transform}).animate({transform: clearEffect.transformBack}, clearEffect.duration);
        }
    }
};
