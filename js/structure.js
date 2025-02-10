import { Point } from "./point.js";
import { Stick } from "./stick.js";

export class Structure {
    constructor() {
        this.points = [];
        this.sticks = [];
        this.timeSpeed = 5;
    }

    changeTimeSpeed(value) {
        if(value >= 0) this.timeSpeed = value;
    }

    addPoint(x, y, fixed=false) {
        const point = new Point(x, y??x, fixed);
        this.points.push(point);
        return point
    }

    addStick(p1, p2, length) {
        const stick = new Stick(p1, p2, length);
        this.sticks.push(stick);
        return stick
    }

    createPointAndStick(point, len, angle, fixed=false, motor=false) {
        const p2 = Point.loadPoint(point.translate(len, angle));
        p2.fixed = fixed;
        p2.motor = motor;
        this.points.push(p2);
        const stick = this.addStick(point, p2, len);

        return { point: p2, stick }
    }

    stable() {
        do {
            this.updateSticks();
        } while(this.sticks.find(s => Math.abs(s.length - s.currentLength) >= 0.01));        
    }

    updateSticks() {
        for(const stick of this.sticks) stick.update();
    }

    update(deltaTime, forces) {
        const updatedDeltaTime = deltaTime * this.timeSpeed;
        for(const point of this.points) point.update(updatedDeltaTime, forces);
    }

    draw(context) {
        for(const point of this.points) point.draw(context);
        for(const stick of this.sticks) stick.draw(context);
    }
}