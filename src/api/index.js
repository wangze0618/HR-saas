import { getUserDetailById, getUserInfo, login } from "./user";

// 用户登录
export const loginAPI = login;

// 获取用户资料
export const getUserInfoAPI = getUserInfo;

// 根据用户Id获取用户的详情
export const getUserDetailByIdAPI = getUserDetailById;
