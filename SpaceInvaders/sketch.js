//The players ship object.
var ship;

//The aliens array storing all the aliens on the screen
var aliens = []
//The max number of aliens on the screen right now at once
var maxAliens = 6;
//The width of the alien object
var alienWidth = 30;
//The height of the alien object
var alienHeight = 30;

//The shot array holding all the shots on the screen
var shots = [];
//The timer which is assigned when we shoot a shot.
var shotTimer = 0;
//The amount of time between each shot in seconds.
var timeBetweenShots = 0.5;

function setup() {
    createCanvas(600, 400);
    ship = new Ship();
    for (var i = 0; i < maxAliens; i++) {
        aliens[i] = new Alien(i * 80 + 80, 60, alienWidth, alienHeight);
    }
}

function draw() {
    background(51);
    ship.show();
    //check for key pressed.
    shipKeyPressCheck();

    //every 60 frames one second passed. This is determined by the framecount % 60 ===0, the meaining of the check for 0 is to make sure we can divide the frame count by 60 and have 0 remainders, which
    // proves that one full second of frames has passed. As well we make sure the shotTimer is greater then 0
    if (frameCount % 60 === 0 && shotTimer > 0) {
        shotTimer--;
    }
    //every time we redraw we get a new hitindeex and hit resets to false in order to check loop below.
    var hitIndex;
    var hit = false;

    //go over all the shots in the array and print them out to the screen and move them
    for (var i = 0; i < shots.length; i++) {
        shots[i].show();
        shots[i].move();
        //go over each alien while going over each shot and check if the shot hits an alien.
        for (var j = 0; j < aliens.length; j++) {
            if (shots[i].hits(aliens[j])) {
                //if an alien was hit we splice it from the array and print out the aliens left console.log
                aliens.splice(j, 1);
                console.log("Aliens Left: " + aliens.length)
                //assign the index of the bullet that hit the alien and the hit as true.
                hitIndex = i;
                hit = true;
            }

        }
    }

    //Check if the shot from before had hit anything, and if so remove it based on the index.
    if (hit) {
        shots.splice(hitIndex, 1);
    }


    var alienHitEdge = false;
    //for now what this does it prints out all the aliens to the screen from the array,
    //the position they spawn at is determined when they are first created.
    for (var i = 0; i < aliens.length; i++) {
        aliens[i].show();
        aliens[i].move();

        if(aliens[i].x > width - alienWidth || aliens[i].x < 0 + alienWidth){
            alienHitEdge = true;
        }
        if(alienHitEdge){
            for(var i = 0; i <  aliens.length; i++){
                aliens[i].shiftDown();
            }
        }

    }
}

//Check for a key pressed, in this case we check if space is pressed and the timer is 0 in order to fire a shot.
//this shot is then pushed to the array and we set the timer back to the timebetween shots.
function keyPressed() {
    if (key === ' ' && shotTimer <= 0) {
        var shot = new Shot(ship.x, ship.y - 15);
        shots.push(shot);
        shotTimer = timeBetweenShots;
    }
}

//This function checks for the key pressed and assigns the move to go in the positive or negative x.
// it is called in the draw to check for continuous movement.
function shipKeyPressCheck() {

    if (keyIsDown(RIGHT_ARROW)) {
        ship.move(1);
    }
    if (keyIsDown(LEFT_ARROW)) {
        ship.move(-1);
    }


}
