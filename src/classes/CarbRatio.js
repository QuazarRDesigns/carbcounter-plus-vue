/**
 * Class representing a ratio of insulin to carbohydrates
 */
export default class carbRatio {
  constructor(insulin, carb) {
    this.value = carb / insulin;
    this.view = insulin + ":" + carb;
  }
}
