import { HeuristicType } from "core/heuristics.js";
import { SearchType } from "solver/solvers.js";
import { GeneratorType } from "generator/generators.js";

import * as Actions from "redux/actions.js";

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
