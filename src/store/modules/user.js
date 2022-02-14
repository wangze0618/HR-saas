// 用户信息
import { getToken, setToken, removeToken, setTimestamp } from "@/utils/auth";
import { loginAPI, getUserInfoAPI, getUserDetailByIdAPI } from "@/api";
import { Message } from "element-ui";
// 状态
const state = {
  token: getToken(), // 设置token为共享状态，初始化vuex的时候，就从缓存中读取
  userInfo: {},
};
const mutations = {
  setToken(state, token) {
    state.token = token; // 将数据设置给vuex
    // 同步给缓存
    setToken(token);
  },
  // 设置用户信息
  setUserInfo(state, data) {
    state.userInfo = data;
  },
  removeToken(state) {
    state.token = null; // 将vuex数据清空
    removeToken(); // 同步到缓存
  },
  // 删除用户信息
  removeUserInfo(state) {
    state.userInfo = {};
  },
};
const actions = {
  async login(context, data) {
    // 调用登录api接口
    const result = await loginAPI(data);
    setTimestamp(); // 设置时间戳
    context.commit("setToken", result);
  },
  async getUserInfo(context) {
    const result = await getUserInfoAPI();
    const baseInfo = await getUserDetailByIdAPI(result.userId);
    context.commit("setUserInfo", { ...result, ...baseInfo });
    return result; // 后期做权限的时候 留下的伏笔
  },
  // 登出
  logout(context) {
    // 删除token 和 用户信息
    context.commit("removeToken");
    context.commit("removeUserInfo");
    Message("请重新登录");
  },
};

export default {
  // 命名空间
  namespaced: true,
  state,
  mutations,
  actions,
};
