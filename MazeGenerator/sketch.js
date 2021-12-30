//the amount of rows and columns of the maze, based on the width of the screen and height divided by the size of the cell
var cols, rows;
//the size of the current cell object
var sizeOfCell = 60;

//the array to store the grid of all the cell objects.
var grid = [];

var currentCell;

var stackOfCells = [];

var startingCellIndex;

function setup() {
    createCanvas(2400, 2400);

    //for debugging purposes to see the grid populate slowly.
    //frameRate(2);

    //assign the rows and columns to be the size of the height and width divided by whatever the size of the cell is.
    cols = floor(width / sizeOfCell);
    rows = floor(height / sizeOfCell);


    //create a cell object for each row and column, so in this case create 10 columns with 10 rows in each. So
    //it will be a 100 celled maze. bc 10x10
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            //make a new cell object at this row and this col.
            var cell = new Cell(i, j);
            //push the new cell object into the array holding the grid collection of cells.
            grid.push(cell);
        }
    }

    //make the current cell start at a random cell from 0 to the grid length, and floor the number to make sure
    //it returns a whole numbers.
    var randomCellIndex = floor(random(0, grid.length - 1));
    startingCellIndex = randomCellIndex;
    //make the current cell the cell at the grid based on the random number as a index.
    currentCell = grid[randomCellIndex];
    //set the current random cell we selected as the starting cell, so it can be marked as green.
    currentCell.SetStartingCell();
}

function draw() {
    //draw grey background.
    background(51);
    //show all the cells to the screen.
    for (var i = 0; i < grid.length; i++) {
        grid[i].show();
    }

    //make sure to mark the current cell that we are at as visited.
    currentCell.visted = true;
    currentCell.highlight();
    //checks the current cell too see if it has any neighbours and adds the neighbors to a array inside of that cell.
    //then returns a random neighbor if one exists and assign it to the var.
    var nextCell = currentCell.checkNeighbors();

    if (nextCell) {
        nextCell.visted = true;
        nextCell.currentEnd = true;
        stackOfCells.push(currentCell);

        //remove the walls between the cells before we set the currentcell to the next cell to repeat the process.
        removeWalls(currentCell, nextCell);

        //set the currentcell to the next cell in order to now look for the next cells neighbor.
        currentCell = nextCell;

    } else if (stackOfCells.length > 0) {
        console.log(stackOfCells.length);
        currentCell = stackOfCells.pop();
        currentCell.currentEnd = false;
    }

    if(stackOfCells <= 1){
        currentCell.lastCell = true;
        fill(255,0,0);
        rect(grid[startingCellIndex].col * sizeOfCell + (sizeOfCell/3), grid[startingCellIndex].row * sizeOfCell + (sizeOfCell / 3), sizeOfCell/3, sizeOfCell/3)
    }


}

function removeWalls(curCell, nextCell) {
    var x = curCell.col - nextCell.col;
    var y = curCell.row - nextCell.row;
    if (x === 1) {
        curCell.walls[3] = false;
        nextCell.walls[1] = false;
    } else if (x === -1) {
        curCell.walls[1] = false;
        nextCell.walls[3] = false;
    }
    if (y === 1) {
        curCell.walls[0] = false;
        nextCell.walls[2] = false;
    }
    if (y === -1) {
        curCell.walls[2] = false;
        nextCell.walls[0] = false;
    }

}

//this returns the index of the cell by adding the col and row and multiplying it by the total cols in the grid.
//so for example if the index col row is 0 we do 0 * 10 then plus the row so for example 3. and the index is 3.
// another example if column is 3 and row 2, we do 3 * 10 = 30 + 2 index = 32; This is assuming that the grid array has a size of 100
function index(j, i) {

    //if the row is less then 1 or greater then the boundary of the total columns and rows, we return a -1 to deal with when
    //this function is called.
    if (i < 0 || j < 0 || i > rows - 1 || j > cols - 1) {
        return -1;
    }
    return j + i * cols;
}

function Cell(row, col) {
    //this is the current cells row and column index values
    //this could be done using a matrix array to store the values together but this way is the same thing.
    this.row = row;
    this.col = col;

    //this array of walls keeps track of the cells information to see if there is a wall
    //in the top, right, bottom, left - in that order - part of the cell.
    this.walls = [true, true, true, true];

    //stores information for the current cell to check if it has been visited.
    this.visted = false;

    this.startingCell = false;
    this.lastCell = false;
    this.currentEnd = false;


    //this functions checks the top, right, left, and bottom to see if there is any neighbors beside it that arent visited yet
    this.checkNeighbors = function () {
        var neighbors = [];

        var top = grid[index(col, row - 1)];
        var right = grid[index(col + 1, row)];
        var bottom = grid[index(col, row + 1)];
        var left = grid[index(col - 1, row)];


        if (top && !top.visted) {
            neighbors.push(top);
            console.log("Top row " + top.row + " Top Col " + top.col + "\nrow/col index: " + index(col, row - 1) + " row and col value " + row + "/" + col);

        }
        if (right && !right.visted) {
            neighbors.push(right);
            console.log("right row " + right.row + " right Col " + right.col + "\nrow/col index: " + index(col + 1, row) + " row and col value " + row + "/" + col);

        }
        if (bottom && !bottom.visted) {
            neighbors.push(bottom);
            console.log("bottom row " + bottom.row + " bottom Col " + bottom.col + "\nrow/col index: " + index(col, row + 1) + " row and col value " + row + "/" + col);

        }
        if (left && !left.visted) {
            console.log("left row " + left.row + " left Col " + left.col + "\nrow/col index: " + index(col - 1, row) + " row and col value " + row + "/" + col);
            neighbors.push(left);
        }

        if (neighbors.length > 0) {
            var r = floor(random(0, neighbors.length));
            console.log("Stack of cell count: " + stackOfCells.length);
            console.log("\n\n");
            return neighbors[r]
        } else {
            return undefined;
        }
    }

    this.SetStartingCell = function () {
        this.startingCell = true;
    }

    this.SetLastCell = function (){
        this.lastCell = true;
    }

    this.highlight = function () {
        //the x location is the current i position times the size of the cell.
        //so if it is in cols 2 then it is in the 2 X 60 position on the screen so its coordinate is 120 on the x;
        var x = this.col * sizeOfCell;
        //the y location is the current location of the row times the size of the cell. so for the third row, we take
        // 3 * 60 to get the 180 world position on the screen.
        var y = this.row * sizeOfCell;

        if(!this.lastCell){
            if(this.currentEnd){
                noStroke();
                fill(255, 255, 255, 100);
                rect(x, y, sizeOfCell, sizeOfCell);
            }
            noStroke();
            fill(0, 0, 255, 100);
            rect(x, y, sizeOfCell, sizeOfCell);
        }
        else {
            //if its the last cell make it just bright green.
            noStroke();
            fill(0, 255, 0);
            rect(x, y, sizeOfCell, sizeOfCell);
        }

    }

    this.show = function () {
        //the x location is the current i position times the size of the cell.
        //so if it is in cols 2 then it is in the 2 X 60 position on the screen so its coordinate is 120 on the x;
        var x = this.col * sizeOfCell;
        //the y location is the current location of the row times the size of the cell. so for the third row, we take
        // 3 * 60 to get the 180 world position on the screen.
        var y = this.row * sizeOfCell;

        //this makes the strokes (line) a white colour.
        stroke(255);

        //checks if the walls array at the index position is true.
        //if there is a wall at that position then we draw out the line to complete the wall.
        //else we skip over it.
        if (this.walls[0]) {
            line(x, y, x + sizeOfCell, y)
        }
        if (this.walls[1]) {
            line(x + sizeOfCell, y, x + sizeOfCell, y + sizeOfCell)
        }
        if (this.walls[2]) {
            line(x + sizeOfCell, y + sizeOfCell, x, y + sizeOfCell)
        }
        if (this.walls[3]) {
            line(x, y + sizeOfCell, x, y)
        }

        // if the cell is visited just make it a purple colour for now.

        if (this.visted) {
            if (this.startingCell) {
                noStroke();
                fill(0, 255, 0);
                rect(x, y, sizeOfCell, sizeOfCell);
            }
            else {
                noStroke();
                fill(255, 0, 255, 100);
                rect(x, y, sizeOfCell, sizeOfCell);
                }
            }

        //do not fill the rectangles with anything inside of it.
        // noFill();
        //draw a rect at the x and y position with the size of the cell on both length and width
        //rect(x,y,sizeOfCell, sizeOfCell);
    }
}
