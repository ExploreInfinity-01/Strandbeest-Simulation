import { clamp } from "./utils.js";

export class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static midPoint(vec1, vec2) {
        return new Vector((vec1.x + vec2.x)*0.5, (vec1.y + vec2.y)*0.5);
    }

    static polarToVec(magnitude, angle) {
        return new Vector(magnitude * Math.cos(angle), magnitude * Math.sin(angle))
    }

    clampInWindow() {
        this.x = clamp(this.x, 0, window.innerWidth);
        this.y = clamp(this.y, 0, window.innerHeight);
    }

    updateVec(vector) {
        this.x = vector.x;
        this.y = vector.y;
    } 

    add(vector) {
        return new Vector(this.x + vector.x, this.y + vector.y);
    }

    subtract(vector) {
        return new Vector(this.x - vector.x, this.y - vector.y);
    }

    scale(scaler) {
        return new Vector(this.x * scaler, this.y * scaler);
    }

    magnitude() {        
        return Math.sqrt(this.x**2 + this.y**2)
    }

    normalize() {        
        return this.scale( 1 / this.magnitude() );
    }

    angle() {
        return Math.atan2(this.y, this.x)
    }

    translate(magnitude, angle) {
        return this.add(Vector.polarToVec(magnitude, angle));
    }
}