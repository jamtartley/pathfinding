import Grid from "../core/grid.js";
import { NodeType } from "../core/node.js";
import Renderer from "./renderer.js";

const Action = Object.freeze({
    NONE: "none",
    DRAGGING_START: "dragging-start",
    DRAGGING_END: "dragging-end",
    PAINTING_WALLS: "painting-walls",
    CLEARING_WALLS: "clearing-walls"
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
        if (this.grid.start) this.grid.start.setState(NodeType.EMPTY);
        this.grid.start = node;

        node.setState(NodeType.START);
    }

    setEnd(node) {
        if (this.grid.end) this.grid.end.setState(NodeType.EMPTY);
        this.grid.end = node;

        node.setState(NodeType.END);
    }

    getNodeAtPagePos(pageX, pageY) {
        let x = Math.floor(pageX / this.size);
        let y = Math.floor(pageY / this.size);
        return this.grid.getNodeAt(x, y);
    }

    mousedown(event) {
        let selectedNode = this.getNodeAtPagePos(event.pageX, event.pageY);

        if (selectedNode) {
            switch (selectedNode.state) {
                case NodeType.START:
                    this.action = Action.DRAGGING_START;
                    break;
                case NodeType.END:
                    this.action = Action.DRAGGING_END;
                    break;
                case NodeType.EMPTY:
                    this.action = Action.PAINTING_WALLS;
                    break;
                case NodeType.WALL:
                    this.action = Action.CLEARING_WALLS;
                    break;
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

        switch (this.action) {
            case Action.DRAGGING_START:
                if (selectedNode.state === NodeType.EMPTY) {
                    this.setStart(selectedNode);
                }
                break;
            case Action.DRAGGING_END:
                if (selectedNode.state === NodeType.EMPTY) {
                    this.setEnd(selectedNode);
                }
                break;
            case Action.PAINTING_WALLS:
                if (selectedNode.state === NodeType.EMPTY) {
                    selectedNode.setState(NodeType.WALL);
                }
                break;
            case Action.CLEARING_WALLS:
                if (selectedNode.state === NodeType.WALL) {
                    selectedNode.setState(NodeType.EMPTY);
                }
                break;
        }
    }
};
