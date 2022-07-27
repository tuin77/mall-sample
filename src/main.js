import Vue from "vue";
import App from "./App";
import uView from "uview-ui";
import api from "./api";
Vue.use(uView);
Vue.config.productionTip = false;

Vue.prototype.$api = api;
App.mpType = "app";

const app = new Vue({
  ...App,
});
app.$mount();
