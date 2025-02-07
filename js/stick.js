import { Point } from "./point.js";
import { Vector } from "./vector.js";

export class Stick {
    constructor(p1, p2, length) {
        this.p1 = p1;
        this.p2 = p2;
        this.length = length??this.p1.subtract(this.p2).magnitude();        
        this.halfLength = this.length*0.5;
        if((this.p1.fixed && this.p1.motor) || (this.p2.fixed && this.p2.motor)) {
            this.stickVec = this.p1.motor ? this.p1.subtract(this.p2) : this.p2.subtract(this.p1);            
        }
    }

    update() {
        
        const stickVec = this.p1.subtract(this.p2);
        if(stickVec.magnitude() < this.length*0.9) console.log(stickVec.magnitude() > this.length);
        if(stickVec.magnitude() > 0.01) {
            if(this.p1.fixed || this.p2.fixed) {
                const dirOfStick = Vector.polarToVec(1, (this.stickVec ? this.stickVec.angle() + (this.p1.motor ? this.p1.angle : this.p2.angle) : stickVec.normalize().angle())).normalize();
                if(!this.p2.fixed) this.p2.updatePos(dirOfStick.scale(-this.length).add(this.p1));
                if(!this.p1.fixed) this.p1.updatePos(dirOfStick.scale(this.length).add(this.p2));
            } else {
                const midPoint = Vector.midPoint(this.p1, this.p2);
                const dirOfStick = stickVec.normalize();
                this.p2.updatePos(dirOfStick.scale(-this.halfLength).add(midPoint));
                const remainingStickLen = this.length - midPoint.subtract(this.p2).magnitude();
                this.p1.updatePos(dirOfStick.scale(remainingStickLen).add(midPoint));
            }
        }
    }

    // update() {
    //     const dirOfStick = this.p1.subtract(this.p2).normalize();
    //     const midPoint = Vector.midPoint(this.p1, this.p2);
        
    //     this.p1.updatePos(dirOfStick.scale(this.halfLength).add(midPoint));
    //     const remainingStickLen = this.length - this.p1.subtract(midPoint).magnitude();
    //     this.p2.updatePos(dirOfStick.scale(-remainingStickLen).add(midPoint));
        
    //     let stickLen = this.p1.subtract(this.p2).magnitude();
    //     if(stickLen < this.length) {
    //         const remainingStickLen = this.length - this.p2.subtract(midPoint).magnitude();
    //         this.p1.updatePos(dirOfStick.scale(remainingStickLen).add(midPoint));
    //         stickLen = this.p1.subtract(this.p2).magnitude();
    //     }
    // }

    draw(context, { width=2, color='black' }={}) {
        context.strokeStyle = color;
        context.lineWidth = width;
        context.beginPath();
        context.moveTo(this.p1.x, this.p1.y);
        context.lineTo(this.p2.x, this.p2.y);
        context.stroke();
    }
}