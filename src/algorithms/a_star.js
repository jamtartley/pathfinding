let Heap = require("heap");
import Grid from "../core/grid.js";
import Node, { NodeState } from "../core/node.js";

export function find(grid, heuristic) {
    let open = new Heap(function(a, b) {
        return a.f - b.f;
    });

    open.push(grid.start);
    grid.start.setState(NodeState.OPEN);

    while (open.empty() === false) {
        let q = open.pop();
        q.setState(NodeState.CLOSED);

        if (q === grid.end) return getPath(grid);

        let neighbours = grid.getWalkableNeighbours(q);

        for (let n of neighbours) {
            if (n.state === NodeState.CLOSED) continue;

            let newG = q.g + ((n.x - q.x === 0 || n.y - q.y === 0) ? 1 : Math.sqrt(2));

            if (n.state !== NodeState.OPEN || newG < n.g) {
                n.g = newG;
                n.h = n.h || heuristic(n, grid.end);
                n.f = n.g + n.h;
                n.parent = q;

                if (n.state !== NodeState.OPEN) {
                    open.push(n);
                    n.setState(NodeState.OPEN);
                } else {
                    open.updateItem(n);
                }
            }
        }
    }

    return [];
}

function getPath(grid) {
    let curr = grid.end
    let path = [curr];

    while (curr.parent) {
        curr = curr.parent;
        path.unshift(curr);
    }

    return path.reverse();
}
