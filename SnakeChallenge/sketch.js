var s;
var scl = 20;
var paused = false;
var food;

function setup() {
    console.log("welcome to snake. You can pause and unpause the game by pressing space. Try to eat all the food and grow as big as you can!");
    createCanvas(600, 600);
    s = new Snake();

    //reduce the frame rate to make the game feel more like old classic snake, we can also make the snake move slower but this isnt the same feeling
    frameRate(10);

    //spawn the food at the random location based on the values calculated in the function
    pickLocation();
}

//this function is used to check if the spacebar was pressed and restarts the loop allowing to restart the game.
function keyTyped() {
    if (paused && key === ' ') {
        loop();
        paused = false;
    } else if (!paused && key === ' ') {
        noLoop();
        paused = true;
    }
}

function pickLocation() {
    //the reason we use floor for each of these is to make sure we get back an int value, its not really important for the cols or rows because it should return 30, because
    //the size of the grid is 600/20 which is 30 but for the create vector the random returns a floating point number,
    //so to make sure we always get a value thats on the grid we return a floored value so its not like 2.3131414 where itll be offset even by a little.

    //calculate the columns based on the width of the screen divided by the scale to get the total columns on the screen
    var cols = floor(width / scl);
    //calculate the columns based on the height of the screen divided by the scale we assign to get the total rows on the screen
    var rows = floor(height / scl);

    //create a new vector for the food object at a random position based on the row and columns we made, and assign it to one of the random positions, then assign it to the food object so that we can spawn the food there.
    food = createVector(floor(random(cols)), floor(random(rows)));

    //this multiplies the vector position by the scale to get the correct coordinate location. // so for example if we generate the values
    // 15, 10 from the rows and columns in the random, ( we can generate only a maximum of 30 because 600 / 20 = 30 for each. height and width)
    //well this means we take the 15 and 10 and have to multiply it by the scalar value in order to get back to the proper coordinate for the canvas.
    //so 15 * 20 and 10 * 20 = 300 and 200, this means on the 600,600 grid we will spawn the point on x=300 and y=200
    //if im still confused ever just console.log and you can see the difference.
    food.mult(scl);
}

function draw() {
    //draw the background of the canvas
    background(51);

    //print the text to the top right corner of the canvas.
    text("Score: " + s.snake.length, 535, 15);

    //check for death conditions at all times before anything else.
    s.death();
    //update the snakes position
    s.update();
    //show the snake to the canvas
    s.show();

    if (s.eat(food)) {
        pickLocation();
    }

    //fill the food in with a purple colour - the snake fill needs to be set first before making the snake rect because it will use this colour, then create the rect and then assign white, so i changed the snake fill order
    //so that in the snake object we call the fill before making the rect of the snake.
    fill(255, 0, 100);
    //make the food appear on the screen based of the x and y we created in the vector with a random position on the width and height
    rect(food.x, food.y, scl, scl)
}


//global function which is being called at all times.
function keyPressed() {


    //move the direction of the snake based on the key pressed. We create a function called dir and
    //assign the snake objects x and y to the key values.
    if (keyCode === UP_ARROW) {
        s.dir(0, -1);
    }
    if (keyCode === DOWN_ARROW) {
        s.dir(0, 1);
    }
    if (keyCode === RIGHT_ARROW) {
        s.dir(1, 0);
    }
    if (keyCode === LEFT_ARROW) {
        s.dir(-1, 0);
    }
}


