import Renderer from "view/renderer.js";

import Grid from "core/grid.js";
import { NodeType } from "core/node.js";
import { SearchFunctionMap } from "solver/solvers.js";
import { GeneratorFunctionMap } from "generator/generators.js";
import * as Heuristics from "core/heuristics.js";
import * as Utils from "core/utils.js";

import store from "redux/store.js";

const Action = Object.freeze({
    NONE: "none",
    DRAGGING_START: "dragging-start",
    DRAGGING_END: "dragging-end",
    REPLAYING: "replaying"
});

export default class Controller {
    constructor(grid) {
        this.size = 50;
        this.action = Action.NONE;

        this.grid = grid;

        let gridArea = $("#grid-area");
        gridArea.mousedown($.proxy(this.mousedown, this));
        gridArea.mouseup($.proxy(this.mouseup, this));
        gridArea.mousemove($.proxy(this.mousemove, this));

        this.renderer = new Renderer(grid, this.size);
        this.replayStack = [];

        for (let node of this.grid.nodes) {
            node.onTypeChange = this.renderer.changeType.bind(this.renderer);
            node.onStateChange = (node) => {
                this.replayStack.push({node: node, state: node.state});
            };
        }
    }

    getNodeAtPagePos(pageX, pageY) {
        let x = Math.floor(pageX / this.size);
        let y = Math.floor(pageY / this.size);
        return this.grid.getNodeAt(x, y);
    }

    randomiseStartAndEnd() {
        if (this.action === Action.REPLAYING) return;

        this.grid.resetNodes();
        this.grid.randomiseTerminals();
        this.renderer.reset();
    }

    generateMaze() {
        if (this.action === Action.REPLAYING) return;

        for (let node of this.grid.nodes) {
            node.resetWalls();
        }

        this.grid.resetNodes();
        this.renderer.reset();

        this.action = Action.REPLAYING;
        this.replayStack = [];

        let state = store.getState();
        let type = state.generator_type;
        GeneratorFunctionMap[type](this.grid);

        this.renderer.showReplay(this.replayStack, () => { this.action = Action.NONE; });
    }

    search(event) {
        if (this.action === Action.REPLAYING) return;

        this.grid.resetNodes();
        this.renderer.reset();

        this.action = Action.REPLAYING;
        this.replayStack = [];

        let state = store.getState();
        let type = state.search_type;
        let path = SearchFunctionMap[type](this.grid, state.solvers[type]);

        this.renderer.showReplay(this.replayStack, () => {
            this.action = Action.NONE;
            this.renderer.drawPath(path);
        });
    }

    actOnNode(node) {
        switch (this.action) {
            case Action.DRAGGING_START:
                if (node.type === NodeType.NORMAL) this.grid.setStart(node);
                break;
            case Action.DRAGGING_END:
                if (node.type === NodeType.NORMAL) this.grid.setEnd(node);
                break;
            case Action.REPLAYING:
                return;
        }

    }

    mousedown(event) {
        if (this.action === Action.REPLAYING) return;

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
