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
            <el-dropdown>
              <span>
                操作<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>添加子部门</el-dropdown-item>
                <el-dropdown-item v-if="!isRoot">编辑部门</el-dropdown-item>
                <el-dropdown-item v-if="!isRoot">删除部门</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
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
};
</script>

<style>
</style>