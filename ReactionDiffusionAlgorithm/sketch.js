var next;
var feedRate = 0.055;
var killRate = 0.062;

var dA = 1;
var dB = 0.5;

var grid;
var timeStep = 1;

function setup() {
    createCanvas(600, 600);
    pixelDensity(1);
    grid = [];
    next = [];
    for (var x = 0; x < width; x++) {
        grid[x] = [];
        next[x] = [];
        for (var y = 0; y < height; y++) {
            grid[x][y] = {a: 0, b: 1};
            next[x][y] = {a: 0, b: 0};
        }
    }
}

function draw() {
    background(51);

    for (var x = 1; x < width - 1; x++) {
        for (var y = 1; y < height - 1; y++) {
            next[x][y].a = grid[x][y].a +
                (dA * laplaceA(x, y))
                - (grid[x][y].a * (pow(grid[x][y].b, 2)))
                + (feedRate * (1 - grid[x][y].a)) * timeStep;

            next[x][y].b = grid[x][y].b +
                (dB * laplaceB(x, y))
                + (grid[x][y].a * (pow(grid[x][y].b, 2)))
                - ((killRate + feedRate) * grid[x][y].b) * timeStep;
        }
    }

    loadPixels();
    for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
            var pix = (x + y * width) * 4;
            pixels[pix + 0] = floor(next[x][y].a * 255);
            pixels[pix + 1] = 0;
            pixels[pix + 2] = floor(next[x][y].b * 255);
            pixels[pix + 3] = 255;
        }
    }
    updatePixels();
    swap();
}

function laplaceA(x, y) {
    var sumA = 0;
    sumA += grid[x][y].a * -1;
    sumA += grid[x - 1][y].a * 0.2;
    sumA += grid[x + 1][y].a * 0.2;
    sumA += grid[x][y - 1].a * 0.2;
    sumA += grid[x][y + 1].a * 0.2;
    sumA += grid[x - 1][y - 1].a * 0.05;
    sumA += grid[x + 1][y + 1].a * 0.05;
    sumA += grid[x - 1][y + 1].a * 0.05;
    sumA += grid[x + 1][y - 1].a * 0.05;

    return sumA;
}

function laplaceB(x, y) {
    var sumB = 0;
    sumB += grid[x][y].b * -1;
    sumB += grid[x - 1][y].b * 0.2;
    sumB += grid[x + 1][y].b * 0.2;
    sumB += grid[x][y - 1].b * 0.2;
    sumB += grid[x][y + 1].b * 0.2;
    sumB += grid[x - 1][y - 1].b * 0.05;
    sumB += grid[x + 1][y + 1].b * 0.05;
    sumB += grid[x - 1][y + 1].b * 0.05;
    sumB += grid[x + 1][y - 1].b * 0.05;

    return sumB;
}

function swap() {
    var temp = grid;
    next = temp;
    grid = next;
}

