function setup() {
  let resolution = 380;

  createCanvas(4 * resolution, resolution + 25);
  depthSlider = createSlider(2, 30, 5);
  depthSlider.position(20, 20);

  stroke(0);
}

function draw() {
  background(255);

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

  if (middle.denominator <= depth) {
    let numFactors = factorize(middle.denominator).length - 2;
    let factorability = numFactors / parseFloat(middle.denominator);
    let grayscale = map(factorability, 0, 0.5, 200, 50);
    fill(grayscale);

    drawFareyCircle(middle);
    noFill();
    if (middle.denominator === depth) {
      textAlign(CENTER);
      text(middle.toString(), map(middle.toFloat(), 0, 1, 0, width), height - 8)
      textAlign(LEFT);
    }

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

  function factorize(number) {
  let factors = [];
  for (let i = 1; i <= number; i++) {
    if (number % i === 0) {
      factors.push(i)
    }
  }
  return factors;
}

// Inspirations
// The Coding Train [Coding Challenge #77: Recursion](https://www.youtube.com/watch?v=jPsZwrV9ld0)
// Numberphile [Funny Fractions and Ford Circles](https://www.youtube.com/watch?v=0hlvhQZIOQw)
