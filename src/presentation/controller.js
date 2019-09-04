import Renderer from "./renderer.js";

import Grid from "../logic/grid.js";
import * as Heuristics from "../logic/heuristics.js";
import { NodeType } from "../logic/node.js";

import { find as AStarFind } from "../algorithms/a_star.js";
import { find as DijkstraFind } from "../algorithms/dijkstra.js";

import store from "../redux/store.js";

const Action = Object.freeze({
    NONE: "none",
    DRAGGING_START: "dragging-start",
    DRAGGING_END: "dragging-end",
    PAINTING_BLOCKS: "painting-blocks",
    CLEARING_BLOCKS: "clearing-blocks",
    SEARCHING: "searching"
});

export const SearchType = Object.freeze({
    ASTAR: "astar",
    DIJKSTRA: "dijkstra"
});

const searchFunctionMap = {
    [SearchType.ASTAR]: AStarFind,
    [SearchType.DIJKSTRA]: DijkstraFind,
};

export default class Controller {
    constructor(grid) {
        this.size = 50;
        this.action = Action.NONE;

        this.grid = grid;
        this.renderer = new Renderer(grid, this.size);
        this.replayStack = [];

        for (let node of this.grid.nodes) {
            node.onTypeChange = this.renderer.changeType.bind(this.renderer);
            node.onStateChange = this.onStateChange.bind(this);
        }

        let gridArea = $("#grid-area");
        gridArea.mousedown($.proxy(this.mousedown, this));
        gridArea.mouseup($.proxy(this.mouseup, this));
        gridArea.mousemove($.proxy(this.mousemove, this));
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
        this.replayStack.push({node:node, state:node.state});
    }

    search(event) {
        const replayHz = 200;

        if (this.action === Action.SEARCHING) return;

        this.action = Action.SEARCHING;
        this.grid.resetSearchDecorations();
        this.renderer.reset();
        this.replayStack = [];

        let state = store.getState();
        let type = state.type;
        let path = searchFunctionMap[type](this.grid, state[type]);

        for (let i = 0; i < this.replayStack.length; i++) {
            let r = this.replayStack[i];
            setTimeout(() => {
                this.renderer.showState(r.node, r.state);
                if (path && i === this.replayStack.length - 1) {
                    this.renderer.drawPath(path);
                    this.action = Action.NONE;
                }
            }, i * (1000 / replayHz));
        }
    }

    actOnNode(node) {
        switch (this.action) {
            case Action.DRAGGING_START:
                if (node.type === NodeType.EMPTY) this.setStart(node);
                break;
            case Action.DRAGGING_END:
                if (node.type === NodeType.EMPTY) this.setEnd(node);
                break;
            case Action.PAINTING_BLOCKS:
                if (node.type === NodeType.EMPTY) node.setType(NodeType.BLOCK);
                break;
            case Action.CLEARING_BLOCKS:
                if (node.type === NodeType.BLOCK) node.setType(NodeType.EMPTY);
                break;
            case Action.SEARCHING:
                return;
        }

    }

    mousedown(event) {
        if (this.action === Action.SEARCHING) return;

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
