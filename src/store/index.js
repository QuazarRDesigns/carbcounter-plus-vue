import Vue from "vue";
import Vuex from "vuex";
import carbRatio from "../classes/CarbRatio";
import carbcalc from "./carbcalc";
import dosecalc from "./dosecalc";
import settings from "./settings";

Vue.use(Vuex);

const store = new Vuex.Store({
  mutations: {
    initialiseStore(state) {
      if (typeof Storage !== "undefined") {
        if (localStorage.getItem("settings")) {
          const savedSettings = JSON.parse(localStorage.getItem("settings"));
          const savedCarbRatio = savedSettings.carbRatio;

          savedSettings.carbRatio = new carbRatio(
            savedCarbRatio.insulin,
            savedCarbRatio.carbs
          );

          this.replaceState({
            carbcalc: state.carbcalc,
            dosecalc: state.dosecalc,
            settings: Object.assign(state.settings, savedSettings)
          });
        }
      }
    }
  },
  modules: {
    carbcalc,
    dosecalc,
    settings
  }
});

export default store;
