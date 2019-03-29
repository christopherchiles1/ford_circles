function setup() {
  let resolution = 380;
  createCanvas(4 * resolution, resolution);

  background(0);
  stroke(255);
  noFill();
  noLoop();
}

function draw() {
  let start = new Fraction(0, 1);
  let end   = new Fraction(1, 1);
  drawFareySequence(start, end);
}

function drawFareySequence(start, end) {
  let middle = start.fareyAdd(end)
  drawFareyCircle(middle);

  if (middle.denominator < 100) {
    drawFareySequence(start, middle);
    drawFareySequence(middle, end);
  }
}

function drawFareyCircle(fraction) {
  let floatVal = fraction.toFloat();
  let radius = fraction.fareyRadius();

  let x = map(floatVal, 0, 1, 0, width);
  let r = map(radius, 0, 1, 0, width);
  circle(x, height - r, r);
}

function gcd(a, b) {
  if (b === 0) {
    return a;
  }

  return gcd(b, a % b);
}

// Inspirations
// The Coding Train [Coding Challenge #77: Recursion](https://www.youtube.com/watch?v=jPsZwrV9ld0)
// Numberphile [Funny Fractions and Ford Circles](https://www.youtube.com/watch?v=0hlvhQZIOQw)
