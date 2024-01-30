import { defineStore } from "pinia";
import { useSettingsStore } from "./settings.js";

import carbs from "../carbs.js";
import CarbCategory from "../classes/CarbCategory.js";

function initCarbCategories() {
  const categoriesList = [];

  carbs.forEach((carb) => {
    const subCategory = new CarbCategory(carb.name, [], carb.carbs);

    const categoryIndex = categoriesList.findIndex(
      (e) => e.name === carb.category
    );

    if (categoryIndex !== -1) {
      categoriesList[categoryIndex].subcategories.push(subCategory);
    } else {
      categoriesList.push(new CarbCategory(carb.category, [subCategory]));
    }
  });

  return categoriesList;
}

function filterListBySearchTerm(list, searchTerm) {
  const filteredList = list.flatMap((item) => {
    if (item instanceof CarbCategory) {
      return item.filterBySearchTerm(searchTerm);
    }
  });

  return filteredList;
}

const CarbCategories = initCarbCategories();

export const useCarbCalcStore = defineStore("carbcalc", {
  state: () => ({
    searchTerm: "",
    selectedItems: [],
  }),
  actions: {
    addItem(payload) {
      this.selectedItems.push(payload);
    },
    removeItem(payload) {
      this.selectedItems.splice(this.selectedItems.indexOf(payload), 1);
    },
    search(payload) {
      this.searchTerm = payload;
    },
  },
  getters: {
    categoriesList: function (state) {
      return filterListBySearchTerm(CarbCategories, state.searchTerm);
    },
    total: function (state) {
      const settingsStore = useSettingsStore();
      const reducer = (accumulator, currentValue) => currentValue + accumulator;
      return state.selectedItems
        .map(
          (item) =>
            (item.carbs * item.amountMultiplier) / settingsStore.carbUnit.value
        )
        .reduce(reducer, 0);
    },
  },
});
