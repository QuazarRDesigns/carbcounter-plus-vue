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
      new CarbUnit("g", 1),
    ],
    BGUnitIndex: 0,
    BGUnitOptions: [new BGUnit("mmol/L", 1), new BGUnit("mg/dL", 18.0182)],
    target: 6.5,
    correctionFactor: 2,
    correctionNumber: 100,
    saved: false,
  }),
  mutations: {
    update(state, payload) {
      state[payload.property] = payload.index;
    },
    convertTarget(state, newBGUnitIndex) {
      const previousBGUnitValue = Number(
        state.BGUnitOptions[state.BGUnitIndex].value
      );
      const newBGUnitValue = Number(state.BGUnitOptions[newBGUnitIndex].value);

      const target = (state.target / previousBGUnitValue) * newBGUnitValue;
      const correctionNumber =
        (state.correctionNumber / previousBGUnitValue.toFixed(0)) *
        newBGUnitValue.toFixed(0);
      const correctionFactor =
        (state.correctionFactor / previousBGUnitValue.toFixed(0)) *
        newBGUnitValue.toFixed(0);

      state.target = target;
      state.correctionNumber = correctionNumber;
      state.correctionFactor = correctionFactor;
    },
    convertCarbRatio(state, newCarbUnitIndex) {
      const previousCarbUnitValue = Number(
        state.carbUnitOptions[state.carbUnitIndex].value
      );
      const newCarbUnitValue = Number(
        state.carbUnitOptions[newCarbUnitIndex].value
      );

      const carbRatio = state.carbRatio.convert(
        previousCarbUnitValue,
        newCarbUnitValue
      );

      state.CarbRatio = carbRatio;
    },
  },
  actions: {
    updateRatioInput: function (context, payload) {
      context.commit("update", {
        property: payload.id,
        index: payload.value,
      });
    },
    updateNumberInput: function (context, payload) {
      context.commit("update", {
        property: payload.id,
        index: Number(payload.value),
      });
    },
    updateSelectInput: function (context, payload) {
      if (payload.id === "BGUnit") {
        context.commit("convertTarget", payload.value);
        context.commit(
          "dosecalc/convertGlucose",
          {
            previousBGUnitValue: Number(
              context.state.BGUnitOptions[context.state.BGUnitIndex].value
            ),
            newBGUnitValue: Number(
              context.state.BGUnitOptions[payload.value].value
            ),
          },
          {
            root: true,
          }
        );
      }

      if (payload.id === "carbUnit") {
        context.commit("convertCarbRatio", payload.value);
        context.commit(
          "dosecalc/convertCarbs",
          {
            previousCarbUnitValue: Number(
              context.state.carbUnitOptions[context.state.carbUnitIndex].value
            ),
            newCarbUnitValue: Number(
              context.state.carbUnitOptions[payload.value].value
            ),
          },
          {
            root: true,
          }
        );
      }

      context.commit("update", {
        property: payload.id + "Index",
        index: Number(payload.value),
      });
    },
    saveSettings: function (context) {
      context.state.saved = false;
      const { ...saveState } = context.state;
      if (typeof Storage !== "undefined") {
        localStorage.setItem("settings", JSON.stringify({ ...saveState }));
        context.state.saved = true;
      }

      setTimeout(function () {
        context.state.saved = false;
      }, 3000);
    },
  },
  getters: {
    carbUnit: (state) => {
      return state.carbUnitOptions[state.carbUnitIndex];
    },
    BGUnit: (state) => {
      return state.BGUnitOptions[state.BGUnitIndex];
    },
    carbRatio: (state) => {
      return state.carbRatio;
    },
    target: (state) => {
      return state.target;
    },
    correctionFactor: (state) => {
      return state.correctionFactor;
    },
  },
};
