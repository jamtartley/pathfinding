import { find as AStarFind } from "./a_star.js";
import { HeuristicType } from "../logic/heuristics.js";

export function find(grid, options) {
    return AStarFind(grid, $.extend({}, options, { heuristic: HeuristicType.NONE }));
}
