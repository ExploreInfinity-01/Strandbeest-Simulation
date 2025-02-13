import { clamp } from "./utils.js";
import { Vector } from "./vector.js";

const completeCircleAngle = 2*Math.PI;

export class Point extends Vector {
    constructor(x, y, fixed=false) {
        super(x, y);
        this.oldPos = new Vector(x, y);
        this.velocity = new Vector(0, 0);
        this.acc = new Vector(0, 0);
        this.friction = 0.05;
        this.mass = 5;
        this.invMass = 1 / this.mass;
        this.fixed = fixed;
        this.motor = false;
        this.motorSpeed = -0.25;
        this.angle = 0;
        this.onground = false;
    }

    setPointDrawPath() {
        this.drawPath = true;
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        document.body.append(this.canvas);
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    static loadPoint(pointData) {
        return new Point(pointData.x, pointData.y, pointData.fixed??false);
    }

    calculateNetForce(forces) {        
        const netForce = new Vector(0, 0);
        for(const force of forces) {
            if(!this.fixed && force.label === 'gravity') 
                netForce.updateVec(netForce.add(force));
            
            if(this.onground && force.label === 'wind')
                netForce.updateVec(netForce.add(force));
        }
        return netForce
    }

    updateKinematics(deltaTime, netForce) {
        this.acc.updateVec(netForce.scale(this.invMass));
        // this.velocity.updateVec(this.velocity.add(this.acc.scale(deltaTime)));        
        // this.velocity.updateVec(this.velocity.scale(1-this.friction));        
    }

    updatePos(vec) {
        if(vec.x <= 0 || vec.x >= window.innerWidth) {
            vec.x = clamp(vec.x, 0, window.innerWidth);
        }
        if(vec.y >= window.innerHeight*0.9) {
            vec.y = clamp(vec.y, 0, window.innerHeight*0.9);
            this.onground = true
        } else this.onground = false;

        this.velocity.updateVec(this.subtract(this.oldPos));
        this.oldPos.updateVec(this);
        this.updateVec(vec);
    }

    update(deltaTime, forces) {
        if(this.motor) this.angle += this.motorSpeed * deltaTime;
        if(this.fixed) return
        const netForce = this.calculateNetForce(forces);
        this.updateKinematics(deltaTime, netForce);
        this.updatePos(this.add(this.velocity.scale(deltaTime).add(this.acc)));
    }

    draw(context, { size=5, color='black' }={}) {
        context.fillStyle = color;
        context.beginPath();
        context.arc(this.x, this.y, size, 0, completeCircleAngle);
        context.fill();
        
        if(this.drawPath) {
            const size = 1;
            this.context.beginPath();
            this.context.arc(this.x, this.y, size, 0, completeCircleAngle);
            this.context.fill();
        }
    }
}