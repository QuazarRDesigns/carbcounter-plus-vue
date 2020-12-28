import Unit from "./Unit";

/**
 * Class representing a unit of measurement for blood glucose
 * @extends Unit
 */
export default class BGUnit extends Unit {
  /**
   * Create a new BGUnit.
   * @param {string} name - The symbol of the unit.
   * @param {number} value - The value of the unit relative to *mmol/L* (Millimoles per liter).
   */
  constructor(name, value) {
    super(name, value);
  }
}
