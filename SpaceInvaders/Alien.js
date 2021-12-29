function Alien(x, y, alienWidth, alienHeight) {

    this.x = x;
    this.y = y;
    this.r = alienWidth;
    this.xDir = 1;
    this.yDir = 0;

    this.show = function () {
        fill(255, 0, 200);
        rectMode(CENTER);
        rect(this.x, this.y, alienWidth, alienHeight);
    }

    this.move = function() {
        this.x += this.xDir;
        this.y += this.yDir;
    }

    this.shiftDown = function (){
        this.xDir *= -1;
        this.y += this.r;
    }

}