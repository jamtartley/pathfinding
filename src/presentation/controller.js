import Renderer from "./renderer.js";

import Grid from "../logic/grid.js";
import * as Heuristics from "../logic/heuristics.js";
import { NodeType } from "../logic/node.js";
import * as Utils from "../logic/utils.js";

import { find as AStarFind } from "../algorithms/a_star.js";
import { find as DijkstraFind } from "../algorithms/dijkstra.js";
import { find as BestFirstFind } from "../algorithms/best_first.js";

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
    DIJKSTRA: "dijkstra",
    BEST_FIRST: "best-first"
});

const searchFunctionMap = {
    [SearchType.ASTAR]: AStarFind,
    [SearchType.DIJKSTRA]: DijkstraFind,
    [SearchType.BEST_FIRST]: BestFirstFind,
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

        this.randomiseStartAndEnd();
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

    removeBlocks() {
        this.grid.resetSearchDecorations();
        this.renderer.reset();
        this.grid.clearAllBlocks();
    }

    placeRandomBlocks() {
        this.grid.resetSearchDecorations();
        this.renderer.reset();
        this.removeBlocks();

        const maxCoverage = 0.75;
        const endIdx = Utils.getRandInt(0, maxCoverage * this.grid.nodes.length);

        for (let i = 0; i < endIdx; i++) {
            let node = this.grid.getNodeAt(this.getRandX(), this.getRandY());
            if (node.type === NodeType.EMPTY) node.setType(NodeType.BLOCK);
        }
    }

    getRandX() {
        return Utils.getRandInt(0, this.grid.width - 1);
    }

    getRandY() {
        return Utils.getRandInt(0, this.grid.height - 1);
    }

    randomiseStartAndEnd() {
        this.grid.resetSearchDecorations();
        this.renderer.reset();

        let start = this.grid.getNodeAt(this.getRandX(), this.getRandY());
        let end = this.grid.getNodeAt(this.getRandX(), this.getRandY());

        while (start === end) {
            end = this.grid.getNodeAt(this.getRandX(), this.getRandY());
        }

        this.setStart(start);
        this.setEnd(end);
    }

    search(event) {
        if (this.action === Action.SEARCHING) return;

        const panelAnim = 150;
        const controlPanel = $("#control-panel");

        controlPanel.fadeOut(panelAnim);

        const replayHz = 200;

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
                    this.renderer.onFinish(this.replayStack[i].node === this.grid.end);

                    this.action = Action.NONE;
                    controlPanel.fadeIn(panelAnim);
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
