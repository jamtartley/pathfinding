import { find as AStarFind } from "./a_star.js";

export function find(grid, options) {
    return AStarFind(grid, $.extend({}, options, { heuristic: function(a, b) { return 0; } }));
}
