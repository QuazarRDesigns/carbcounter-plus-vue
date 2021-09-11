export default {
  namespaced: true,
  state: () => ({
    glucose: 0,
    carbs: 0
  }),
  mutations: {
    update(state, payload) {
      state[payload.property] = payload.index;
    },
  },
  actions: {
    updateNumberInput: function(context, payload) {
      context.commit("update", {
        property: payload.id,
        index: Number(payload.value)
      });
    }
  },
  getters: {
    glucose: state => {
      return state.glucose;
    },
    carbs: state => {
      return state.carbs;
    },
    ratioResult: function(state, getters, rootState, rootGetters) {
      let carbs = state.carbs;
      let carbRatio = rootGetters["settings/carbRatio"].value;

      // Calculate Carb Insulin
      const carbsum = carbs / carbRatio;
      let ratioResult = Number(carbsum.toFixed(1));

      if (Number.isNaN(ratioResult) || ratioResult < 0) {
        ratioResult = 0;
      }

      return ratioResult;
    },
    correctionResult: function(state, getters, rootState, rootGetters) {
      const glucoseDiff = state.glucose - rootGetters["settings/target"];
      const correctionFactor = rootGetters["settings/correctionFactor"];

      // Calculate Correctional Insulin
      const correctionsum = glucoseDiff / correctionFactor;
      let correctionResult = Number(correctionsum.toFixed(1));

      if (Number.isNaN(correctionResult) || correctionResult < 0) {
        correctionResult = 0;
      }

      return correctionResult;
    },
    resultTotal: function(state, getters, rootState, rootGetters) {
      const total = getters.correctionResult + getters.ratioResult;

      // Calculate Total Insulin
      return Number(total.toFixed(1));
    }
  }
};
