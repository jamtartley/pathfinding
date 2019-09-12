import Grid from "core/grid.js";
import { NodeType } from "core/node.js";

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
});
