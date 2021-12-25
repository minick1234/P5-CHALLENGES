const d = [];

function setup() {
    createCanvas(640, 360);

    for (var i = 0; i < 500; i++) {
        d[i] = new Drop();
    }
}

function draw() {
    background(230, 230, 250);
    for (var i = 0; i < d.length; i++) {
        d[i].fall();
        d[i].show();
    }
}