export const HeuristicType = Object.freeze({
    NONE: "none",
    MANHATTAN: "manhattan",
    EUCLIDEAN: "euclidean",
    OCTILE: "octile"
});

export const HeuristicFunctionMap = {
    [HeuristicType.NONE]: none,
    [HeuristicType.MANHATTAN]: manhattan,
    [HeuristicType.EUCLIDEAN]: euclidean,
    [HeuristicType.OCTILE]: octile,
};

export function manhattan(a, b) {
    let dx = Math.abs(b.x - a.x);
    let dy = Math.abs(b.y - a.y);

    return dx + dy;
}

export function euclidean(a, b) {
    let dx = Math.abs(b.x - a.x);
    let dy = Math.abs(b.y - a.y);

    return Math.sqrt(dx * dx + dy * dy);
}

export function octile(a, b) {
    let dx = Math.abs(b.x - a.x);
    let dy = Math.abs(b.y - a.y);
    let factor = Math.sqrt(2) - 1;

    if (dx < dy) return factor * dx + dy;
    else return factor * dy + dx;
}

export function none(a, b) {
    return 0;
}
