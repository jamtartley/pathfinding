import Raphael from "../lib/raphael.js";

import Grid from "../logic/grid.js";
import { NodeState, NodeType, WallDir } from "../logic/node.js";

const solvedLine = {
    stroke: "#ABB8C0",
    "stroke-width": 5,
    opacity: 0
};

const nodeTypeStyles = {
    [NodeType.NORMAL]: {
        fill: "#153042",
        stroke: false,
        "stroke-width": 2
    },
    [NodeType.START]: {
        fill: "#A95B56",
        stroke: false
    },
    [NodeType.END]: {
        fill: "#43834B",
        stroke: false
    }
};

const nodeStateStyles = {
    [NodeState.NONE]: nodeTypeStyles[NodeType.NORMAL],
    [NodeState.OPEN]: {
        fill: "#3A596C",
        stroke: false
    },
    [NodeState.CLOSED]: {
        fill: "#557182",
        stroke: false
    }
};

const failedState = {
    [NodeState.OPEN]: {
        fill: "#6C3A51"
    },
    [NodeState.CLOSED]: {
        fill: "#82556A"
    }
}

const successState = {
    [NodeState.OPEN]: {
        fill: "#3a6c56"
    },
    [NodeState.CLOSED]: {
        fill: "#55826F"
    }
}

const wallStroke = {
    stroke: "#244153",
    "stroke-width": 2
}

export default class Renderer {
    constructor(grid, size) {
        this.grid = grid;
        this.paper = Raphael("grid-area");
        this.size = size;
        this.fill = "white";
        this.strokeOpacity = "grey";
        this.nodeRectMap = new WeakMap();

        this.paper.setSize(this.grid.width * this.size, this.grid.height * this.size);

        this.controlPanels = [
            $("#solver-panel"),
            $("#generator-panel")
        ];

        this.drawMaze();
    }

    drawMaze() {
        for (let node of this.grid.nodes) {
            let x1 = node.x * this.size;
            let y1 = node.y * this.size;
            let x2 = x1 + this.size;
            let y2 = y1;
            let x3 = x2;
            let y3 = y1 + this.size;
            let x4 = x1;
            let y4 = y3;

            let path = `M${x1},${y1}L${x2},${y2}L${x3},${y3}L${x4},${y4}Z`;

            if (node.walls[WallDir.NORTH]) {
                this.paper.path(`M${x1},${y1}L${x2},${y2}`).attr(wallStroke);
            }
            if (node.walls[WallDir.EAST]) {
                this.paper.path(`M${x2},${y2}L${x3},${y3}`).attr(wallStroke);
            }
            if (node.walls[WallDir.SOUTH]) {
                this.paper.path(`M${x3},${y3}L${x4},${y4}`).attr(wallStroke);
            }
            if (node.walls[WallDir.WEST]) {
                this.paper.path(`M${x4},${y4}L${x1},${y1}`).attr(wallStroke);
            }

            let rect = this.paper.rect(node.x * this.size, node.y * this.size, this.size, this.size);
            this.nodeRectMap.set(node, rect); // Keep a map so we don't overwrite rects later when changing type

            this.changeType(node);
        }
    }

    changeType(node) {
        let rect = this.nodeRectMap.get(node);
        let style = nodeTypeStyles[node.type];

        switch (node.type) {
            case NodeType.NORMAL:
                rect.attr(style);
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
        if (node.type !== NodeType.NORMAL) return;

        let rect = this.nodeRectMap.get(node);
        let style = nodeStateStyles[state];

        rect.attr(style);
    }

    fadeInPanels() {
        const fadeInTime = 150;

        for (let panel of this.controlPanels) {
            panel.fadeIn(fadeInTime);
        }
    }

    fadeOutPanels() {
        const fadeOutTime = 150;

        for (let panel of this.controlPanels) {
            panel.fadeOut(fadeOutTime);
        }
    }

    showReplay(path, replayEventStack, onFinishCb) {
        const replayHz = 500;

        this.fadeOutPanels();

        for (let i = 0; i < replayEventStack.length; i++) {
            let r = replayEventStack[i];

            setTimeout(() => {
                this.showState(r.node, r.state);
                if (i === replayEventStack.length - 1) {
                    this.drawPath(path);
                    this.onFinish(replayEventStack[i].node === this.grid.end);

                    onFinishCb();
                    this.fadeInPanels();
                }
            }, i * (1000 / replayHz));
        }
    }

    onFinish(isSolved) {
        for (let node of this.grid.nodes) {
            if (node.type === NodeType.NORMAL) {
                let rect = this.nodeRectMap.get(node);
                rect.attr(isSolved ? successState[node.state] : failedState[node.state]);
            }
        }
    }

    reset() {
        this.clearPath();

        for (let node of this.grid.nodes) {
            this.showState(node, node.state);
        }
    }

    clearPath() {
        if (this.path) {
            this.path.remove();
        }
    }

    drawPath(path) {
        if (!path || path.length === 0) {
            return;
        }

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
