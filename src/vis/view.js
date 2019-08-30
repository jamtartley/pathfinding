import Grid from "../core/grid.js";

export default class View {
    constructor(grid) {
        this.grid = grid;
        this.canvas = document.getElementById("path-canvas");
        this.ctx = this.canvas.getContext("2d");

        this.render();
    }

    render() {
        var self = this;
        window.requestAnimationFrame(frame);

        function frame() {
            for (let node of self.grid.nodes) {
                self.ctx.beginPath();
                self.ctx.lineWidth = 2;
                self.ctx.rect(node.x * 20, node.y * 20, 20, 20);
                self.ctx.stroke();
            }
            window.requestAnimationFrame(frame);
        }
    }
};
