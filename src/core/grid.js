import Node, { NodeState } from "./node.js";

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
        return this.nodes[y * this.width + x];
    }

    getNodesByState(state) {
        return this.nodes.filter(n => n.state == state);
    }

    canWalkAt(x, y) {
        return this.isInGrid && this.getNodeAt(x, y).state !== NodeState.WALL;
    }

    isInGrid(x, y) {
        return x >= 0 && x < this.width && y >= 0 && y < this.height;
    }

    getWalkableNeighbours(origin) {
        let neighbours = [
            this.getNodeAt(origin.x, origin.y - 1),
            this.getNodeAt(origin.x, origin.y + 1),
            this.getNodeAt(origin.x - 1, origin.y),
            this.getNodeAt(origin.x + 1, origin.y),
        ];

        return neighbours.filter(n => n !== undefined && n.state !== NodeState.WALL);
    }
};
