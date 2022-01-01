var cols, rows;
var sizeOfSquares = 20;

var terrain = [];
var w = 1200;
var h = 1200;
var flying = 0;
function setup() {
    createCanvas(600, 600, WEBGL);

    cols = w / sizeOfSquares;
    rows = h / sizeOfSquares;

    //make the starting array the size of the rows.
    terrain = new Array(rows);
    //for every single row in the array, make a new array inside of that row of the amount of columns
    for (var i = 0; i < cols; i++) {
        terrain[i] = new Array(cols);
    }

}

function draw() {

    flying-= 0.09;
    var yOffset = flying;
    for (var y = 0; y < rows; y++) {
        var xoffSet = 0;
        for (var x = 0; x < cols; x++) {
            terrain[x][y] = map(noise(xoffSet,yOffset),0,1, -100, 100);
            xoffSet += 0.15;
        }
        yOffset+=0.15;
    }

    //rotate the x axis of the terrain so it is facing 160 degrees from the camera.
    rotateX(PI / 4);
    //translate the screen to the middle. the reason we use - for the h and w is because in 3d/webgl
    //the starting point of 0,0 is the middle of the screen so the negative value of that divided by 2 is the top left
    translate(-w / 2, -h / 2 );
    //set the background to black
    background(0);
    //make the lines white.
    stroke(255);
    //make sure there is no fill.
    //fill(173,216,230);
    noFill();
    //go over every row and begin the triangle shape.
    for (var y = 0; y < rows - 1; y++) {
        beginShape(TRIANGLE_STRIP);
        //go over every column inside of the row.
        for (var x = 0; x < cols; x++) {
            //set the first vertex in the column to be the current x and y coord
            vertex(x * sizeOfSquares, y * sizeOfSquares, terrain[x][y]);
            //then set the next vertex to be the one underneath it.
            //this is done because during the next row it will print it diagnoally to the column + 1
            //  /\/\
            //  \/\/
            vertex(x * sizeOfSquares, (y + 1) * sizeOfSquares, terrain[x][y + 1]);

        }
        endShape();
    }

}