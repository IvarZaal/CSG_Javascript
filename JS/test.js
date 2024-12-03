function setup() {
  canvas = createCanvas(450,450);
  canvas.parent('processing');
  //noLoop();
}
var xpos = 410;
function draw() {
  background('#012345');
  if (xpos > 60)
    if(mouseIsPressed == true) xpos = xpos-2;
  noStroke();
  fill('#654321');
  rect(0,350,450,100);
  for (var n = 0;n < 4;n++) {
  fill('#ff00ff');
  ellipse(xpos,310,80);
  translate(0,-90,80)
  
  }
}