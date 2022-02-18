<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <tree-tools
          :treeNode="company"
          @addDepts="addDepts"
          :isRoot="true"
        ></tree-tools>
        <el-tree
          :data="departs"
          :props="defaultProps"
          :default-expand-all="true"
        >
          <tree-tools
            @editDepts="editDepts"
            @addDepts="addDepts"
            slot-scope="{ data }"
            @delDepts="getDepartments"
            :treeNode="data"
          ></tree-tools>
        </el-tree>
      </el-card>
    </div>
    <add-dept
      ref="addDepts"
      @closeLog="showDialog = $event"
      :showDialog.sync="showDialog"
      :node="node"
      @addDepts="getDepartments()"
    ></add-dept>
  </div>
</template>

<script>
import { getDepartmentsAPI } from "@/api";
import TreeTools from "./components/tree-tools.vue";
import { transListToTreeDate } from "@/utils";
import AddDept from "./components/add-dept.vue";
export default {
  components: { TreeTools, AddDept },
  created() {
    this.getDepartments();
  },
  methods: {
    async editDepts(node) {
      this.showDialog = true;
      this.node = node;
      this.$refs.addDepts.getDepartDetail(node.id);
    },
    addDepts(node) {
      this.showDialog = true;
      this.node = node;
    },
    async getDepartments() {
      const result = await getDepartmentsAPI();
      this.company = {
        name: result.companyName,
        manager: "负责人",
        id: "",
      };
      this.departs = transListToTreeDate(result.depts, "");
    },
  },
  data() {
    return {
      node: null,
      showDialog: false,
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
