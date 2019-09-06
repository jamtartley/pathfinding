import Renderer from "./renderer.js";

import Grid from "../logic/grid.js";
import { NodeType } from "../logic/node.js";
import { SearchFunctionMap } from "../logic/search.js";
import * as Heuristics from "../logic/heuristics.js";
import * as Utils from "../logic/utils.js";

import { recursiveBacktrack } from "../logic/maze_gen.js";

import store from "../redux/store.js";

const Action = Object.freeze({
    NONE: "none",
    DRAGGING_START: "dragging-start",
    DRAGGING_END: "dragging-end",
    SEARCHING: "searching"
});

export default class Controller {
    constructor(grid) {
        this.size = 50;
        this.action = Action.NONE;

        this.grid = grid;

        recursiveBacktrack(this.grid);

        let gridArea = $("#grid-area");
        gridArea.mousedown($.proxy(this.mousedown, this));
        gridArea.mouseup($.proxy(this.mouseup, this));
        gridArea.mousemove($.proxy(this.mousemove, this));

        this.renderer = new Renderer(grid, this.size);
        this.replayStack = [];

        for (let node of this.grid.nodes) {
            node.onTypeChange = this.renderer.changeType.bind(this.renderer);
            node.onStateChange = this.onStateChange.bind(this);
        }
    }

    getNodeAtPagePos(pageX, pageY) {
        let x = Math.floor(pageX / this.size);
        let y = Math.floor(pageY / this.size);
        return this.grid.getNodeAt(x, y);
    }

    onStateChange(node) {
        this.replayStack.push({node:node, state:node.state});
    }

    randomiseStartAndEnd() {
        if (this.action === Action.SEARCHING) return;

        this.grid.resetNodes();
        this.grid.randomiseTerminals();
        this.renderer.reset();
    }

    search(event) {
        if (this.action === Action.SEARCHING) return;

        this.grid.resetNodes();
        this.renderer.reset();

        this.action = Action.SEARCHING;
        this.replayStack = [];

        let state = store.getState();
        let type = state.type;
        let path = SearchFunctionMap[type](this.grid, state[type]);

        this.renderer.showReplay(path, this.replayStack, () => { this.action = Action.NONE; });
    }

    actOnNode(node) {
        switch (this.action) {
            case Action.DRAGGING_START:
                if (node.type === NodeType.NORMAL) this.grid.setStart(node);
                break;
            case Action.DRAGGING_END:
                if (node.type === NodeType.NORMAL) this.grid.setEnd(node);
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
            }

            this.grid.resetNodes();
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
