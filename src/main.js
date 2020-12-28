import Vue from "vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.min.css";

import VueRouter from "vue-router";
Vue.use(VueRouter);

import VueAxios from "vue-axios";
import axios from "axios";

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

import Search from "./components/Search.vue";
import Meanings from "./components/AllMeanings.vue";

const routes = [
  {
    name: "search",
    path: "/",
    component: Search,
  },
  {
    name: "meanings",
    path: "/meanings",
    component: Meanings,
  },
];

const router = new VueRouter({ mode: "history", routes });
new Vue(Vue.util.extend({ router }, App)).$mount("#app");
