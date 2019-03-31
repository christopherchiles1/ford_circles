function setup() {
  let resolution = 380;
  createCanvas(4 * resolution, resolution);
  depthSlider = createSlider(2, 30, 5);
  depthSlider.position(20, 20);

  stroke(255);
  noFill();
}

function draw() {
  background(0);

  let depth = depthSlider.value();
  textSize(16);
  text(`Depth (${depth})`, depthSlider.x + depthSlider.width + 15, depthSlider.y + 8);

  let start = new Fraction(0, 1);
  let end   = new Fraction(1, 1);
  drawFareyCircle(start);
  drawFareyCircle(end);
  drawFareySequence(start, end, depth);
}

function drawFareySequence(start, end, depth) {
  let middle = start.fareyAdd(end);

  let r = map(middle.denominator, 2, 30, 150, 0);
  let g = map(middle.denominator, 2, 30, 0, 255);
  let b = map(middle.denominator, 2, 30, 0, 75);
  fill(r, g, b);
  drawFareyCircle(middle);
  noFill();
  if (middle.denominator === depth) {
    textAlign(CENTER);
    text(middle.toString(), map(middle.toFloat(), 0, 1, 0, width), height - 8)
    textAlign(LEFT);
  }

  if (middle.denominator < depth) {
    drawFareySequence(start, middle, depth);
    drawFareySequence(middle, end, depth);
  }
}

function drawFareyCircle(fraction) {
  let floatVal = fraction.toFloat();
  let radius = fraction.fareyRadius();

  let x = map(floatVal, 0, 1, 0, width);
  let r = map(radius, 0, 1, 0, width);
  circle(x, height - r - 25, r);
}

// Inspirations
// The Coding Train [Coding Challenge #77: Recursion](https://www.youtube.com/watch?v=jPsZwrV9ld0)
// Numberphile [Funny Fractions and Ford Circles](https://www.youtube.com/watch?v=0hlvhQZIOQw)
