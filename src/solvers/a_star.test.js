import { find } from "./a_star.js";

import store from "../redux/store.js";

import Grid from "../logic/grid.js";
import { SearchType } from "../solvers/solvers.js";
import { NodeType } from "../logic/node.js";

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
