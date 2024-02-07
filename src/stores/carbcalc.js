import { ref, computed } from "vue";
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

export const useCarbCalcStore = defineStore("carbcalc", () => {
  const searchTerm = ref("");
  const selectedItems = ref([]);

  function addItem(payload) {
    selectedItems.value.push(payload);
  }

  function removeItem(payload) {
    selectedItems.value.splice(selectedItems.value.indexOf(payload), 1);
  }

  function search(payload) {
    searchTerm.value = payload;
  }

  const categoriesList = computed(() => {
    return filterListBySearchTerm(CarbCategories, searchTerm.value);
  });

  const total = computed(() => {
    const settingsStore = useSettingsStore();
    const reducer = (accumulator, currentValue) => currentValue + accumulator;
    return selectedItems.value
      .map(
        (item) =>
          (item.carbs * item.amountMultiplier) / settingsStore.carbUnit.value
      )
      .reduce(reducer, 0);
  });

  return {
    searchTerm,
    selectedItems,
    addItem,
    removeItem,
    search,
    categoriesList,
    total,
  };
});
