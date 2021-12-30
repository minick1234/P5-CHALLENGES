let sun;
let cam;

function setup() {
    let canvas = createCanvas(600, 600, WEBGL);
    // Disable the context menu on the canvas so the camera can use the right mouse button
    canvas.elt.oncontextmenu = () => false;

    cam = createEasyCam({ distance: 500 });

    sun = new Planet(50, 0, 0);
    sun.spawnMoons(4, 1);
}

function draw() {
    background(0);
    lights();
    sun.show();
    sun.orbit();
}