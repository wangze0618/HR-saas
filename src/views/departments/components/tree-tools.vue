<template>
  <el-row style="width: 100%">
    <el-col :span="20">
      <span>{{ treeNode.name }}</span>
    </el-col>

    <el-row>
      <el-col :span="4">
        <el-row>
          <el-col :span="12">
            <span>{{ treeNode.manager }}</span>
          </el-col>
          <el-col :span="12">
            <el-dropdown @command="operateDepts">
              <span>
                操作<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="add">添加子部门</el-dropdown-item>
                <el-dropdown-item command="edit" v-if="!isRoot"
                  >编辑部门</el-dropdown-item
                >
                <el-dropdown-item command="del" v-if="!isRoot"
                  >删除部门</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
import { delDepartmentsAPI } from "@/api";
import { mapActions } from "vuex";
export default {
  props: {
    treeNode: {
      type: [Object],
      required: true,
    },
    isRoot: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    ...mapActions({ title: "app/setTitle" }),
    operateDepts(type) {
      if (type == "add") {
        this.$emit("addDepts", this.treeNode);
        this.title("新增");
      } else if (type == "edit") {
        this.$emit("editDepts", this.treeNode);
        this.title("编辑");
      } else if (type == "del") {
        this.$confirm("确定删除该部门吗？").then(() => {
          return delDepartmentsAPI(this.treeNode.id).then(() => {
            this.$emit("delDepts", this.treeNode);
            this.$notify.success("删除成功");
          });
        });
      }
    },
  },
};
</script>

<style>
</style>