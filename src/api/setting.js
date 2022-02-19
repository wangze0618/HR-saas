import request from "@/utils/request";

//获取所有角色列表
export const getRoles = (params) => {
  return request({
    method: "get",
    url: "/sys/role",
    params,
  });
};

// 获取公司信息
export const getCompanyInfo = (companyId) => {
  return request({
    url: `/company/${companyId}`,
  });
};

// 删除角色
export const deleteRole = (id) => {
  return request({
    method: "delete",
    url: `/sys/role/${id}`,
  });
};

//获取角色详情
export const getRoleDetail = (id) => {
  return request({
    url: `/sys/role/${id}`,
  });
};

//修改角色
export const updateRole = (data) => {
  return request({
    url: `/sys/role/${data.id}`,
    data,
    method: "put",
  });
};

// 增加角色
export const addRole = (data) => {
  return request({
    url: "/sys/role",
    data,
    method: "post",
  });
};
