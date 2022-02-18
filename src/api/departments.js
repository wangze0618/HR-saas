import request from "@/utils/request";
// 获取组织架构数据
export const getDepartments = () => {
  return request({
    url: "/company/department",
  });
};

// 删除组织架构的部门
export const delDepartments = (id) => {
  return request({
    method: "delete",
    url: `/company/department/${id}`,
  });
};

// 新增部门
export const addDepartments = (data) => {
  return request({
    method: "post",
    url: `/company/department`,
    data,
  });
};
/** *
 * 获取部门详情
 * ***/
export const getDepartDetail = (id) => {
  return request({
    url: `/company/department/${id}`,
  });
};

/**
 * 编辑部门
 *
 * ***/
export const updateDepartments = (data) => {
  return request({
    url: `/company/department/${data.id}`,
    method: "put",
    data,
  });
};
