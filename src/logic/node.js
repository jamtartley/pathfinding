export const NodeType = Object.freeze({
    EMPTY: "empty",
    BLOCK: "block",
    START: "start",
    END: "end"
});

export const NodeState = Object.freeze({
    NONE: "none",
    OPEN: "open",
    CLOSED: "closed"
});

export default class Node {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.type = NodeType.EMPTY;
        this.state = NodeState.NONE;
    }

    setType(type) {
        this.type = type;
        if (this.onTypeChange) this.onTypeChange(this);
    }

    setState(state) {
        this.state = state;
        if (this.onStateChange) this.onStateChange(this);
    }
};
