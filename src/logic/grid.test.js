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
        expect(grid.getNodesByType(NodeType.START).length).toBe(0);
        expect(grid.getNodesByType(NodeType.END).length).toBe(0);
    });

    test("isInGrid", () => {
        expect(grid.isInGrid(0, 0)).toBeTruthy();
        expect(grid.isInGrid(5, 5)).toBeTruthy();
        expect(grid.isInGrid(9, 9)).toBeTruthy();

        expect(grid.isInGrid(99, 9)).toBeFalsy();
        expect(grid.isInGrid(-1, 9)).toBeFalsy();
    });
});
