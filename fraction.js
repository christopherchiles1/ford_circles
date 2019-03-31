class Fraction {
  constructor(numerator, denominator) {
    let commonDivisor = this._gcd(numerator, denominator);
    this.numerator = numerator / commonDivisor;
    this.denominator = denominator / commonDivisor;
  }

  clone() {
    return new Fraction(this.numerator, this.denominator);
  }

  fareyAdd(otherFraction) {
    let nSum = this.numerator + otherFraction.numerator;
    let dSum = this.denominator + otherFraction.denominator;
    return new Fraction(nSum, dSum);
  }

  fareyRadius() {
    return Math.pow(1 / parseFloat(this.denominator), 2) / 2;
  }

  toFloat() {
    return this.numerator / parseFloat(this.denominator);
  }

  toString() {
    return `${this.numerator} / ${this.denominator}`
  }

  _gcd (a, b) {
    if (b === 0) {
      return a;
    }

    return this._gcd(b, a % b);
  }
}
