import axios from "axios";
import { Message } from "element-ui";
const service = axios.create({
  // 当为开发环境时为 /api
  // 当为生产环境时为 /prod-api
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
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
    Message.error(error.message); // 提示错误信息
    return Promise.reject(error); // 进catch
  }
);
export default service;
