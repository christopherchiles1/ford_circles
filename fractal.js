function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(0);
  stroke(255);
  noFill();

  drawCircles(width / 2, height / 2, width / 2);
}

function drawCircles(x, y, d) {
  ellipse(x, y, d);
  if (d > 2) {
    drawCircles(x + d * 0.5, y, d * 0.5);
    drawCircles(x - d * 0.5, y, d * 0.5);
  }
}

// Inspirations
// The Coding Train [Coding Challenge #77: Recursion](https://www.youtube.com/watch?v=jPsZwrV9ld0)
