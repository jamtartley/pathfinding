import Grid from "../logic/grid.js";
import * as Heuristics from "../logic/heuristics.js";
import { NodeType } from "../logic/node.js";
import Renderer from "./renderer.js";
import { find as AStarFind } from "../algorithms/a_star.js";
import { find as DijkstraFind } from "../algorithms/dijkstra.js";

const Action = Object.freeze({
    NONE: "none",
    DRAGGING_START: "dragging-start",
    DRAGGING_END: "dragging-end",
    PAINTING_BLOCKS: "painting-blocks",
    CLEARING_BLOCKS: "clearing-blocks"
});

export default class Controller {
    constructor(grid) {
        this.size = 40;
        this.action = Action.NONE;

        this.grid = grid;
        this.renderer = new Renderer(grid, this.size);
        this.opStack = [];

        for (let node of this.grid.nodes) {
            node.onTypeChange = this.renderer.changeType.bind(this.renderer);
            node.onStateChange = this.onStateChange.bind(this);
        }

        let gridArea = $("#grid-area");
        gridArea.mousedown($.proxy(this.mousedown, this));
        gridArea.mouseup($.proxy(this.mouseup, this));
        gridArea.mousemove($.proxy(this.mousemove, this));

        $("#search").mousedown($.proxy(this.search, this));
    }

    setStart(node) {
        if (this.grid.start) this.grid.start.setType(NodeType.EMPTY);
        this.grid.start = node;

        node.setType(NodeType.START);
    }

    setEnd(node) {
        if (this.grid.end) this.grid.end.setType(NodeType.EMPTY);
        this.grid.end = node;

        node.setType(NodeType.END);
    }

    getNodeAtPagePos(pageX, pageY) {
        let x = Math.floor(pageX / this.size);
        let y = Math.floor(pageY / this.size);
        return this.grid.getNodeAt(x, y);
    }

    onStateChange(node) {
        this.opStack.push({node:node, state:node.state});
    }

    search(event) {
        const opsHz = 200;

        this.grid.resetSearchDecorations();
        this.renderer.reset();
        this.opStack = [];

        let options = {
            heuristic: Heuristics.manhattan,
            shouldAllowDiag: true 
        };
        let path = AStarFind(this.grid, options);
        //let path = DijkstraFind(this.grid, options);

        for (let i = 0; i < this.opStack.length; i++) {
            let op = this.opStack[i];
            setTimeout(() => {
                this.renderer.showState(op.node, op.state); 
                if (path && i === this.opStack.length - 1) this.renderer.drawPath(path);
            }, i * (1000 / opsHz));
        }
    }

    actOnNode(node) {
        switch (this.action) {
            case Action.DRAGGING_START:
                if (node.type === NodeType.EMPTY) {
                    this.setStart(node);
                }
                break;
            case Action.DRAGGING_END:
                if (node.type === NodeType.EMPTY) {
                    this.setEnd(node);
                }
                break;
            case Action.PAINTING_BLOCKS:
                if (node.type === NodeType.EMPTY) {
                    node.setType(NodeType.BLOCK);
                }
                break;
            case Action.CLEARING_BLOCKS:
                if (node.type === NodeType.BLOCK) {
                    node.setType(NodeType.EMPTY);
                }
                break;
        }

    }

    mousedown(event) {
        let selectedNode = this.getNodeAtPagePos(event.pageX, event.pageY);

        if (selectedNode) {
            switch (selectedNode.type) {
                case NodeType.START:
                    this.action = Action.DRAGGING_START;
                    break;
                case NodeType.END:
                    this.action = Action.DRAGGING_END;
                    break;
                case NodeType.EMPTY:
                    this.action = Action.PAINTING_BLOCKS;
                    break;
                case NodeType.BLOCK:
                    this.action = Action.CLEARING_BLOCKS;
                    break;
            }

            this.grid.resetSearchDecorations();
            this.renderer.reset();
            this.actOnNode(selectedNode);
        }
    }

    mouseup(event) {
        let selectedNode = this.getNodeAtPagePos(event.pageX, event.pageY);
        this.action = Action.NONE;
    }

    mousemove(event) {
        let selectedNode = this.getNodeAtPagePos(event.pageX, event.pageY);
        if (!selectedNode) return;

        this.actOnNode(selectedNode);
    }
};
