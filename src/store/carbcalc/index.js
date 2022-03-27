import carbs from "../../carbs";
import CarbCategory from "../../classes/CarbCategory";

function initCarbCategories() {
  const categoriesList = [];

  carbs.forEach(carb => {
    const subCategory = new CarbCategory(carb.name, [], carb.carbs);

    const categoryIndex = categoriesList.findIndex(
      e => e.name === carb.category
    );

    if (categoryIndex !== -1) {
      categoriesList[categoryIndex].subcategories.push(subCategory);
    } else {
      categoriesList.push(new CarbCategory(carb.category, [subCategory]));
    }
  });

  return categoriesList;
}

const CarbCategories = initCarbCategories();

export default {
  namespaced: true,
  state: () => ({
    selectedItems: []
  }),
  mutations: {
    addItem(state, payload) {
      state.selectedItems.push(payload);
    },
    removeItem(state, payload) {
      state.selectedItems.splice(state.selectedItems.indexOf(payload), 1);
    }
  },
  actions: {},
  getters: {
    categoriesList: function(state) {
      return CarbCategories;
    },
    total: function(state, getters, rootState, rootGetters) {
      const reducer = (accumulator, currentValue) => currentValue + accumulator;
      return state.selectedItems
        .map(
          item =>
            (item.carbs * item.amountMultiplier) /
            rootGetters["settings/carbUnit"].value
        )
        .reduce(reducer, 0);
    }
  }
};
