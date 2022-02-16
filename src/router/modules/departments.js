// 员工的路由规则
import Layout from "@/layout/index.vue";
export default {
  path: "/department",
  name: "department",
  component: Layout,
  children: [
    {
      path: "", // 二级子路由的路径空着不写 此时表示二级路由的默认路由
      // 访问 /employees时，不仅有布局layout，也会显示子路由
      component: () => import("@/views/departments"),
      meta: {
        title: "组织架构",
        icon: "tree",
      },
    },
  ],
};
