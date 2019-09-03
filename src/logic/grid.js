import Node, { NodeState, NodeType } from "./node.js";

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

    canWalkAt(x, y) {
        return this.isInGrid && this.getNodeAt(x, y).type !== NodeType.BLOCK;
    }

    isInGrid(x, y) {
        return x >= 0 && x < this.width && y >= 0 && y < this.height;
    }

    resetSearchDecorations() {
        for (let node of this.nodes) {
            node.setState(NodeState.NONE);
            node.f = node.g = 0;
        }
    }

    getWalkableNeighbours(origin, shouldIncludeDiag) {
        let neighbours = [
            this.getNodeAt(origin.x, origin.y - 1),
            this.getNodeAt(origin.x + 1, origin.y),
            this.getNodeAt(origin.x, origin.y + 1),
            this.getNodeAt(origin.x - 1, origin.y),
        ];

        if (shouldIncludeDiag) {
            neighbours.push(this.getNodeAt(origin.x - 1, origin.y - 1)),
            neighbours.push(this.getNodeAt(origin.x + 1, origin.y - 1)),
            neighbours.push(this.getNodeAt(origin.x + 1, origin.y + 1)),
            neighbours.push(this.getNodeAt(origin.x - 1, origin.y + 1))
        }

        return neighbours.filter(n => n && n.type !== NodeType.BLOCK);
    }
};
