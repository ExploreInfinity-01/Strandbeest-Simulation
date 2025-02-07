export function clamp(value, min, max) {
    return Math.floor(Math.max(min, Math.min(value, max)))
}

export function degToRad(degrees) {
    return Math.PI * (degrees / 180);
}