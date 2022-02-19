import { getUserDetailById, getUserInfo, login } from "./user";
import {
  getDepartments,
  delDepartments,
  addDepartments,
  getDepartDetail,
  updateDepartments,
} from "./departments";
import { getEmployeeSimple } from "./employees";
import {
  addRole,
  deleteRole,
  getCompanyInfo,
  getRoleDetail,
  getRoles,
  updateRole,
} from "./setting";

// 用户登录
export const loginAPI = login;

// 获取用户资料
export const getUserInfoAPI = getUserInfo;

// 根据用户Id获取用户的详情
export const getUserDetailByIdAPI = getUserDetailById;

// 获取组织架构数据
export const getDepartmentsAPI = getDepartments;

// 删除组织架构的部门
export const delDepartmentsAPI = delDepartments;

// 新增部门
export const addDepartmentsAPI = addDepartments;

// 获取员工的简单列表
export const getEmployeeSimpleAPI = getEmployeeSimple;

// 获取部门详情
export const getDepartDetailAPI = getDepartDetail;

//编辑部门
export const updateDepartmentsAPI = updateDepartments;

//获取所有角色列表
export const getRolesAPI = getRoles;

// 获取公司信息
export const getCompanyInfoAPI = getCompanyInfo;

// 删除角色
export const deleteRoleAPI = deleteRole;

//获取角色详情
export const getRoleDetailAPI = getRoleDetail;

//修改角色
export const updateRoleAPI = updateRole;

// 新增角色
export const addRoleAPI = addRole;
