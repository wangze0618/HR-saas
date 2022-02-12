// 便捷访问
const getters = {
  sidebar: (state) => state.app.sidebar,
  device: (state) => state.app.device,
  token: (state) => state.user.token, //便捷访问
};
export default getters;
