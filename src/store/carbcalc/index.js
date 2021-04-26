export default {
  namespaced: true,
  state: () => ({
    selectedItems: []
  }),
  mutations: {
    add(state, payload) {
      state.selectedItems.push(payload);
    },
    remove(state, payload) {
      state.selectedItems.splice(state.selectedItems.indexOf(payload), 1);
    }
  },
  actions: {},
  getters: {
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
