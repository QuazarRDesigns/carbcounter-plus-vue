import Vue from "vue";
import Vuex from "vuex";
import carbcalc from "./carbcalc";
import dosecalc from "./dosecalc";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    carbcalc,
    dosecalc
  }
});

export default store;
