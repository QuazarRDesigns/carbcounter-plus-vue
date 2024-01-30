import { defineStore } from "pinia";
import { useSettingsStore } from "./settings";

export const useDoseCalcStore = defineStore("dosecalc", {
  state: () => ({
    glucose: 0,
    carbs: 0,
  }),
  actions: {
    updateNumberInput: function (payload) {
      this.update({
        property: payload.id,
        index: Number(payload.value),
      });
    },
    update(payload) {
      this[payload.property] = payload.index;
    },
    convertGlucose({ previousBGUnitValue, newBGUnitValue }) {
      const glucose = (this.glucose / previousBGUnitValue) * newBGUnitValue;

      this.glucose = glucose;
    },
    convertCarbs({ previousCarbUnitValue, newCarbUnitValue }) {
      let carbs = this.carbs;

      if (previousCarbUnitValue === 1) {
        carbs = this.carbs / newCarbUnitValue;
      } else {
        carbs = (this.carbs * previousCarbUnitValue) / newCarbUnitValue;
      }

      this.carbs = carbs;
    },
  },
  getters: {
    ratioResult: function (state) {
      const settingsStore = useSettingsStore();
      let carbs = state.carbs;
      let carbRatio = settingsStore.carbRatio.value;

      // Calculate Carb Insulin
      const carbsum = carbs / carbRatio;
      let ratioResult = Number(carbsum.toFixed(1));

      if (Number.isNaN(ratioResult) || ratioResult < 0) {
        ratioResult = 0;
      }

      return ratioResult;
    },
    correctionResult: function (state) {
      const settingsStore = useSettingsStore();
      const glucoseDiff = state.glucose - settingsStore.target;
      const correctionFactor = settingsStore.correctionFactor;

      // Calculate Correctional Insulin
      const correctionsum = glucoseDiff / correctionFactor;
      let correctionResult = Number(correctionsum.toFixed(1));

      if (Number.isNaN(correctionResult) || correctionResult < 0) {
        correctionResult = 0;
      }

      return correctionResult;
    },
    resultTotal: function () {
      const total = this.correctionResult + this.ratioResult;

      // Calculate Total Insulin
      return Number(total.toFixed(1));
    },
  },
});
