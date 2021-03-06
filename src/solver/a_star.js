let Heap = require("heap");
import Grid from "core/grid.js";
import Node, { NodeState } from "core/node.js";
import * as Heuristics from "core/heuristics.js";

export function find(grid, options) {
    // @BUG(HIGH) Crash after moving blocks and start/end positions
    // Only seems to happen sometimes, the open list doesn't seem to empty
    let heuristic = Heuristics.HeuristicFunctionMap[options.heuristic.type || Heuristics.HeuristicType.MANHATTAN];

    let open = new Heap(function(a, b) {
        return a.f - b.f;
    });

    open.push(grid.start);
    grid.start.state = NodeState.OPEN;

    while (open.empty() === false) {
        let origin = open.pop();
        origin.state = NodeState.CLOSED;

        if (origin === grid.end) return getPath(grid);

        let neighbours = grid.getWalkableNeighbours(origin);

        for (let n of neighbours) {
            if (n.state === NodeState.CLOSED) continue;

            let newG = origin.g + ((n.x - origin.x === 0 || n.y - origin.y === 0) ? 1 : Math.sqrt(2));

            if (n.state !== NodeState.OPEN || newG < n.g) {
                n.g = newG;
                n.h = n.h || heuristic(n, grid.end, options.heuristic.weight);
                n.f = n.g + n.h;
                n.parent = origin;

                if (n.state !== NodeState.OPEN) {
                    open.push(n);
                    n.state = NodeState.OPEN;
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
