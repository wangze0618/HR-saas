import axios from "axios";
import store from "@/store";
import { getTimestamp } from "./auth";
import router from "@/router";
import { Message } from "element-ui";
const timeOut = 3600; // 定义超时时间(1h)
const service = axios.create({
  // 当为开发环境时为 /api
  // 当为生产环境时为 /prod-api
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    if (store.getters.token) {
      if (isTimeOut()) {
        store.dispatch("user/logout");
        router.push("/login");
        return Promise.reject(new Error("token超时了"));
      }
      config.headers.Authorization = `Bearer ${store.getters.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // 解构数据
    const { success, message, data } = response.data;
    // 根据success的成功与否决定下面的操作
    if (success) {
      return data;
    } else {
      // 如果业务已经错误了，进catch
      Message.error(message); // 提示错误信息
      return Promise.reject(new Error(message));
    }
  },
  (error) => {
    // 被动/手动判定token失效 后端返回失败码code 10002来判定
    if (
      error.response &&
      error.response.data &&
      error.response.data.code === 10002
    ) {
      // 清除token
      store.dispatch("user/logout");
      // 跳转到登录页面
      router.push("/login");
    } else {
      Message.error(error.message); // 提示错误信息
    }
    return Promise.reject(error); // 进catch
  }
);

// 定义检查时间是否超时  (当前时间 - 缓存中的时间) 是否大于 时间差
function isTimeOut() {
  const currentTimeStamp = Date.now();
  return (currentTimeStamp - getTimestamp()) / 1000 >= timeOut;
}
export default service;
