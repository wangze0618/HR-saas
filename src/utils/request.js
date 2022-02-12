import axios from "axios";

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
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default service;
