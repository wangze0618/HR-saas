<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTools :showBefore="true">
        <template #before>
          <span>共{{ page.total }}条记录</span>
        </template>
        <template #after>
          <el-button type="warning" @click="$router.push('/import')"
            >Excel导入</el-button
          >
          <el-button type="danger">Excel导出</el-button>
          <el-button type="primary" @click="showDialog = true"
            >新增员工</el-button
          >
        </template>
      </PageTools>

      <!-- 表格组件 -->
      <el-table v-loading="loading" border :data="list" style="width: 100%">
        <el-table-column type="index" label="序号" sortable="" />
        <el-table-column prop="username" label="姓名" sortable="" />
        <el-table-column prop="workNumber" label="工号" sortable="" />
        <el-table-column
          prop="formOfEmployment"
          :formatter="formatEmployment"
          label="聘用形式"
          sortable=""
        />
        <el-table-column prop="departmentName" label="部门" sortable="" />
        <el-table-column prop="timeOfEntry" label="入职时间" sortable="">
          <!-- 作用域插槽 -->
          <template slot-scope="{ row }">{{
            row.timeOfEntry | formatDate
          }}</template>
        </el-table-column>
        <el-table-column prop="enableState" label="账户状态" sortable="">
          <template slot-scope="{ row }">
            <!-- 根据当前状态来确定 是否打开开关 -->
            <el-switch :value="row.enableState === 1" />
          </template>
        </el-table-column>
        <el-table-column label="操作" sortable="" fixed="right" width="280">
          <template v-slot="{ row }">
            <el-button type="text" size="small" @click="detailInfo(row.id)"
              >查看</el-button
            >
            <el-button type="text" size="small">转正</el-button>
            <el-button type="text" size="small">调岗</el-button>
            <el-button type="text" size="small">离职</el-button>
            <el-button type="text" size="small">角色</el-button>
            <el-button type="text" size="small" @click="delEmployee(row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="center" style="height: 60px" align="middle">
        <el-col :span="6">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="page.total"
            :current-page="page.page"
            :page-size="page.size"
            @current-change="currentPage"
          >
          </el-pagination>
        </el-col>
      </el-row>
    </div>
    <addEmployee
      :showDialog.sync="showDialog"
      @updateList="getEmployeeList()"
    ></addEmployee>
  </div>
</template>

<script>
import { getEmployeeListAPI, delEmployeeAPI } from "@/api";
import EmployeeEnum from "@/api/constant/employees";
import addEmployee from "./components/addEmployee.vue";

export default {
  data() {
    return {
      showDialog: false,
      loading: false,
      list: [],
      page: {
        page: 1, // 当前页码
        size: 10, // 每页条数
        total: 5, // 总数
      },
    };
  },

  created() {
    this.getEmployeeList();
  },
  methods: {
    detailInfo(id) {
      this.$router.push(`/employees/detail/${id}`);
    },
    currentPage(page) {
      this.page.page = page;
      this.getEmployeeList();
    },
    async getEmployeeList() {
      this.loading = true;
      const { total, rows } = await getEmployeeListAPI(this.page);
      this.page.total = total;
      this.list = rows;
      this.loading = false;
    },
    formatEmployment(row, column, cellValue, index) {
      const obj = EmployeeEnum.hireType.find((item) => item.id == cellValue);
      return obj ? obj.value : "未知";
    },
    async delEmployee(row) {
      await this.$confirm("确定删除该员工吗？");
      await delEmployeeAPI(row.id);
      this.getEmployeeList();
      this.$message.success("删除成功！");
      // console.log(row);
    },
  },
  components: { addEmployee },
};
</script>

<style>
</style>
