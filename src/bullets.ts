import { Game } from "./game";
import { CONSTANTS } from "./constants";
import { Polygon } from "./utils/primitives";
import { Vector } from "./utils/vector";

export class Bullet extends Polygon {

    lifeSpan = CONSTANTS.BULLET_LIFE_SPAN;

    constructor(public center: Vector, public points: [Vector, Vector]) {
        super();
    }

    update() {
        this.render();
        this.center.add(this.points[0]);
        this.lifeSpan -= 1;

        if (this.lifeSpan <= 0) FireGun.bullets.shift();
    }
}

export class FireGun {
    static bullets: Bullet[] = [];
    private static rTime = CONSTANTS.GUN_REFRESHING_RATE; // Regeneration time for next fire
    private static rInterval = this.rTime;

    static Init() { }

    static Update() {
        this.bullets.forEach(bullet => {
            Game.ctx.strokeStyle = "red";
            bullet.update();
        });

    }

    static Fire(from: Vector, dir: Vector) {
        if (this.rInterval > this.rTime) {
            dir.mult(CONSTANTS.BULLET_LENGTH);
            this.bullets.push(new Bullet(from.clone(), [dir, new Vector]));
            this.rInterval = 0;
        }
        this.rInterval++;
    }

    static restart() {
        this.bullets = [];
    }
}