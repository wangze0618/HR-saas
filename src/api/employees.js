import request from "@/utils/request";

//  获取员工的简单列表
export const getEmployeeSimple = () => {
  return request({
    url: "/sys/user/simple",
  });
};

// 获取员工的综合列表数据
export const getEmployeeList = (params) => {
  return request({
    url: "/sys/user",
    params,
  });
};

// 删除员工接口
export const delEmployee = (id) => {
  return request({
    url: `/sys/user/${id}`,
    method: "delete",
  });
};

// 新增员工的接口
export const addEmployee = (data) => {
  return request({
    method: "post",
    url: "/sys/user",
    data,
  });
};

// 批量导入员工的接口
export const importEmployee = (data) => {
  return {
    url: "sys/user/batch",
    method: "post",
    data,
  };
};

// 保存用户基本信息
export const saveUserDetailById = (data) => {
  return request({
    url: `sys/user/${data.id}`,
    method: "put",
    data,
  });
};
