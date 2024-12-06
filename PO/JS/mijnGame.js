
function setup() {
  createCanvas(windowWidth,windowHeight);
  background('blue');
  textFont("Monospace");
  textSize(40);
  textAlign(CENTER,CENTER);
  frameRate(60);
  Spel = new Spel();  // chat GPT hulp(vraagt u me alstublieft niet het uit te leggen) 

}
function draw() { 
  Spel.teken()
}

function keyTyped() {
}