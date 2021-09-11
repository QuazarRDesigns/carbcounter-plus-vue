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
