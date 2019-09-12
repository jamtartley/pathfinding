import { HeuristicType } from "../logic/heuristics.js";
import { SearchType } from "../solvers/solvers.js";
import { GeneratorType } from "../generators/generators.js";

import * as Actions from "./actions.js";

const initialState = {
    search_type: SearchType.ASTAR,
    generator_type: GeneratorType.RECURSIVE_BACKTRACKER,
    solvers: {
        [SearchType.ASTAR]: {
            heuristic: {
                type: HeuristicType.MANHATTAN,
                weight: 1
            }
        },
    },
    generators: {
        [GeneratorType.RECURSIVE_BACKTRACKER]: {
        }
    }
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case Actions.CHANGE_SEARCH_TYPE:
            return Object.assign({}, state, {
                ...state,
                search_type: action.payload
            });
        case Actions.CHANGE_GENERATOR_TYPE:
            return Object.assign({}, state, {
                ...state,
                generator_type: action.payload
            });
        case Actions.CHANGE_HEURISTIC:
            return Object.assign({}, state, {
                ...state,
                solvers: {
                    ...state.solvers,
                    [state.search_type]: {
                        ...state.solvers[state.search_type],
                        heuristic: {
                            ...state.solvers[state.search_type].heuristic,
                            type: action.payload
                        }
                    }
                }
            });
        default:
            return state;
    }
}

export default reducer;
