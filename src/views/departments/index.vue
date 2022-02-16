<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <tree-tools :treeNode="company" :isRoot="true"></tree-tools>

        <el-tree
          :data="departs"
          :props="defaultProps"
          :default-expand-all="true"
        >
          <tree-tools slot-scope="{ data }" :treeNode="data"></tree-tools>
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getDepartmentsAPI } from "@/api";
import TreeTools from "./components/tree-tools.vue";
import { transListToTreeDate } from "@/utils";
export default {
  components: { TreeTools },
  created() {
    this.getDepartments();
  },
  methods: {
    async getDepartments() {
      const result = await getDepartmentsAPI();
      this.company = {
        name: result.companyName,
        manager: "负责人",
      };
      this.departs = transListToTreeDate(result.depts, "");
    },
  },
  data() {
    return {
      company: {}, // 就是头部的数据结构
      departs: [],
      defaultProps: {
        label: "name", // 表示 从这个属性显示内容
      },
    };
  },
};
</script>

<style scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
