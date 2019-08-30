import Grid from "../core/grid.js";
import { NodeState } from "../core/node.js";
import Renderer from "./renderer.js";

const Action = Object.freeze({
    NONE: "none",
    DRAGGING_START: "dragging-start",
    DRAGGING_END: "dragging-end"
});

export default class Controller {
    constructor(grid) {
        this.size = 40;
        this.action = Action.NONE;

        this.grid = grid;
        this.renderer = new Renderer(grid, this.size);

        for (let node of this.grid.nodes) {
            node.onStateChange = this.renderer.renderNode.bind(this.renderer);
        }

        let gridArea = $("#grid-area");
        gridArea.mousedown($.proxy(this.mousedown, this));
        gridArea.mouseup($.proxy(this.mouseup, this));
        gridArea.mousemove($.proxy(this.mousemove, this));
    }

    setStart(node) {
        if (this.grid.start) this.grid.start.setState(NodeState.EMPTY);
        this.grid.start = node;

        node.setState(NodeState.START);
    }

    setEnd(node) {
        if (this.grid.end) this.grid.end.setState(NodeState.EMPTY);
        this.grid.end = node;

        node.setState(NodeState.END);
    }

    getNodeAtPagePos(pageX, pageY) {
        let x = Math.floor(pageX / this.size);
        let y = Math.floor(pageY / this.size);
        return this.grid.getNodeAt(x, y);
    }

    mousedown(event) {
        let selectedNode = this.getNodeAtPagePos(event.pageX, event.pageY);

        if (selectedNode) {
            if (selectedNode === this.grid.start) {
                this.action = Action.DRAGGING_START;
            } else if (selectedNode === this.grid.end) {
                this.action = Action.DRAGGING_END;
            }
        }
    }

    mouseup(event) {
        let selectedNode = this.getNodeAtPagePos(event.pageX, event.pageY);
        this.action = Action.NONE;
    }

    mousemove(event) {
        let selectedNode = this.getNodeAtPagePos(event.pageX, event.pageY);

        if (!selectedNode) return;
        if (selectedNode.state !== NodeState.EMPTY) return;

        if (this.action === Action.DRAGGING_START) {
            this.setStart(selectedNode);
        } else if (this.action === Action.DRAGGING_END) {
            this.setEnd(selectedNode);
        }
    }
};
