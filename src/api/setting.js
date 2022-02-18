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
