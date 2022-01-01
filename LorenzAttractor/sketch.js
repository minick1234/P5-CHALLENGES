var x = 0.01, y = 0, z = 0;

var a = 10.0;
var b = 28;
var c = 8.0 / 3.0;

var xRotAmount = 1;

var points = [];

function setup() {
    createCanvas(600, 600, WEBGL);
    colorMode(HSB)

}

function draw() {
    background(0);

    var dt = 0.01;
    var dx = (a * (y - x)) * dt;
    var dy = (x * (b - z) - y) * dt;
    var dz = ((x * y) - (c * z)) * dt;
    x += dx;
    y += dy;
    z += dz;

    points.push(new p5.Vector(x, y, z));

    let camX = map(mouseX, 0, width, -200, 200);
    let camY = map(mouseY, 0, height, -200, 200);
    camera(camX, camY, height / 2 / tan((PI * 30) / 180), 0, 0, 0, 0, 1, 0);
    //translate(width/2, height/2);
    scale(5);
    stroke(255);
    noFill();

    //rotate(xRotAmount);
    //xRotAmount+= 5;
    let hu = 0;
    beginShape();
    for (let curPoint of points) {
        stroke(hu, 255,255);
        vertex(curPoint.x, curPoint.y, curPoint.z);
        //point(x,y);
        hu += 1;
        if(hu > 255){
            hu = 0;
        }
    }
    endShape();
    console.log(x + " " + y + " " + z)

}