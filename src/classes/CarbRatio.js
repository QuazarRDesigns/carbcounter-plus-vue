/**
 * Class representing a ratio of insulin to carbohydrates
 */
export default class carbRatio {
  constructor(insulin, carb) {
    this.insulin = insulin;
    this.carbs = carb;
    this.value = carb / insulin;
    this.view = insulin + ":" + carb;
  }

  simplify() {
    let numerator = this.insulin;
    let denominator = this.carbs;

    for (let i = numerator; i > 0; i--) {
      if (!(numerator % i) && !(denominator % i)) {
        numerator = numerator / i;
        denominator = denominator / i;
      }
    }

    this.insulin = numerator;
    this.carbs = denominator;
  }

  convert(previousCarbUnitValue, newCarbUnitValue) {
    let carbs = this.carbs;

    if (previousCarbUnitValue === 1) {
      carbs = this.carbs / newCarbUnitValue;
    } else {
      carbs = (this.carbs * previousCarbUnitValue) / newCarbUnitValue;
    }

    this.carbs = carbs;

    return this;
  }
}
