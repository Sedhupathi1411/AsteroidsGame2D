import { FireGun } from "./bullets";
import { Game } from "./game";
import { CONSTANTS } from "./constants";
import { Player } from "./player";
import { Collision } from "./utils/collision";
import { chooseOne, cos, random, sin } from "./utils/math";
import { Polygon } from "./utils/primitives";
import { Vector } from "./utils/vector";


export const minR = 40, R = 70, maxR = 80;
const maxSpeed = CONSTANTS.ASTEROID_MAXSPEED;
const minSpeed = CONSTANTS.ASTEROID_MAXSPEED;
const minL = R * (Math.PI / 8), maxL = R * (Math.PI / 2);

interface IPolygon extends Polygon {
    update(): void;
    vel: Vector;
    strength?: number;
    isDamaged?: boolean;
}

export class Asteroid extends Polygon {

    strength = 7;
    isDamaged = false;

    constructor(
        public center: Vector,
        public points: Vector[],
        public vel = new Vector(
            chooseOne(-1, 1) * random(minSpeed, maxSpeed),
            chooseOne(-1, 1) * random(minSpeed, maxSpeed)
        )
    ) { super(); }

    update() {
        // Render
        Game.ctx.strokeStyle = this.isDamaged ? "red" : "white";
        Game.ctx.lineWidth = 3;
        this.render();

        // Physics
        this.center.add(this.vel);

        // Teleportation
        if (this.center.x - minR > Game.width) this.center.x = -minR;
        else if (this.center.x < -minR) this.center.x = Game.width + minR;
        if (this.center.y - minR > Game.height) this.center.y = -minR;
        else if (this.center.y < -minR) this.center.y = Game.height + minR;

        // Reset
        this.isDamaged = false;
    }

}

export function generateAsteroid(): Asteroid {
    var center = new Vector(random(0, Game.width), random(0, Game.height));
    var points: Vector[] = [];

    // Check collision with the player
    if (Collision.Cricle2Circle(
        [center.x, center.y, maxR],
        [Game.width / 2, Game.height / 2, 100]
    )) return generateAsteroid();

    // If there is already an asteroid around it's centre, generate again
    for (let i = 0; i < PolygonsM.asteroids.length; i++) {
        let asteroid = PolygonsM.asteroids[i];
        if (Collision.Cricle2Circle(
            [center.x, center.y, maxR],
            [asteroid.center.x, asteroid.center.y, maxR]
        )) return generateAsteroid();
    }

    // Create the polygon from a circle
    for (let i = 0; i < 2 * Math.PI * R; i += random(minL, maxL)) {
        let t = i / R;
        points.push(new Vector(
            Math.round(sin(t) * random(minR, maxR)),
            Math.round(cos(t) * random(minR, maxR))
        ));
    }

    return new Asteroid(center, points);
}

/** Polygons Manager */
export class PolygonsM {
    static asteroids: IPolygon[] = [];

    static Init(player: Player, count = 5) {
        this.asteroids.push(player);
        for (let i = 0; i < count; i++) {
            this.asteroids.push(generateAsteroid());
        }
    }

    static update() {
        this.asteroids.forEach(asteroid => asteroid.update());

        //Check Collision
        for (let j = 0; j < this.asteroids.length; j++) {

            // Asteroid vs Asteroid
            for (let i = 0; i < this.asteroids.length; i++) {
                if (i == j) continue;

                if (Collision.Cricle2Circle(
                    [this.asteroids[j].center.x, this.asteroids[j].center.y, maxR],
                    [this.asteroids[i].center.x, this.asteroids[i].center.y, maxR]
                )) {

                    let intersection = Collision.Polygon2Polygon(this.asteroids[i], this.asteroids[j], true);
                    if (intersection) {

                        if (i == 0) {
                            Game.Life -= 1;
                            Game.shouldRefresh = true;
                        }

                        let velA = Vector.Sub(this.asteroids[i].center, intersection).dir();
                        let velB = Vector.Sub(this.asteroids[j].center, intersection).dir();

                        // For Debugging Purpose
                        {
                            /*
                            // Intersection
                            Game.ctx.beginPath();
                            Game.ctx.strokeStyle = "yellow";
                            Game.ctx.moveTo(0, 0);
                            Game.ctx.lineTo(intersection.x, intersection.y);
                            Game.ctx.stroke();
                            Game.ctx.closePath();

                            // Velocity
                            Game.ctx.beginPath();
                            Game.ctx.strokeStyle = "blue";
                            Game.ctx.moveTo(this.asteroids[i].center.x, this.asteroids[i].center.y);
                            Game.ctx.lineTo(this.asteroids[i].center.x + velA.x * 5, this.asteroids[i].center.y + velA.y * 5);
                            Game.ctx.stroke();
                            Game.ctx.closePath();
                            */
                        }

                        this.asteroids[i].vel = velA;
                        this.asteroids[j].vel = velB
                    }
                }
            }

            if (j == 0) continue;

            // Asteroid Vs Bullet Check
            for (let b = 0; b < FireGun.bullets.length; b++) {
                if (Collision.Cricle2Circle(
                    [this.asteroids[j].center.x, this.asteroids[j].center.y, maxR],
                    [FireGun.bullets[b].center.x, FireGun.bullets[b].center.y, 0]
                )) if (Collision.Polygon2Polygon(FireGun.bullets[b], this.asteroids[j])) {
                    PolygonsM.asteroids[j].isDamaged = true;
                    FireGun.bullets.splice(b, 1); b--;
                    if ((this.asteroids[j].strength -= 1) == 0) {
                        this.asteroids.splice(j, 1);
                        j--;
                        Game.score += CONSTANTS.SCORE_COUNT.BURST;
                    }
                    else Game.score += CONSTANTS.SCORE_COUNT.HIT;
                }
            }

        }
    }

    static restart() {
        this.asteroids = [];
    }
}