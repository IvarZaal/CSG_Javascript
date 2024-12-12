

function setup() {
  createCanvas(windowWidth, windowHeight);
  background('blue');
  textFont("Monospace");
  textSize(40);
  textAlign(CENTER, CENTER);
  frameRate(60);
  Spel = new Spel()
  Hero = new Hero()
}

function draw() { 
  Spel.teken();
  if(Spel.spelActief) {
    Hero.teken();
  }
}

function keyPressed() {
  if (key === 'k' || key === 'K') {
    Hero.maakOnschendbaar(); // Correcte manier om Hero aan te roepen
  }
}