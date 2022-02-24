import { getUserDetailById, getUserInfo, login } from "./user";
import {
  getDepartments,
  delDepartments,
  addDepartments,
  getDepartDetail,
  updateDepartments,
} from "./departments";
import {
  addEmployee,
  assignRoles,
  delEmployee,
  getEmployeeList,
  getEmployeeSimple,
  getJobDetail,
  getPersonalDetail,
  importEmployee,
  saveUserDetailById,
  updateJob,
  updatePersonal,
} from "./employees";
import {
  addRole,
  deleteRole,
  getCompanyInfo,
  getRoleDetail,
  getRoles,
  updateRole,
} from "./setting";
import {
  addPermission,
  delPermission,
  getPermissionDetail,
  getPermissionList,
  updatePermission,
} from "./permission";

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

// 获取员工的综合列表数据
export const getEmployeeListAPI = getEmployeeList;

// 删除员工接口
export const delEmployeeAPI = delEmployee;

// 新增员工接口
export const addEmployeeAPI = addEmployee;

// 批量导入员工接口
export const importEmployeeAPI = importEmployee;

// 保存员工的基本信息
export const saveUserDetailByIdAPI = saveUserDetailById;

// 读取用户详情的基础信息
export const getPersonalDetailAPI = getPersonalDetail;

// 更新用户详情的基础信息
export const updatePersonalAPI = updatePersonal;

// 获取用户的岗位信息
export const getJobDetailAPI = getJobDetail;

// 保存岗位信息
export const updateJobAPI = updateJob;

// 给用户分配角色
export const assignRolesAPI = assignRoles;

// 获取权限
export const getPermissionListAPI = getPermissionList;

// 新增权限
export const addPermissionAPI = addPermission;

// 更新权限
export const updatePermissionAPI = updatePermission;

// 删除权限
export const delPermissionAPI = delPermission;

// 获取权限详情
export const getPermissionDetailAPI = getPermissionDetail;
