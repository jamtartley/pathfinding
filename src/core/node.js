export const NodeState = Object.freeze({
    EMPTY: "empty",
    WALL: "wall",
    START: "start",
    END: "end"
});

export default class Node {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.state = NodeState.EMPTY;
    }

    setState(state) {
        this.state = state;
        if (this.onStateChange) this.onStateChange(this);
    }
};
