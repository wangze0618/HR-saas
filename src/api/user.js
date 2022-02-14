import request from "@/utils/request";

// 用户登录
export function login(data) {
  return request({
    method: "post",
    url: "/sys/login",
    data,
  });
}

// 获取用户资料
export function getUserInfo() {
  return request({
    method: "post",
    url: "/sys/profile",
  });
}

// 根据用户Id获取用户的详情
export function getUserDetailById(id) {
  return request({
    method: "get",
    url: `/sys/user/${id}`,
  });
}

export function logout() {}
