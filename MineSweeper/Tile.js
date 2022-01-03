function Tile(xPos, yPos, tileSize) {

    this.fill = 'white';
    this.x = xPos * tileSize;
    this.y = yPos * tileSize;
    this.bombTile = false;
    this.clicked = false;

    this.show = function () {
        fill(this.fill);
        rect(this.x, this.y, tileSize, tileSize);
    }

    this.isClicked = function () {
            if ((mouseX > this.x && mouseX < this.x + tileSize) && (mouseY >= this.y && mouseY <= this.y + tileSize) && mouseIsPressed && !this.clicked) {
                this.fill = 'black';
                this.clicked = true;
                numOfClicks+=1;
                console.log("clicked");
        }
    }


    this.setBombTile = function () {
        this.bombTile = true;
    }
}