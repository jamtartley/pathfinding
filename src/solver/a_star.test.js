import { find } from "solver/a_star.js";

import store from "redux/store.js";

import Grid from "core/grid.js";
import { NodeType } from "core/node.js";

import { SearchType } from "solver/solvers.js";

describe("A* algorithm", () => {
    let grid;

    beforeAll(() => {
        grid = new Grid(10, 10);
        grid.start = grid.getNodeAt(2, 2);
        grid.end = grid.getNodeAt(5, 3);
    });

    beforeEach(() => {
    });

    test("finds path with no walls", () => {
        expect(true);
    });
});
