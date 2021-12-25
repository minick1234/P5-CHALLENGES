function Alien(x, y, alienWidth, alienHeight) {


    this.x = x;
    this.y = y;
    this.r = alienWidth;

    this.show = function () {
        fill(255, 0, 200);
        rectMode(CENTER);
        rect(this.x, this.y, alienWidth, alienHeight);
    }

}