function Cell(pos, r, c){
    if(pos){
        this.pos = pos.copy();
    }else {
        //this is used to store the cells position;
        this.pos = createVector(random(width), random(height));
    }

    //this is the radius of the cell
    this.r = r || 60;
    //this is the colour of the cell
    this.c = c || color(random(100,255), 0, random(100, 255));

    //This is used to move the cells around the screen
    this.move = function (){
            var velocity = p5.Vector.random2D();
            this.pos.add(velocity);
    }

    this.split = function (){
       // this.pos.x += random(-this.r, this.r);
        var cellA = new Cell(this.pos, this.r * 0.8, this.c);
        return cellA
    }

    this.clicked = function(x, y){
        var d = dist(this.pos.x, this.pos.y, x, y);
        if(d < this.r){
            return true;

        }else {
            return false;
        }

    }

    //this is going to be used to show the cell
    this.show = function (){
        noStroke();
        fill(this.c);
        ellipse(this.pos.x, this.pos.y, this.r, this.r);
    }

}