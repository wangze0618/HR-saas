import { getUserDetailById, getUserInfo, login } from "./user";
import { getDepartments } from "./departments";

// 用户登录
export const loginAPI = login;

// 获取用户资料
export const getUserInfoAPI = getUserInfo;

// 根据用户Id获取用户的详情
export const getUserDetailByIdAPI = getUserDetailById;

// 获取组织架构数据
export const getDepartmentsAPI = getDepartments;
