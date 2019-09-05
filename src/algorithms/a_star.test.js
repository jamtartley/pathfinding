import { find } from "./a_star.js";

import store from "../redux/store.js";

import Grid from "../logic/grid.js";
import { SearchType } from "../presentation/controller.js";
import { NodeType } from "../logic/node.js";

describe("A* algorithm", () => {
    let grid;

    function blocksAround(origin, includeDiag) {
        grid.getNodeAt(origin.x - 1, origin.y).setType(NodeType.BLOCK);
        grid.getNodeAt(origin.x + 1, origin.y).setType(NodeType.BLOCK);
        grid.getNodeAt(origin.x, origin.y - 1).setType(NodeType.BLOCK);
        grid.getNodeAt(origin.x, origin.y + 1).setType(NodeType.BLOCK);

        if (includeDiag) {
            grid.getNodeAt(origin.x - 1, origin.y - 1).setType(NodeType.BLOCK);
            grid.getNodeAt(origin.x + 1, origin.y - 1).setType(NodeType.BLOCK);
            grid.getNodeAt(origin.x + 1, origin.y + 1).setType(NodeType.BLOCK);
            grid.getNodeAt(origin.x - 1, origin.y + 1).setType(NodeType.BLOCK);
        }
    }

    beforeAll(() => {
        grid = new Grid(10, 10);
        grid.start = grid.getNodeAt(2, 2);
        grid.end = grid.getNodeAt(5, 3);
    });

    beforeEach(() => {
        grid.clearAllBlocks();
        grid.resetSearchDecorations();
    });

    test("finds path with no blocks", () => {
        let path = find(grid, store.getState()[SearchType.ASTAR]);

        expect(path.length).toBeGreaterThan(0);

        let lastNode = path[0];
        expect(lastNode.x).toBe(grid.end.x);
        expect(lastNode.y).toBe(grid.end.y);
    });

    test("doesn't find path when start node has blocks all around", () => {
        blocksAround(grid.start, true);
        let path = find(grid, store.getState()[SearchType.ASTAR]);

        expect(path.length).toBe(0);
    });

    test("finds path when start node has blocks all around (but not diagonally)", () => {
        blocksAround(grid.start, false);
        let path = find(grid, store.getState()[SearchType.ASTAR]);

        expect(path.length).toBeGreaterThan(0);

        let lastNode = path[0];
        expect(lastNode.x).toBe(grid.end.x);
        expect(lastNode.y).toBe(grid.end.y);
    });
});
