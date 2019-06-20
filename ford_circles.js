function setup() {
  createCanvas(720, 405);
  depthSlider = createSlider(1, 16, 5);
  depthSlider.position(20, 20);

  start = new Fraction(0, 1);
  end   = new Fraction(1, 1);
}

function draw() {
  let depth = depthSlider.value();

  background(255);
  stroke(0);
  drawXAxis();
  drawFareyCircle(start);
  drawFareyCircle(end);
  drawFareySequence(start, end, depth);
  drawDepthLabel(depth);
}

function drawDepthLabel(depth) {
  fill(255);
  noStroke();
  rect(0, 0, width, 20);

  fill(0);
  textSize(16);
  textAlign(LEFT);
  text(`Depth (${depth})`, depthSlider.x + depthSlider.width + 15, depthSlider.y + 8);
}

function drawXAxis() {
  line(0, 380, width, 380);
}

function drawFareySequence(start, end, depth) {
  let middle = start.fareyAdd(end);

  if (middle.denominator <= depth) {
    stroke(0);
    if (middle.denominator === depth) {
      stroke(255, 0, 0);
    }
    drawFareyCircle(middle);

    // Add labels for the last added circles only
    if (middle.denominator === depth) {
      fill(0);
      noStroke();
      textAlign(CENTER);
      text(middle.toString(), map(middle.toFloat(), 0, 1, 0, width), height - 8)
    }

    drawFareySequence(start, middle, depth);
    drawFareySequence(middle, end, depth);
  }
}

function drawFareyCircle(fraction) {
  // Color circles by their factorability
  let numFactors = factorize(fraction.denominator).length - 2;
  let factorability = numFactors / parseFloat(fraction.denominator);
  let grayscale = map(factorability, 0, 0.5, 200, 50);

  let floatVal = fraction.toFloat();
  let radius = fraction.fareyRadius();

  let x = map(floatVal, 0, 1, 0, width);
  let r = map(radius, 0, 1, 0, width);
  fill(grayscale);
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
