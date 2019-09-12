export const HeuristicType = Object.freeze({
    NONE: "none",
    MANHATTAN: "manhattan",
    EUCLIDEAN: "euclidean",
    OCTILE: "octile",
    CHEBYSHEV: "chebyshev"
});

export const HeuristicFunctionMap = {
    [HeuristicType.NONE]: none,
    [HeuristicType.MANHATTAN]: manhattan,
    [HeuristicType.EUCLIDEAN]: euclidean,
    [HeuristicType.OCTILE]: octile,
    [HeuristicType.CHEBYSHEV]: chebyshev,
};

function manhattan(a, b, d = 1) {
    let dx = Math.abs(b.x - a.x);
    let dy = Math.abs(b.y - a.y);

    return d * (dx + dy);
}

function euclidean(a, b, d = 1) {
    let dx = Math.abs(b.x - a.x);
    let dy = Math.abs(b.y - a.y);

    return d * Math.sqrt(dx * dx + dy * dy);
}

function octile(a, b) {
    return diagRoot(a, b, 1, 1);
}

function chebyshev(a, b) {
    return diagRoot(a, b, 1, Math.sqrt(2));
}

function diagRoot(a, b, d, d2) {
    let dx = Math.abs(b.x - a.x);
    let dy = Math.abs(b.y - a.y);

    return d * (dx + dy) + (d2 - 2 * d) + Math.min(dx, dy);
}

export function none(a, b) {
    return 0;
}
