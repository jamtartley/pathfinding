export const NodeState = Object.freeze({
    EMPTY: Symbol("empty"),
    START: Symbol("start"),
    END: Symbol("end")
});

export default class Node {
    constructor(x, y, isWalkable) {
        this.x = x;
        this.y = y;
        this.isWalkable = isWalkable;
        this.state = NodeState.EMPTY;
    }

    setState(state) {
        this.state = state;
        if (this.onStateChange) this.onStateChange(this);
    }
};
