let Heap = require("heap");
import Grid from "../core/grid.js";
import Node from "../core/node.js";

export function find(grid) {
    let open = new Heap(function(a, b) {
        return a.f - b.f;
    });

    open.push(grid.start);
    grid.start.isOpen = true;

    while (open.empty() === false) {
        let q = open.pop();
        console.log(q);
        q.isClosed = true;

        if (q === grid.end) return getPath(grid);

        let neighbours = grid.getWalkableNeighbours(q);

        for (let n of neighbours) {
            if (n.isClosed) continue;

            let newG = q.g + euclidean(q, n);

            if (!n.isOpened || newG < n.g) {
                n.parent = q;
                n.g = newG;
                n.h = manhattan(q, n);
                n.f = n.g + n.h;

                if (!n.isOpened) {
                    open.push(n);
                    n.isOpened = true;
                } else {
                    open.updateItem(n);
                }
            }
        }
    }

    return null;
}

function manhattan(a, b) {
    return b.x - a.x + b.y - a.y;
}

function euclidean(a, b) {
    let dx = b.x - a.x;
    let dy = b.y - a.y;
    return Math.sqrt(dx * dx + dy * dy);
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
