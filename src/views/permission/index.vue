<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTools>
        <template #after>
          <el-button type="primary">添加权限</el-button>
        </template>
      </PageTools>
      <!-- 表格 -->
      <el-table border :data="data" style="width: 100%">
        <el-table-column align="center" prop="prop" label="名称" width="width">
        </el-table-column>
        <el-table-column align="center" prop="prop" label="标识" width="width">
        </el-table-column>
        <el-table-column align="center" prop="prop" label="描述" width="width">
        </el-table-column>
        <el-table-column align="center" prop="prop" label="操作" width="width">
          <template>
            <el-button type="text">添加</el-button>
            <el-button type="text">编辑</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import PageTools from "@/components/PageTools/index.vue";
export default {
  data() {
    return {};
  },
  components: { PageTools },
};
</script>

<style>
</style>
