import PageTools from "./PageTools";
import UploadExcel from "./UploadExcel";
// 统一管理全局组件注册
export default {
  install(vue) {
    vue.component("PageTools", PageTools);
    vue.component("UploadExcel", UploadExcel);
  },
};
