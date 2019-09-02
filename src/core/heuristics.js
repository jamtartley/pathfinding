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
