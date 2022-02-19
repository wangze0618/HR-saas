import PageTools from "./PageTools";
// 统一管理全局组件注册
export default {
  install(vue) {
    vue.component("PageTools", PageTools);
  },
};
