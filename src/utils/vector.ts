import { cos, findHyp, round, sin, tan } from "./math";

type Vec2 = [number, number];

export class Vector {
    constructor(public x = 0, public y = 0) {}

    set(x: number, y: number) { this.x = x; this.y = y; }

    add(a: Vector | number, b?: number) {
        if(typeof a == "number") { this.x += a; this.y += b || a; }
        else { this.x += a.x; this.y += a.y; }
    }

    sub(a: Vector | number, b?: number) {
        if(typeof a == "number") { this.x -= a; this.y -= b || a; }
        else { this.x -= a.x; this.y -= a.y; }
    }

    mult(a: Vector | number, b?: number) {
        if(typeof a == "number") { this.x *= a; this.y *= b || a; }
        else { this.x *= a.x; this.y *= a.y; }
    }

    div(a: Vector | number, b?: number) {
        if(typeof a == "number") { this.x /= a; this.y /= b || a; }
        else { this.x /= a.x; this.y /= a.y; }
    }

    dir() {
        let v = this.clone();
        v.div(this.mag);
        return v;
    }

    clone() { return new Vector(this.x, this.y); }

    rotate(a: number) {
        if(a == 0) return;
        let t = this.angle;
        let r = this.mag;
        this.x = cos(t - a);
        this.y = sin(t - a);
        this.mult(r);
    }

    toZero() { this.x = 0; this.y = 0; }

    // Accessors

    get mag() {
        return (findHyp(this.x, this.y));
    }

    set mag(r: number) {
        if(this.x == 0 && this.y == 0) return;
        let angle = this.angle;
        this.set(r * cos(angle), r * sin(angle));
    }

    get angle() { return tan(this.x, this.y); }

    get i() { return new Vector(this.x, 0); }
    get j() { return new Vector(0, this.y); }


    // Static Methods

    static Add(...vectors: Vector[]) {
        let res = new Vector;
        vectors.forEach(v => res.add(v));
        return res;
    }

    static Sub(v1: Vector, v2: Vector) {
        let res = v1.clone();
        res.sub(v2);
        return res;
    }

    static Mult(...vectors: Vector[]) {
        let res = new Vector;
        vectors.forEach(v => res.mult(v));
        return res;
    }

    static Div(...vectors: Vector[]) {
        let res = new Vector;
        vectors.forEach(v => res.div(v));
        return res;
    }

    static Dist(v1: Vector, v2: Vector) {
        return Math.sqrt(Math.pow(v1.x - v2.x, 2) + Math.pow(v1.y - v2.y, 2));
    }

    static From(...args: Vec2[]): Vector[] {
        return args.map(vec2 => new Vector(vec2[0], vec2[1]));
    }
}