import { findHyp } from "./math";
import { Circle, Polygon } from "./primitives";
import { Vector } from "./vector";

export namespace Collision {

    /** @returns true if collided*/
    export function Cricle2Circle([x1, y1, r1]: Circle, [x2, y2, r2]: Circle): boolean {
        let dist = findHyp(x2 - x1, y2 - y1);
        return (dist < r1 + r2);
    }

    export function Polygon2Polygon(A: Polygon, B: Polygon, getIntersection = false): false | Vector {
        for (let a = 0; a < A.points.length; a++) {
            for (let b = 0; b < B.points.length; b++) {
                // A Polygon
                let { x: x1, y: y1 } = Vector.Add(A.points[a], A.center);
                let { x: x2, y: y2 } = Vector.Add(A.points[(a + 1) % A.points.length], A.center);
                // B Polygon
                let { x: x3, y: y3 } = Vector.Add(B.points[b], B.center);
                let { x: x4, y: y4 } = Vector.Add(B.points[(b + 1) % B.points.length], B.center);

                let uA = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
                let uB = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));

                if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
                    return new Vector(x1 + (uA * (x2 - x1)), y1 + (uA * (y2 - y1)))
                }
            }
        }

        return false;
    }
}