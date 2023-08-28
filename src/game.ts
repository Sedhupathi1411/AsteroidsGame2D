export class Game {
    static canvas = document.createElement("canvas");
    static ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    static width = this.canvas.width = innerWidth;
    static height = this.canvas.height = innerHeight;
    static Life = 3;
    static shouldRefresh = true;
    static score = 0;
    static isGameOver = false;
    private static scoreElt = document.getElementById("score");

    static Init() {
        document.body.appendChild(this.canvas);
    }

    static Update() {
        this.score += 0.1;
        this.scoreElt.innerHTML = "Life: " + this.Life + " | Score: " + Math.ceil(this.score);
    }

    static async GameOver() {
        await document.exitFullscreen();
        document.body.innerHTML = '<div id="fScreen"><h1>Game Over!</h1><br /> <h3>Score: ' + Math.ceil(this.score) + '<br /><br />(Click 2 Replay)</h3></div>';
        setTimeout(() => window.onclick = () => document.location.reload(), 300);
    }
}
