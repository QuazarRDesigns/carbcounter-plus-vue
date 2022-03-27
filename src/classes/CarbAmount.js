import { v4 as uuidv4 } from "uuid";

/**
 * Class representing an amount of carbs
 */
export default class CarbAmount {
  /**
   * Creates a new CarbAmount
   * @param {string} name The name of the amount
   * @param {int} value The value relative to *g* (gram).
   */
  constructor(name, value) {
    this.class = "CarbAmount";
    this.uuid = uuidv4();
    this.name = name;
    this.value = value;
  }
}
