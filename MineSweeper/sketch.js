var rows, cols;
var tileSize = 30;
var tileGrid = [];

var bombXIndicies;
var bombYIndicies;

var bombAmount;
var numOfClicks = 0;

function setup() {

    tileGrid = new Array(rows);

    createCanvas(600, 600);
    rows = height / tileSize;
    cols = width / tileSize;

    bombAmount = (rows * cols) * 0.1;
    console.log(bombAmount);
    for (var y = 0; y < rows; y++) {
        tileGrid[y] = new Array(cols);
        for (var x = 0; x < cols; x++) {
            tileGrid[y][x] = new Tile(x, y, tileSize);
        }
    }
    bombXIndicies = [bombAmount];
    bombYIndicies = [bombAmount];


    for (var i = 0; i < bombAmount; i++) {
        var AlreadyExists = false;
        do {
            var bombTempX = floor(random(0, tileGrid.length));
            var bombTempY = floor(random(0, tileGrid.length));
            for (var j = 0; j < bombXIndicies.length; j++) {
                if (bombXIndicies[j] === bombTempX && bombYIndicies[j] === bombTempY) {
                    console.log("i am here");
                    AlreadyExists = true;
                } else {
                    AlreadyExists = false;
                }
            }
        } while (AlreadyExists);
        bombXIndicies[i] = bombTempX;
        bombYIndicies[i] = bombTempY
    }
    console.log(bombXIndicies.length);
    console.log(bombYIndicies.length);

    for (var i = 0; i < bombAmount; i++) {
        console.log("BombXIndex Value: " + bombXIndicies[i] + " BombYIndex Value: " + bombYIndicies[i]);
        tileGrid[bombYIndicies[i]][bombXIndicies[i]].fill = 'red';
    }

}

function draw() {
    background(51);

    for (var y = 0; y < tileGrid.length; y++) {
        for (var x = 0; x < tileGrid[y].length; x++) {
            tileGrid[y][x].show();
        }
    }


    for (var y = 0; y < tileGrid.length; y++) {
        for (var x = 0; x < tileGrid[y].length; x++) {
            tileGrid[y][x].isClicked();
            if(tileGrid[y][x].clicked){

            }
        }
    }
}



