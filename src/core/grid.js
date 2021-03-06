import Node, { NodeState, NodeType, WallDir } from "core/node.js";
import * as Utils from "core/utils.js";

export default class Grid {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.nodes = [];

        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                let node = new Node(j, i);
                this.nodes.push(node);
            }
        }

        this.randomiseTerminals();
    }

    getNodeAt(x, y) {
        if (x < 0 || y < 0 || x >= this.width || y >= this.height) return null;
        return this.nodes[y * this.width + x];
    }

    setStart(node) {
        if (this.start) this.start.type = NodeType.NORMAL;
        this.start = node;
        node.type = NodeType.START;
    }

    setEnd(node) {
        if (this.end) this.end.type = NodeType.NORMAL;
        this.end = node;
        node.type = NodeType.END;
    }

    randomiseTerminals() {
        let randX = () => { return Utils.getRandInt(0, this.width - 1); };
        let randY = () => { return Utils.getRandInt(0, this.height - 1); };

        let start = this.getNodeAt(randX(), randY());
        let end = this.getNodeAt(randX(), randY());

        while (start === end) {
            end = this.getNodeAt(randX(), randY());
        }

        this.setStart(start);
        this.setEnd(end);
    }

    resetNodes() {
        for (let node of this.nodes) {
            node.state = NodeState.NONE;
            node.f = node.g = node.h = 0;
            node.parent = null;
        }
    }

    getAllNeighbours(origin) {
        return [
            this.getNodeAt(origin.x, origin.y - 1),
            this.getNodeAt(origin.x + 1, origin.y),
            this.getNodeAt(origin.x, origin.y + 1),
            this.getNodeAt(origin.x - 1, origin.y),
        ].filter(n => n);
    }

    getWalkableNeighbours(origin) {
        return [
            origin.walls[WallDir.NORTH] ? null : this.getNodeAt(origin.x, origin.y - 1),
            origin.walls[WallDir.EAST] ? null : this.getNodeAt(origin.x + 1, origin.y),
            origin.walls[WallDir.SOUTH] ? null : this.getNodeAt(origin.x, origin.y + 1),
            origin.walls[WallDir.WEST] ? null : this.getNodeAt(origin.x - 1, origin.y),
        ].filter(n => n);
    }
};
