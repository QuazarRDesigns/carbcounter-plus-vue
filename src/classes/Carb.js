import CarbAmount from "./CarbAmount";
import { v4 as uuidv4 } from "uuid";

/**
 * Class representing a carb
 */
export default class Carb {
  /**
   * Creates a new Carb
   * @param {string} name The name of the carb
   * @param {string} [variant] The variant name of the carb
   * @param {CarbAmount[]} [amounts] A list of carb amounts
   */
  constructor(name, carb, variant = "", amounts = []) {
    this.class = "Carb";
    this.uuid = uuidv4();
    this.name = name;
    this.carb = carb;
    this.variant = variant;
    this.amounts = amounts.map((e) => new CarbAmount(e.name, e.value));
  }
}
