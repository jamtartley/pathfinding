import Grid from "../core/grid.js";

export default class View {
    constructor(grid) {
        this.grid = grid;
        this.canvas = document.getElementById("path-canvas");
        this.ctx = this.canvas.getContext("2d");

        this.render();
    }

    render() {
        let self = this;

        function frame() {
            let width = window.innerWidth;
            let height = window.innerHeight;
            let nodeSize = Math.max(width / self.grid.width, height / self.grid.height);

            self.canvas.width = width;
            self.canvas.height = height;
            self.ctx.clearRect(0, 0, width, height);

            for (let node of self.grid.nodes) {
                let x = node.x * nodeSize;
                let y = node.y * nodeSize;

                self.ctx.beginPath();
                self.ctx.fillStyle = "rgb(245, 245, 245)";
                self.ctx.fillRect(x, y, nodeSize, nodeSize);
                self.ctx.lineWidth = 2;
                self.ctx.strokeStyle = "rgb(150, 150, 150)";
                self.ctx.strokeRect(x, y, nodeSize, nodeSize);
            }

            window.requestAnimationFrame(frame);
        }

        window.requestAnimationFrame(frame);
    }
};
