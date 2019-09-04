import { combineReducers } from "redux";

import { HeuristicType, HeuristicFunctionMap } from "../logic/heuristics.js";
import { SearchType } from "../presentation/controller.js";

import * as Actions from "./actions.js";

const initialState = {
    type: SearchType.ASTAR,
    [SearchType.ASTAR]: {
        heuristic: HeuristicFunctionMap[HeuristicType.MANHATTAN],
        shouldAllowDiag: true
    },
    [SearchType.DIJKSTRA]: {
        shouldAllowDiag: true
    },
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case Actions.CHANGE_SEARCH_TYPE:
            return Object.assign({}, state, {
                type: action.payload
            });
        case Actions.CHANGE_HEURISTIC:
            return Object.assign({}, state, {
                [state.type]: {
                    ...state[state.type],
                    heuristic: HeuristicFunctionMap[action.payload]
                }
            });
        default:
            return state;
    }
}

export default reducer;
