import Vue from "vue";

import "normalize.css/normalize.css"; // A modern alternative to CSS resets

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import locale from "element-ui/lib/locale/lang/en"; // lang i18n

import "@/styles/index.scss"; // global css

import App from "./App";
import store from "./store";
import router from "./router";
import Components from "@/components";
import "@/icons"; // icon
import "@/permission"; // permission control
import * as directives from "./directives";

// set ElementUI lang to EN
Vue.use(ElementUI, { locale });
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.use(Components);
Vue.config.productionTip = false;
// Vue.directive("imagerror", directives.imagerror);

// 注册所有的指令
Object.keys(directives).forEach((item) => {
  Vue.directive(item, directives[item]);
});

new Vue({
  el: "#app",
  router,
  store,
  render: (h) => h(App),
});
