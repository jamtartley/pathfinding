import { find as AStarFind } from "solver/a_star.js";

export const SearchType = Object.freeze({
    ASTAR: "astar"
});

export const SearchFunctionMap = {
    [SearchType.ASTAR]: AStarFind
};
