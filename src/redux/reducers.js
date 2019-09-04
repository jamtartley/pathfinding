import { HeuristicType } from "../logic/heuristics.js";
import { SearchType } from "../presentation/controller.js";

import * as Actions from "./actions.js";

const initialState = {
    type: SearchType.ASTAR,
    [SearchType.ASTAR]: {
        heuristic: {
            type: HeuristicType.MANHATTAN,
            weight: 1
        },
        canMoveDiag: true
    },
    [SearchType.BEST_FIRST]: {
        heuristic: {
            type: HeuristicType.MANHATTAN,
            weight: 1
        },
        canMoveDiag: true
    },
    [SearchType.DIJKSTRA]: {
        canMoveDiag: true
    },
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case Actions.CHANGE_SEARCH_TYPE:
            return Object.assign({}, state, {
                ...state,
                type: action.payload
            });
        case Actions.CHANGE_HEURISTIC:
            return Object.assign({}, state, {
                [state.type]: {
                    ...state[state.type],
                    heuristic: {
                        ...state[state.type].heuristic,
                        type: action.payload
                    }
                }
            });
        case Actions.CHANGE_ALLOW_DIAG:
            return Object.assign({}, state, {
                [state.type]: {
                    ...state[state.type],
                    canMoveDiag: action.payload
                }
            });
        default:
            return state;
    }
}

export default reducer;
