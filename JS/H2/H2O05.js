var aantalRijenRaster = 6;
var aantalKolommenRaster = 9;
var celGrootte;

var spriteJos;
var xJos = 400;
var yJos = 300;

function preload() {
  brug = loadImage("images/backgrounds/dame_op_brug_1800.jpg");
  spriteJos = loadImage("images/sprites/Jos100px/Jos_0.png");
}

function setup() {
  canvas = createCanvas(901,601);
  canvas.parent('processing');
  celGrootte = width / aantalKolommenRaster;
}

function draw() {
  background(brug)
  tekenRaster();
  image(spriteJos,xJos,yJos,100,100);
}

function tekenRaster() {
  push();
  noFill();
  stroke('grey');
  for (var l = 0; l < aantalRijenRaster; l++) {
    for (var n = 0; n < aantalKolommenRaster; n++) {
      rect(n*celGrootte,l*celGrootte,celGrootte,celGrootte);
    }
  }
  pop();
}