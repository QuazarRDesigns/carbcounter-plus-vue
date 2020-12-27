import Vue from "vue";
import Vuex from "vuex";
import carbcalc from "./carbcalc";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    carbcalc
  }
});

export default store;
