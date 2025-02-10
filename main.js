import { Point } from "./js/point.js";
import { Stick } from "./js/stick.js";
import { Structure } from "./js/structure.js";
import { degToRad } from "./js/utils.js";
import { Vector } from "./js/vector.js";

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
setCanvasSize();
window.addEventListener('resize', () => setCanvasSize());


// Forces
const forces = [];
function addForce(x, y, label) {
    const force = new Vector(x, y);
    force.label = label;
    forces.push(force);
    return force
}
const gravity = addForce(0, 9, 'gravity'); // Gravity
const wind = addForce(0, 0, 'wind'); // wind

// Structure
const structure = new Structure();
const stickLengths = {
    "a": 38, 
    "b": 41.5, 
    "c": 39.3, 
    "d": 40.1, 
    "e": 55.8, 
    "f": 39.4, 
    "g": 36.7, 
    "h": 65.7, 
    "i": 49, 
    "j": 50, 
    "k": 61.9, 
    "l": 7.8, 
    "m": 15, 
};
for(const key of Object.keys(stickLengths)) stickLengths[key] *= 3;
const { a, b, c, d, e, f, g, h, i, j, k, l, m } = stickLengths;
const fixedPoint = structure.addPoint(window.innerWidth*0.6, 300, true);
const { point: pointLM, stick: stickL } = structure.createPointAndStick(fixedPoint, l, degToRad(-90), true, true);
const { point: pointAC, stick: stickA } = structure.createPointAndStick(fixedPoint, a, degToRad(180), true);
const { point: pointMJ, stick: stickM } = structure.createPointAndStick(pointLM, m, degToRad(-90));
const { point: pointJE, stick: stickJ } = structure.createPointAndStick(pointMJ, j, degToRad(-160));
const { point: pointEF, stick: stickE } = structure.createPointAndStick(pointJE, e, degToRad(125));
const { point: pointFH, stick: stickF } = structure.createPointAndStick(pointEF, f, degToRad(80));
const { point: pointHI, stick: stickH } = structure.createPointAndStick(pointFH, h, degToRad(45));
const { point: pointCI, stick: stickC } = structure.createPointAndStick(pointAC, c, degToRad(75));
// pointLM.fixed = true;
// pointAC.fixed = true;
const stickB = structure.addStick(pointJE, pointAC, b);
const stickI = structure.addStick(pointCI, pointHI, i);
const stickD = structure.addStick(pointEF, pointAC, d);
const stickG = structure.addStick(pointFH, pointCI, g);
const stickK = structure.addStick(pointMJ, pointCI, k);

pointHI.setPointDrawPath();
structure.changeTimeSpeed(5)

const sticks = { stickA, stickB, stickC, stickD, stickE, stickF, stickG, stickH, stickI, stickJ, stickK, stickL, stickM };

// const fixedPoint = structure.addPoint(window.innerWidth*0.75, 300, true);
// fixedPoint.motor = true;
// const { point: point1 } = structure.createPointAndStick(fixedPoint, m, degToRad(-100));
// const { point: point2 } = structure.createPointAndStick(point1, j, degToRad(-157.5));
// const { point: point3 } = structure.createPointAndStick(point2, b, degToRad(80));
// const { point: point4 } = structure.createPointAndStick(point2, e, degToRad(125));
// const { point: point5 } = structure.createPointAndStick(point1, k, degToRad(125));
// const { point: point6 } = structure.createPointAndStick(point4, f, degToRad(80));
// const { point: point7 } = structure.createPointAndStick(point5, i, degToRad(80));
// const { point: point8 } = structure.createPointAndStick(fixedPoint, l, degToRad(90));
// point3.fixed = true;
// point8.fixed = true;
// structure.addStick(point3, point4, d);
// structure.addStick(point3, point5, c);
// structure.addStick(point5, point6, g);
// structure.addStick(point6, point7, h);
// structure.addStick(point3, point8, a);

// point7.setPointDrawPath();
// structure.changeTimeSpeed(5)
// const point2 = Stick.createStickPoint(point1, 100, degToRad(-145));
// const point3 = Stick.createStickPoint(point2, 83, degToRad(80));
// const point4 = Stick.createStickPoint(point2, 111.6, degToRad(125));
// const point5 = Stick.createStickPoint(point1, 123.8, degToRad(125));
// const point6 = Stick.createStickPoint(point4, 78.8, degToRad(80));
// const point7 = Stick.createStickPoint(point5, 98, degToRad(80));
// addStick(points[0], point1);
// addStick(point1, point2);
// addStick(point2, point3);
// addStick(point2, point4);
// addStick(point3, point4);
// addStick(point1, point5);
// addStick(point3, point5);
// addStick(point4, point6);
// addStick(point5, point6);
// addStick(point5, point7);
// addStick(point6, point7);


// points.push(point1, point2, point3, point4, point5, point6, point7);

const structure2 = new Structure();
structure2.addStick(structure2.addPoint(400, 400), structure2.addPoint(400, 500));

let lastTime = 0;
function animate(timestamp=0) {
    const deltaTime = (timestamp - lastTime) * 0.001;
    lastTime = timestamp;

    if (document.hasFocus()) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        structure.update(deltaTime, forces);
        structure.draw(ctx);        
    }

    requestAnimationFrame(animate)
}
animate();