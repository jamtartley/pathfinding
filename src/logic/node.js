export const NodeType = Object.freeze({
    NORMAL: "normal",
    START: "start",
    END: "end"
});

export const NodeState = Object.freeze({
    NONE: "none",
    OPEN: "open",
    CLOSED: "closed"
});

export const WallDir = Object.freeze({
    NORTH: "north",
    EAST: "east",
    SOUTH: "south",
    WEST: "west",
});

export default class Node {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.type = NodeType.NORMAL;
        this.state = NodeState.NONE;
        this.parent = null;
        this.walls = {
            [WallDir.NORTH]: true,
            [WallDir.EAST]: true,
            [WallDir.SOUTH]: true,
            [WallDir.WEST]: true,
        };
    }

    setType(type) {
        this.type = type;
        if (this.onTypeChange) this.onTypeChange(this);
    }

    setState(state) {
        this.state = state;
        if (this.onStateChange) this.onStateChange(this);
    }

    removeWallBetween(other) {
        let dx = other.x - this.x;
        let dy = other.y - this.y;

        if (Math.abs(dx) > 1 || Math.abs(dy) > 1) return;

        if (dx === 1 && dy === 0) {
            this.walls[WallDir.EAST] = false;
            other.walls[WallDir.WEST] = false;
        } else if (dx === -1 && dy === 0) {
            this.walls[WallDir.WEST] = false;
            other.walls[WallDir.EAST] = false;
        } else if (dx === 0 && dy === 1) {
            this.walls[WallDir.SOUTH] = false;
            other.walls[WallDir.NORTH] = false;
        } else {
            this.walls[WallDir.NORTH] = false;
            other.walls[WallDir.SOUTH] = false;
        }
    }
};
