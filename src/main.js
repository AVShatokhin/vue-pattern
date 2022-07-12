// =========================================================
// * Vue Material Dashboard PRO - v1.5.0
// =========================================================
//
// * Product Page: https://www.creative-tim.com/product/vue-material-dashboard-pro
// * Copyright 2019 Creative Tim (https://www.creative-tim.com)
//
// * Coded by Creative Tim
//
// =========================================================
//
// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

import Vue from "vue";
import store from "./pattern/pattern_store.js";
import ajax from "./pattern/pattern_ajax.js";
import {
  showErrorNotify,
  showSuccessNotify,
} from "./pattern/pattern_notify.js";

import { formatTime } from "./pattern/pattern_formatTime.js";

import appConfig from "./app/app_main.js";

import VueRouter from "vue-router";
import DashboardPlugin from "./material-dashboard";
import SideBar from "./pattern/plugins/PatternSidebarPlugin";

// Plugins
import App from "./App.vue";
import Chartist from "chartist";

import axios from "axios";
Vue.prototype.axios = axios;
Vue.prototype.appConfig = appConfig;
Vue.prototype.ajax = ajax;
Vue.prototype.showErrorNotify = showErrorNotify;
Vue.prototype.showSuccessNotify = showSuccessNotify;
Vue.prototype.formatTime = formatTime;

Vue.config.productionTip = false;

// router setup
// import routes from "./routes/routes";
import routes from "./pattern/pattern_routes"; // активация боевого маршрута (12.01.2022 by AVShatokhin)

// plugin setup
Vue.use(VueRouter);
Vue.use(DashboardPlugin);
Vue.use(SideBar);

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  scrollBehavior: (to) => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  },
  linkExactActiveClass: "nav-item active",
});

// router.beforeEach((to, from, next) => {
//   console.log(to.fullPath == from.fullPath);
//   if (to.fullPath == from.fullPath) return false;
//   next();
// });

// global library setup
Vue.prototype.$Chartist = Chartist;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  render: (h) => h(App),
  router,
  store,
});
