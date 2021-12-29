function Shot(x, y) {
    this.x = x;
    this.y = y;
    this.r = 8;

    //control the speed the shot moves at.
    this.shotSpeed = 10;


    this.show = function () {
        fill(50, 0, 200);
        ellipse(this.x, this.y - 5, this.r, this.r * 3);
    }

    this.move = function () {
        this.y -= this.shotSpeed;
    }

    this.hits = function (alien, shotsArray, shotIndex) {
        var d = dist(this.x, this.y, alien.x, alien.y);
        if (d < this.r / 2 + alien.r / 2) {
            return true;
        } else {
            return false;
        }
    }


}