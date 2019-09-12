export const CHANGE_HEURISTIC = "change-heuristic";
export const CHANGE_SEARCH_TYPE = "change-search-type";
export const CHANGE_GENERATOR_TYPE = "change-generator-type";

export function changeCurrentHeuristic(heuristic) {
    return {
        type: CHANGE_HEURISTIC,
        payload: heuristic
    };
}

export function changeSearchType(type) {
    return {
        type: CHANGE_SEARCH_TYPE,
        payload: type
    };
}

export function changeGeneratorType(type) {
    return {
        type: CHANGE_GENERATOR_TYPE,
        payload: type
    }
}
