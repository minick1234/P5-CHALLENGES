function Ship() {
    this.x = width / 2;
    this.y = height - 30;
    this.xSpeed = 3;
    this.shipWidth = 60;

    this.show = function () {
        fill(255);
        //This sets the rectangle to grow from the center.
        rectMode(CENTER);
        //Spawn the rect at the ship x, at the screen height(bottom) - 30 so its up a lil, and make it as
        //big as the ship width we want, and make it 20 high with a radius around the edge of 5, to make
        //it look more curved and not as sharp.
        rect(this.x, this.y, this.shipWidth, 20, 5);
    }

    this.move = function (dir) {
        this.x += dir * this.xSpeed;

        //constrain the x to not move more then the ships width / 2, since it grows from the center,
        //each side from the 0,0 is 20, so the ship from the left to the middle is 20 and the right to the middle
        //is also 20, meaning the total width is 40.
        //we do this to make sure it stays within the bounds.
        //if i removed the rect mode i could just say the width of the ship for the low side
        //and the width of the screen - 40 for the max. but this way i have it now is more dynamic
        this.x = constrain(this.x, this.shipWidth / 2, width - this.shipWidth / 2);

    }


}