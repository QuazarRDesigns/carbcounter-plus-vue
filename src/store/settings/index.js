import CarbRatio from "../../classes/CarbRatio";
import CarbUnit from "../../classes/CarbUnit";
import BGUnit from "../../classes/BGUnit";

export default {
  namespaced: true,
  state: () => ({
    carbRatio: new CarbRatio(1, 10),
    carbUnitIndex: 2,
    carbUnitOptions: [
      new CarbUnit("BU", 12),
      new CarbUnit("CU", 15),
      new CarbUnit("g", 1)
    ],
    BGUnitIndex: 0,
    BGUnitOptions: [new BGUnit("mmol/L", 1), new BGUnit("mg/dL", 18.0182)],
    target: 6.5,
    correctionFactor: 2,
    correctionNumber: 100
  }),
  mutations: {
    update(state, payload) {
      state[payload.property] = payload.index;
    },
    convertTarget(state, newBGUnitIndex) {
      const previousBGUnit = state.BGUnitOptions[state.BGUnitIndex];
      const newBGUnit = state.BGUnitOptions[newBGUnitIndex];
      let target = state.target;
      let correctionNumber = state.correctionNumber;

      target = state.target / previousBGUnit.value;
      correctionNumber =
        state.correctionNumber / previousBGUnit.value.toFixed(0);

      if (newBGUnit.value !== 1) {
        target = state.target * newBGUnit.value;
        correctionNumber = state.correctionNumber * newBGUnit.value.toFixed(0);
      }

      state.target = target;
      state.correctionNumber = correctionNumber;
    }
  },
  actions: {
    updateRatioInput: function(context, payload) {
      console.log(payload);
      context.commit("update", {
        property: payload.id,
        index: payload.value
      });
    },
    updateNumberInput: function(context, payload) {
      context.commit("update", {
        property: payload.id,
        index: Number(payload.value)
      });
    },
    updateSelectInput: function(context, payload) {
      if (payload.id === "BGUnit") {
        context.commit("convertTarget", payload.value);
      }

      context.commit("update", {
        property: payload.id + "Index",
        index: Number(payload.value)
      });
    }
  },
  getters: {
    carbUnit: state => {
      return state.carbUnitOptions[state.carbUnitIndex];
    },
    BGUnit: state => {
      return state.BGUnitOptions[state.BGUnitIndex];
    }
  }
};
