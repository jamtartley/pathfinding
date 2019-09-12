import Grid from "./grid.js";
import { NodeState } from "./node.js";

export function recursiveBacktrack(grid) {
    let curr = grid.start;
    curr.setState(NodeState.VISITED);

    let stack = [];

    while (grid.nodes.some(n => n.state !== NodeState.VISITED)) {
        let neighbours = grid.getAllNeighbours(curr, false);
        let unvisited = neighbours.filter(n => n.state !== NodeState.VISITED);

        if (unvisited.length === 0) {
            curr = stack.pop();
        } else {
            let n = unvisited[Math.floor(Math.random() * unvisited.length)];
            stack.push(n);

            curr.removeWallBetween(n);

            curr = n;
            n.setState(NodeState.VISITED);
        }
    }
}
