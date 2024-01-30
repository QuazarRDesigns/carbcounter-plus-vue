import { defineStore } from "pinia";
import { useDoseCalcStore } from "./dosecalc";

import CarbRatio from "../classes/CarbRatio";
import CarbUnit from "../classes/CarbUnit";
import BGUnit from "../classes/BGUnit";

const useSettingsStore = defineStore("settings", {
  state: () => {
    if (typeof Storage !== "undefined") {
      if (localStorage.getItem("settings")) {
        const savedSettings = JSON.parse(localStorage.getItem("settings"));

        savedSettings.carbRatio = Object.assign(
          new CarbRatio(),
          savedSettings.carbRatio
        );

        return savedSettings;
      }
    }

    return {
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
      // Don't pass user data into correctionNumber
      correctionNumber: 100,
      saved: false,
    };
  },
  actions: {
    update(payload) {
      this[payload.property] = payload.index;
    },
    updateRatioInput: function (payload) {
      this.update({
        property: payload.id,
        index: payload.value,
      });
    },
    updateNumberInput: function (payload) {
      this.update({
        property: payload.id,
        index: Number(payload.value),
      });
    },
    updateSelectInput: function (payload) {
      const doseCalcStore = useDoseCalcStore();

      if (payload.id === "BGUnit") {
        this.convertTarget(payload.value);
        doseCalcStore.convertGlucose(
          {
            previousBGUnitValue: Number(
              this.BGUnitOptions[this.BGUnitIndex].value
            ),
            newBGUnitValue: Number(this.BGUnitOptions[payload.value].value),
          },
          {
            root: true,
          }
        );
      }

      if (payload.id === "carbUnit") {
        this.convertCarbRatio(payload.value);
        doseCalcStore.convertCarbs(
          {
            previousCarbUnitValue: Number(
              this.carbUnitOptions[this.carbUnitIndex].value
            ),
            newCarbUnitValue: Number(this.carbUnitOptions[payload.value].value),
          },
          {
            root: true,
          }
        );
      }

      this.update({
        property: payload.id + "Index",
        index: Number(payload.value),
      });
    },
    convertTarget(newBGUnitIndex) {
      const previousBGUnitValue = Number(
        this.BGUnitOptions[this.BGUnitIndex].value
      );
      const newBGUnitValue = Number(this.BGUnitOptions[newBGUnitIndex].value);

      const target = (this.target / previousBGUnitValue) * newBGUnitValue;
      const correctionNumber =
        (this.correctionNumber / previousBGUnitValue.toFixed(0)) *
        newBGUnitValue.toFixed(0);
      const correctionFactor =
        (this.correctionFactor / previousBGUnitValue.toFixed(0)) *
        newBGUnitValue.toFixed(0);

      this.target = target;
      this.correctionNumber = correctionNumber;
      this.correctionFactor = correctionFactor;
    },
    convertCarbRatio(newCarbUnitIndex) {
      const previousCarbUnitValue = Number(
        this.carbUnitOptions[this.carbUnitIndex].value
      );
      const newCarbUnitValue = Number(
        this.carbUnitOptions[newCarbUnitIndex].value
      );

      const carbRatio = this.carbRatio.convert(
        previousCarbUnitValue,
        newCarbUnitValue
      );

      this.CarbRatio = carbRatio;
    },
    saveSettings: function () {
      this.saved = false;
      const { ...saveState } = this.$state;
      if (typeof Storage !== "undefined") {
        localStorage.setItem("settings", JSON.stringify({ ...saveState }));
        this.saved = true;
      }

      setTimeout(function () {
        this.saved = false;
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
  },
});

export { useSettingsStore };
