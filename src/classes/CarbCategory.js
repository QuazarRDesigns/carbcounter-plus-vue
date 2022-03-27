import { v4 as uuidv4 } from "uuid";
import Carb from "./Carb";

/**
 * Class representing a category of carbs
 */
export default class CarbCategory {
  /**
   * Creates a new CarbCategory
   * @param {string} name The name of the category.
   * @param {CarbCategory[]} [subcategories] List of Subcategories.
   * @param {Carb[]} [carbs] List of carbs in the category.
   */
  constructor(name, subcategories = [], carbs = []) {
    this.class = "CarbCategory";
    this.uuid = uuidv4();
    this.name = name;
    this.subcategories = subcategories;
    this.carbs = carbs.map(e => new Carb(e.name, e.carb, e.variant, e.amounts));
  }
  /**
   * Get this CarbCategory filtered by the provided search term.
   *
   * Returns an empty array if nothing matches so it can be removed by array.prototype.flatMap.
   * @param {string} searchTerm Search term to filter by.
   * @returns {(CarbCategory|Array)} A filtered CarbCategory or an empty array.
   */
  filterBySearchTerm(searchTerm) {
    if (this.name.toLowerCase().includes(searchTerm)) {
      return this;
    }

    const filteredSubcategories = this._filterSubcategories(searchTerm);
    const filteredCarbs = this._filterCarbs(searchTerm);

    if (filteredSubcategories.length === 0 && filteredCarbs.length === 0) {
      return [];
    }

    return new CarbCategory(this.name, filteredSubcategories, filteredCarbs);
  }

  /**
   * Filters subcategories by a search term.
   * @param {string} searchTerm Search term to filter by.
   * @returns {(CarbCategory[]|Array)} Array of filtered CarbCategory objects or an empty array.
   */
  _filterSubcategories(searchTerm) {
    if (this.subcategories.length === 0) {
      return this.subcategories;
    }

    const list = this.subcategories;

    return list.flatMap(item => item.filterBySearchTerm(searchTerm));
  }

  /**
   * Filters Carbs by a search term.
   * @param {string} searchTerm Search term to filter by.
   * @returns {(Carb[]|Array)} Array of filtered Carb objects or an empty array.
   */
  _filterCarbs(searchTerm) {
    if (this.carbs.length === 0) {
      return this.carbs;
    }

    const list = this.carbs;

    return list.filter(item => {
      return (
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.variant.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }
}
