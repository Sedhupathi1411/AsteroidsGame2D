class Vector {
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
        let t = this.angle;
        let r = this.mag;
        // this.set()
        // TODO:
    }

    // Accessors

    get mag() {
        return Math.sqrt((this.x * this.x) + (this.y + this.y));
    }

    set mag(r: number) {
        if(this.x == 0 && this.y == 0) return;
        let angle = this.angle;
        this.set(r * Math.cos(angle), r * Math.sin(angle));
    }

    get angle() { return Math.atan2(this.y, this.x); }

    get i() { return new Vector(this.x, 0); }
    get j() { return new Vector(0, this.y); }


    // Static Methods

    static Add(...vectors: Vector[]) {
        let sumV = new Vector;
        vectors.forEach(v => sumV.add(v));
    }

    static Sub(...vectors: Vector[]) {
        let sumV = new Vector;
        vectors.forEach(v => sumV.sub(v));
    }

    static Mult(...vectors: Vector[]) {
        let sumV = new Vector;
        vectors.forEach(v => sumV.mult(v));
    }

    static Div(...vectors: Vector[]) {
        let sumV = new Vector;
        vectors.forEach(v => sumV.div(v));
    }

    static Dist(v1: Vector, v2: Vector) {
        return Math.sqrt(Math.pow(v1.x - v2.x, 2) + Math.pow(v1.y - v2.y, 2));
    }
}