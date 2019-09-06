import Node, { NodeState, NodeType, WallDir } from "./node.js";
import { recursiveBacktrack } from "./maze_gen.js";

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
    }

    getNodeAt(x, y) {
        if (x < 0 || y < 0 || x >= this.width || y >= this.height) return null;
        return this.nodes[y * this.width + x];
    }

    getNodesByType(type) {
        return this.nodes.filter(n => n.type == type);
    }

    isInGrid(x, y) {
        return x >= 0 && x < this.width && y >= 0 && y < this.height;
    }

    resetSearchDecorations() {
        for (let node of this.nodes) {
            node.setState(NodeState.NONE);
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
