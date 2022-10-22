import { Game } from "../game";
import { round } from "./math";
import { Vector } from "./vector";

export abstract class Polygon {
    abstract center: Vector;
    abstract points: Vector[];

    render() {
        Game.ctx.beginPath();
        this.points.forEach(p => Game.ctx.lineTo(
            round(p.x) + round(this.center.x), round(p.y) + round(this.center.y)
        ));
        Game.ctx.closePath();
        Game.ctx.stroke();
        Game.ctx.fill();
    }

    update() {}
}

/** [x, y, r] */
export type Circle = [number, number, number];