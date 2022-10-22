import { keyStates } from "./events";
import { Game } from "./game";
import { Polygon } from "./utils/primitives";
import { Vector } from "./utils/vector";

export class Rocket extends Polygon {

    points = Vector.From([0, -25], [-8, 15], [8, 15]);

    constructor(public center: Vector) {
        super();
    }

    vel = new Vector;
    acc = new Vector;
    friction = 0.02;
    rotateSpeed = 2.5;
    accMag = 0.8;
    maxSpeed = 8;

    update() {
        // Physics
        if(this.vel.mag >= this.friction) this.vel.mult(1 - this.friction);
        if(this.vel.mag < this.maxSpeed) this.vel.add(this.acc);
        this.acc.toZero();
        this.center.add(this.vel);

        // Render
        Game.ctx.strokeStyle = "black";
        Game.ctx.fillStyle = "white";
        Game.ctx.lineWidth = 5;
        this.render();
        Game.ctx.fillStyle = "black";


        // Teleporting
        if(this.center.x >= Game.width) this.center.x %= Game.width;
        else if(this.center.x <= 0) this.center.x = Game.width - this.center.x;
        if(this.center.y >= Game.height) this.center.y %= Game.height;
        else if(this.center.y <= 0) this.center.y = Game.height - this.center.y;
    }

    rotate(rad: number) {
        this.points.forEach(p => p.rotate(-rad));
    }
}

export class Player extends Rocket {
    constructor() {
        super(new Vector(Game.width / 2, Game.height / 2));
    }

    update() {
        if(keyStates.x) this.rotate(this.rotateSpeed * keyStates.x * Math.PI / 180);
        if(keyStates.y == -1) {
            let dir = this.points[0].dir();
            dir.mult(this.accMag);
            this.acc.add(dir);
        }

        if(Game.Life <= 0) {
            Game.shouldRefresh = true;
            Game.isGameOver = true;
            return;
        }

        super.update();
    }
}