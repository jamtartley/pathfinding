export function changeCurrentHeuristic(heuristic) {
    return {
        type: "change-heuristic",
        payload: heuristic
    };
}
