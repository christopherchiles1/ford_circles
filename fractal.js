function setup() {
  let resolution = 380;
  createCanvas(4 * resolution, resolution);
  noLoop();
}

function draw() {
  background(0);
  stroke(255);
  noFill();

  drawFareySequence(0, 1, 1, 1)
}

function drawFareySequence(p1, q1, p2, q2) {
  let p3, q3;
  [p3, q3] = fareyAdd(p1, q1, p2, q2);

  drawFareyCircle(p3, q3)

  if (q3 < 100) {
    drawFareySequence(p1, q1, p3, q3);
    drawFareySequence(p3, q3, p2, q2);
  }
}

function fareyAdd(p1, q1, p2, q2) {
  let p3 = p1 + p2;
  let q3 = q1 + q2;
  let commonFactor = gcd(p3, q3);
  p3 = p3 / commonFactor;
  q3 = q3 / commonFactor;

  return [p3, q3];
}

function drawFareyCircle(p1, q1) {
  let fraction = p1 / parseFloat(q1);
  let radius = Math.pow(1 / parseFloat(q1), 2) / 2;

  let x = map(fraction, 0, 1, 0, width);
  let r = map(radius, 0, 1, 0, width);
  circle(x, height - r, r)
}

function gcd(a, b) {
  if (b === 0) {
    return a;
  }

  return gcd(b, a % b);
};

// Inspirations
// The Coding Train [Coding Challenge #77: Recursion](https://www.youtube.com/watch?v=jPsZwrV9ld0)
// Numberphile [Funny Fractions and Ford Circles](https://www.youtube.com/watch?v=0hlvhQZIOQw)
