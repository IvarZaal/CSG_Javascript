
function preload() {
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  background('blue');
  textFont("Monospace");
  textSize(40);
  textAlign(CENTER,CENTER);
}

function draw() {
  spel.nieuwSpel()
}

function keyTyped() {
}