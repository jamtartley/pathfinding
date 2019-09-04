export const CHANGE_HEURISTIC = "change-heuristic";
export const CHANGE_SEARCH_TYPE = "change-search-type";
export const CHANGE_ALLOW_DIAG = "change-allow-diag";

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

export function changeAllowDiag(canMove) {
    return {
        type: CHANGE_ALLOW_DIAG,
        payload: canMove
    };
}
