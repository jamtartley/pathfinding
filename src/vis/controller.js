import Grid from "../core/grid.js";
import { NodeState } from "../core/node.js";
import Renderer from "./renderer.js";

export default class Controller {
    constructor(grid) {
        this.size = 40;

        this.grid = grid;
        this.renderer = new Renderer(grid, this.size);

        for (let node of this.grid.nodes) {
            node.onStateChange = this.renderer.renderNode.bind(this.renderer);
        }

        $("#grid-area").mousedown($.proxy(this.mousedown, this));
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
        if (selectedNode) this.setStart(selectedNode);
    }
};
