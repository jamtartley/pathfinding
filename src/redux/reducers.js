import { HeuristicType } from "../logic/heuristics.js";
import { SearchType } from "../logic/search.js";

import * as Actions from "./actions.js";

const initialState = {
    type: SearchType.ASTAR,
    [SearchType.ASTAR]: {
        heuristic: {
            type: HeuristicType.MANHATTAN,
            weight: 1
        }
    },
    [SearchType.BEST_FIRST]: {
        heuristic: {
            type: HeuristicType.MANHATTAN,
            weight: 1
        }
    },
    [SearchType.DIJKSTRA]: {
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
        default:
            return state;
    }
}

export default reducer;
