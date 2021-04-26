import Vue from "vue";
import Vuex from "vuex";
import carbcalc from "./carbcalc";
import dosecalc from "./dosecalc";
import settings from "./settings";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    carbcalc,
    dosecalc,
    settings
  }
});

export default store;
