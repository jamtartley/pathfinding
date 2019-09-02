import Raphael from "../lib/raphael.js";
import Grid from "../logic/grid.js";
import { NodeState, NodeType } from "../logic/node.js";

const strokeColour = "#244153";
const solvedLine = {
    stroke: "#ABB8C0",
    "stroke-width": 5,
    opacity: 0
};
const wallEffect = {
    duration: 150,
    transform: "s0.6",
    transformBack: "s1"
};

const nodeTypeStyles = {
    [NodeType.EMPTY]: {
        fill: "#153042",
        stroke: strokeColour
    },
    [NodeType.WALL]: {
        fill: "#081F2D",
        stroke: strokeColour
    },
    [NodeType.START]: {
        fill: "#43834B",
        stroke: strokeColour
    },
    [NodeType.END]: {
        fill: "#A95B56",
        stroke: strokeColour
    }
};

const nodeStateStyles = {
    [NodeState.NONE]: nodeTypeStyles[NodeType.EMPTY],
    [NodeState.OPEN]: {
        fill: "#3A596C",
        stroke: strokeColour
    },
    [NodeState.CLOSED]: {
        fill: "#557182",
        stroke: strokeColour
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
            this.nodeRectMap.set(node, rect); // Keep a map so we don't overwrite rects later when changing type
            this.changeType(node);
        }
    }

    changeType(node) {
        let rect = this.nodeRectMap.get(node);
        let style = nodeTypeStyles[node.type];

        switch (node.type) {
            case NodeType.EMPTY:
                rect.attr($.extend({}, style, {transform: wallEffect.transform}))
                    .animate({transform: wallEffect.transformBack}, wallEffect.duration);
                break;
            case NodeType.WALL:
                rect.attr($.extend({}, style, {transform: wallEffect.transform}))
                    .animate({transform: wallEffect.transformBack}, wallEffect.duration);
                break;
            case NodeType.START:
                rect.attr(style);
                break;
            case NodeType.END:
                rect.attr(style);
                break;
        }
    }

    showState(node, state) {
        if (node.type !== NodeType.EMPTY) return;

        let rect = this.nodeRectMap.get(node);
        let style = nodeStateStyles[state];

        rect.attr(style);
    }

    reset() {
        this.clearPath();

        for (let node of this.grid.nodes) {
            this.showState(node, node.state);
        }
    }

    clearPath() {
        if (this.path) this.path.remove();
    }

    drawPath(path) {
        if (!path || path.length === 0) return;

        let svg = this.createSvgFromPath(path);
        this.path = this.paper.path(svg).attr(solvedLine).animate({opacity: 1}, 250);
    }

    createSvgFromPath(path) {
        let pathLines = []
        let halfSize = this.size / 2;
        let origX = path[0].x * this.size + halfSize;
        let origY = path[0].y * this.size + halfSize;

        pathLines.push('M' + origX + " " + origY);

        for (let i = 1; i < path.length; i++) {
            let pX = path[i].x * this.size + halfSize;
            let pY = path[i].y * this.size + halfSize;

            pathLines.push('L' + pX + " " + pY);
        }

        return pathLines.join('');
    }
};
