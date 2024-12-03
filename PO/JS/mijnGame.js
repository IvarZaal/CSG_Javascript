var vnr = 'aardig';

function preload() {
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  createCanvas(windowWidth,windowWidth); // Create a 400x400 canvas
  background(220);        // Set a light gray background
}

// draw() loops continuously after setup()
function draw() {
  // Example: Draw a circle at the mouse position when clicked
  if (mouseIsPressed) {
    fill('black'); // Random fill color
    noStroke(); // No border
    ellipse(mouseX, mouseY, 10, 10); // Draw a circle
  }
}

function keyTyped() {
}