import Grid from "core/grid.js";
import { NodeState } from "core/node.js";

export function generate(grid) {
    let curr = grid.start;
    curr.state = NodeState.VISITED;

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
            n.state = NodeState.VISITED;
        }
    }
}
