/**
 * Class representing a unit of measurement.
 */
export default class Unit {
  /**
   * Create a new Unit.
   * @param {string} name - The symbol of the unit.
   * @param {number} value - The value of the unit relative to a base unit.
   */
  constructor(name, value) {
    this.name = name;
    this.value = value;
  }
}
