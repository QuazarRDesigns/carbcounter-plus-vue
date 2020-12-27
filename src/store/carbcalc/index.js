import { findIndex } from "core-js/fn/array";

export default {
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
  getters: {}
};
