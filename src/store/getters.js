// 便捷/快捷访问
const getters = {
  sidebar: (state) => state.app.sidebar,
  device: (state) => state.app.device,
  token: (state) => state.user.token, //对token的快捷访问
  name: (state) => state.user.userInfo.username, //对用户名的快捷访问
  userId: (state) => state.user.userInfo.userId, //对用户Id的快捷访问
  staffPhoto: (state) => state.user.userInfo.staffPhoto, //对用户staffPhoto的快捷访问
  title: (state) => state.app.title,
};

export default getters;
