import Grid from "./grid.js";
import { NodeType } from "./node.js";

describe("Grid", () => {
    let grid;

    beforeEach(() => {
        grid = new Grid(10, 10);
    });

    test("grid exists", () => {
        expect(grid).toBeTruthy();
    });

    test("getNodeAt", () => {
        expect(grid.getNodeAt(0, 0)).toBeTruthy();
        expect(grid.getNodeAt(5, 5)).toBeTruthy();
        expect(grid.getNodeAt(9, 9)).toBeTruthy();

        expect(grid.getNodeAt(-1, -1)).toBeFalsy();
        expect(grid.getNodeAt(-1, 5)).toBeFalsy();
        expect(grid.getNodeAt(5, -1)).toBeFalsy();
        expect(grid.getNodeAt(50, 50)).toBeFalsy();

        expect(grid.getNodeAt("x", 1)).toBeFalsy();
        expect(grid.getNodeAt(null, undefined)).toBeFalsy();
    });

    test("getNodesByType", () => {
        expect(grid.getNodesByType(NodeType.EMPTY).length).toBe(100);
        expect(grid.getNodesByType(NodeType.BLOCK).length).toBe(0);
        expect(grid.getNodesByType(NodeType.START).length).toBe(0);
        expect(grid.getNodesByType(NodeType.END).length).toBe(0);
    });

    test("canWalkAt", () => {
        expect(grid.canWalkAt(0, 0)).toBeTruthy();
        expect(grid.canWalkAt(5, 5)).toBeTruthy();
        expect(grid.canWalkAt(9, 9)).toBeTruthy();

        expect(grid.canWalkAt(99, 9)).toBeFalsy();
        expect(grid.canWalkAt(-1, 9)).toBeFalsy();

        let newBlock = grid.getNodeAt(0, 0).setType(NodeType.BLOCK);
        expect(grid.canWalkAt(0, 0)).toBeFalsy();
    });

    test("isInGrid", () => {
        expect(grid.isInGrid(0, 0)).toBeTruthy();
        expect(grid.isInGrid(5, 5)).toBeTruthy();
        expect(grid.isInGrid(9, 9)).toBeTruthy();

        expect(grid.isInGrid(99, 9)).toBeFalsy();
        expect(grid.isInGrid(-1, 9)).toBeFalsy();
    });

    test("getWalkableNeighbours", () => {
        let origin = grid.getNodeAt(4, 4);
        expect(grid.getWalkableNeighbours(origin, false).length).toBe(4);
        expect(grid.getWalkableNeighbours(origin, true).length).toBe(8);

        grid.getNodeAt(3, 4).setType(NodeType.BLOCK);
        grid.getNodeAt(3, 3).setType(NodeType.BLOCK);
        expect(grid.getWalkableNeighbours(origin, false).length).toBe(3);
        expect(grid.getWalkableNeighbours(origin, true).length).toBe(6);
    });
});
