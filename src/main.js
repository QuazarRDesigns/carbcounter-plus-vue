import { createApp } from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";

const app = createApp({
  router,
  store,
  ...App,
});

app.use(VueRouter);
app.use(store);

app.mount("#app");
