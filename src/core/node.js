export const NodeType = Object.freeze({
    EMPTY: "empty",
    WALL: "wall",
    START: "start",
    END: "end"
});

export default class Node {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.state = NodeType.EMPTY;
    }

    setState(state) {
        this.state = state;
        if (this.onStateChange) this.onStateChange(this);
    }
};
