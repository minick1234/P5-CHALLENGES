function Snake() {
    //the current speed of the snake in the x direction
    this.xspeed = 0;
    //the current y position of the snake in the y direction
    this.yspeed = 0;

    this.alive = true;

    //this array stores the length of the snake
    this.snake = [];
    //at the begining of the game start the snake in the middle of the screen
    //to get the center we take the width / 2 and then subtract 20 to get rid of the scaled value we start with.
    //if we had no scale applied to the snake we could just do the width/2
    this.snake[0] = createVector(width / 2 - scl, height / 2 - scl);

    this.death = function () {
        if ((this.snake[0].x >= width || this.snake[0].x < 0) || (this.snake[0].y >= height || this.snake[0].y < 0)) {
            this.kill();
        } else if (this.snake.length > 2) { //make sure the length of the snake is greater then 1
            // go over every single item in the tail array starting from 1 because we dont want the head.
            for (var i = 1; i < this.snake.length; i++) {
                //calculate the distance from the head to the current tail at the i index,
                var d = dist(this.snake[0].x, this.snake[0].y, this.snake[i].x, this.snake[i].y);
                //if the distance is less then 1 then that means we are intersecting with the current tail piece.
                //if thats so call the kill function.
                if (d < 1) {
                    this.kill();
                }
            }
        }

        this.kill = function () {
            console.log("Your Score this round: " + this.snake.length);
            this.snake = [];
            this.snake[0] = createVector(width / 2 - scl, height / 2 - scl);
            console.log("You have died! Press left space to start again");
            noLoop();
            paused = true;
            pickLocation();
        }
    }

    //this is called to update the position of the snake by adding the speed its moving to the position its at.
    this.update = function () {

        //check to make sure that the length of the snake is greater then 1 to make the tail follow behind the previous item in the array
        if (this.snake.length > 1) {
            //go over every single item in the array based on the length of the snake from the end to the initial (head) which is index 0 and the snake.length is the end of tail.
            for (var i = this.snake.length - 1; i > 0; i--) {
                //these pieces of code make sure the tail of the snake follows behind the previous position of the previous tail bit so that they consintently follow eachother.
                //update the current x position of the snakes tail bit to the previous position of the past tail bit for the x
                this.snake[i].x = this.snake[i - 1].x;
                //update the current y position of the snakes tail bit to the previous position of the past tail bit for the y
                this.snake[i].y = this.snake[i - 1].y;
            }
        }

        //the reason we use the index 0 for the snake array is because that is also our (head) position so it moves from there.
        // the current x position += the xspeed assigned from the direction we move in.
        //the reason we use *scl is because we move the snake based on the scale we set for the grid so it moves a certain amount of "grid" spaces.
        this.snake[0].x += this.xspeed * scl;
        // the current y position += the yspeed assigned from the direction we move in.
        this.snake[0].y += this.yspeed * scl;

        //constain the snake from the -20 on both the x and y to the width of the canvas which is +20 over the width. This is because the scale is 20,
        //if we wanted to get the true width of the screen we would do the width - scl because then it would give us the proper position,
        //but we do this in order to help with the death function because once we pass the constraint of the screen we will kill the player and make them restart.
        this.snake[0].x = constrain(this.snake[0].x, -20, width);
        this.snake[0].y = constrain(this.snake[0].y, -20, width);
    }

    //function to take an x and y direction that is passed from the keypressed function which returns the
    //value of the direction we should be moving.
    this.dir = function (xDir, yDir) {
        if (this.snake.length > 1) {
            //get the snakes head next x position after the application of the xdir * scl to the x position
            var snakeHeadNextX = (this.snake[0].x + (xDir * scl));
            //get the snakes head next y position after the application of the ydir * scl to the y position

            var snakeHeadNextY = (this.snake[0].y + (yDir * scl));

            if ((snakeHeadNextX && snakeHeadNextY) === (this.snake[1].x && this.snake[1].y)) {
                //if we try to go inside of the tail object behind it, we just dont apply any force and keep going the direction we are headed.
            } else {
                //equal the xspeed to be whatever the xDir value is from the key pressed.
                this.xspeed = xDir;
                //equal the yspeed to be whatever the yDir value is from the key pressed.
                this.yspeed = yDir;
            }
        } else {
            //equal the xspeed to be whatever the xDir value is from the key pressed.
            this.xspeed = xDir;
            //equal the yspeed to be whatever the yDir value is from the key pressed.
            this.yspeed = yDir;

        }
    }

    //this is used to visualize the snake object
    this.show = function () {
        //fill the snake rect with a white colour - call this first so that the snake can be made as a white colour and not the same colour as the food.
        fill(255);

        //go over the length of the snake array and draw out all the items inside of it to the screen at the position of the snake tail object,
        //when snake length is 1, it means only the one piece of head exists so it will continuously loop over i = 0 to redraw the head of the snake constantly at the correct position.
        for (var i = 0; i < this.snake.length; i++) {
            rect(this.snake[i].x, this.snake[i].y, scl, scl);
        }
    }

    this.eat = function (pos) {
        //calculate the distance of the snake head to the piece of foods position
        var d = dist(this.snake[0].x, this.snake[0].y, pos.x, pos.y);

        //if the position of the food to the snakes head is less then 1 we return true to be able to redraw the food point to a new random vector.
        if (d < 1) {
            //when the food is eaten before we redraw we increase the size of our snake.
            //this is done by taking the snake array at the lengths index and creating a new vector, which is assigned to the snakes previous positions x and y. in this case when we have 2 pieces, meaning
            //the head and a piece of the tail, we get the length of the snake before we create the new vector, which is 1, and we add it to the index of 0 x and y position.
            //so for example when we start length = 1, when we eat something the first time we get snake[1] - (the length of the array which is coincidently the new position aswell) = snake[1-1].x , snake[1-1.y]
            //and on the next run it would be length = 2, and again we set the index of snake[2] = snake[2-1].x, snake[2-1].y because the length is 2, which coincides with the position we are also adding to.
            //this is done because the length doesnt increase until after that line is executed. meaning that until line 81 after we created and added the vector, the length doesnt change from 1 to 2. but once on line 81 it changes to length=2
            this.snake[this.snake.length] = createVector(this.snake[this.snake.length - 1].x, this.snake[this.snake.length - 1].y);
            return true;
        }
        return false;
    }
}
