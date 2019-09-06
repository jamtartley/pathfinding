import Grid from "./grid.js";

export function recursiveBacktrack(grid) {
    let curr = grid.start;
    curr.isVisited = true;

    let stack = [];

    while (grid.nodes.some(n => !n.isVisited)) {
        let neighbours = grid.getWalkableNeighbours(curr, false);
        let unvisited = neighbours.filter(n => !n.isVisited);

        if (unvisited.length === 0) {
            curr = stack.pop();
        } else {
            let n = unvisited[Math.floor(Math.random() * unvisited.length)];
            stack.push(n);

            curr.removeWallBetween(n);

            curr = n;
            n.isVisited = true;
        }
    }
}
