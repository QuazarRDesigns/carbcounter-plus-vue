import Unit from "./Unit";

/**
 * Class representing a unit of measurement for carbohydrates
 * @extends Unit
 */
export default class CarbUnit extends Unit {
  /**
   * Create a new CarbUnit.
   * @param {string} name - The symbol of the unit.
   * @param {number} value - The value relative to *g* (gram).
   */
  constructor(name, value) {
    super(name, value);
  }
}
