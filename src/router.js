import Vue from "vue";
import Router from "vue-router";
import AppHome from "./views/AppHome.vue";
import CarbCalc from "./views/CarbCalc.vue";
import DoseCalc from "./views/DoseCalc.vue";
import Settings from "./views/Settings.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: AppHome,
    },
    {
      path: "/carbcalc",
      name: "CarbCalc",
      component: CarbCalc,
    },
    {
      path: "/dosecalc",
      name: "DoseCalc",
      component: DoseCalc,
    },
    {
      path: "/settings",
      name: "Settings",
      component: Settings,
    },
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () =>
    //     import(/* webpackChunkName: "about" */ "./views/About.vue")
    // }
  ],
});
