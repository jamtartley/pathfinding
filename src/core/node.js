export const NodeType = Object.freeze({
    NORMAL: "normal",
    START: "start",
    END: "end"
});

export const NodeState = Object.freeze({
    NONE: "none",
    OPEN: "open",
    CLOSED: "closed",
    VISITED: "visited"
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
        this._type = NodeType.NORMAL;
        this._state = NodeState.NONE;
        this.parent = null;
        this.walls = {
            [WallDir.NORTH]: true,
            [WallDir.EAST]: true,
            [WallDir.SOUTH]: true,
            [WallDir.WEST]: true,
        };
    }

    get type() {
        return this._type;
    }

    set type(val) {
        this._type = val;
        if (this.onTypeChange) this.onTypeChange(this);
    }

    get state() {
        return this._state;
    }

    set state(val) {
        this._state = val;
        if (this.onStateChange) this.onStateChange(this);
    }

    resetWalls() {
        this.walls[WallDir.NORTH] = true;
        this.walls[WallDir.EAST] = true;
        this.walls[WallDir.SOUTH] = true;
        this.walls[WallDir.WEST] = true;
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
