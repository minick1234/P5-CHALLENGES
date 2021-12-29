var cells = [];

var cellsStartingAmount = 15;
function setup() {
    createCanvas(400,400);
    for(var i = 0; i < cellsStartingAmount; i++){
        cells.push(new Cell());
    }
}

function mousePressed(){
    for(var i = cells.length - 1; i >= 0; i--){
        if(cells[i].clicked(mouseX,mouseY)){
            cells.push(cells[i].split());
            cells.push(cells[i].split());
            cells.splice(i,1);
            console.log(cells.length);
        }
    }
}

function draw() {
    background(51);
    for(var i = 0; i < cells.length; i++){
        cells[i].show();
        cells[i].move();
    }
}