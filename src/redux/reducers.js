import { HeuristicType } from "../logic/heuristics.js";
import { SearchType } from "../presentation/controller.js";

const initialState = {
    currentSearch: SearchType.ASTAR,
    options: {
        [SearchType.ASTAR]: {
            heuristic: HeuristicType.MANHATTAN,
            shouldAllowDiag: true
        }
    }
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case "change-heuristic":
            // @BUG(HIGH) Action deletes other options
            return Object.assign({}, state, {
                options: {
                    [state.currentSearch]: {
                        heuristic: action.payload
                    }
                }
            });
        default:
            return state;
    }
}

export default rootReducer;
