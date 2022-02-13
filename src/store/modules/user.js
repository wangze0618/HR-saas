// 用户信息
import { getToken, setToken, removeToken } from "@/utils/auth";
import { loginAPI } from "@/api";
// 状态
const state = {
  token: getToken(), // 设置token为共享状态，初始化vuex的时候，就从缓存中读取
};
const mutations = {
  setToken(state, token) {
    state.token = token; // 将数据设置给vuex
    // 同步给缓存
    setToken(token);
  },
  removeToken(state) {
    state.token = null; // 将vuex数据清空
    removeToken(); // 同步到缓存
  },
};
const actions = {
  async login(context, data) {
    // 调用api接口
    const result = await loginAPI(data);
    if (result) {
      context.commit("setToken", result);
    }
  },
};

export default {
  // 命名空间
  namespaced: true,
  state,
  mutations,
  actions,
};
