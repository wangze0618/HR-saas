<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="角色管理" name="first">
            <template>
              <!-- 新增按钮 -->
              <el-button icon="el-icon-plus" type="primary">新增角色</el-button>
              <!-- 表格 -->
              <el-table
                class="main-table"
                border
                :data="list"
                style="width: 100%"
              >
                <el-table-column
                  align="center"
                  type="index"
                  label="序号"
                  width="50"
                >
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="name"
                  label="角色名"
                  width="140"
                >
                </el-table-column>
                <el-table-column align="center" prop="description" label="描述">
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="prop"
                  label="操作"
                  width="235"
                >
                  <el-button size="small" type="success">分配权限</el-button>
                  <el-button size="small" type="primary">编辑</el-button>
                  <el-button size="small" type="danger">删除</el-button>
                </el-table-column>
              </el-table>
              <!-- 底部分页 -->
              <el-row
                type="flex"
                justify="center"
                align="middle"
                style="height: 60px"
              >
                <el-pagination
                  background
                  layout="prev, pager, next"
                  :total="page.total"
                  :page-size="page.pagesize"
                  :current-page="page.page"
                  @current-change="currentPage"
                >
                </el-pagination>
              </el-row>
            </template>
          </el-tab-pane>

          <!-- 用户信息Tab -->
          <el-tab-pane label="用户信息" name="second"
            ><template>
              <el-alert
                center
                title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
                type="info"
                show-icon
                :closable="false"
              >
              </el-alert>
              <!-- 表单 -->
              <el-form
                label-position="right"
                class="main-form"
                ref="form"
                label-width="70px"
                style="max-width: 400px"
              >
                <el-form-item label="企业名称">
                  <el-input disabled></el-input>
                </el-form-item>
                <el-form-item label="公司地址">
                  <el-input disabled></el-input>
                </el-form-item>
                <el-form-item label="公司电话">
                  <el-input disabled></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                  <el-input disabled></el-input>
                </el-form-item>
                <el-form-item label="备注">
                  <el-input type="textarea" rows="3" disabled></el-input>
                </el-form-item>
              </el-form> </template
          ></el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getRolesAPI } from "@/api";
export default {
  data() {
    return {
      activeName: "first",
      page: {
        page: 1,
        pagesize: 5,
        total: 0,
      },
      list: [], // 获取的角色列表
    };
  },
  created() {
    this.getRoles();
  },
  methods: {
    currentPage(page) {
      this.page.page = page;
      this.getRoles();
    },
    async getRoles() {
      try {
        const { total, rows } = await getRolesAPI(this.page);
        this.page.total = total;
        this.list = rows;
      } catch (error) {}
    },

    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>

<style lang="scss" scoped>
.main-table {
  margin-top: 15px;
  text-align: center;
}
.main-form {
  margin: 15px auto;
}
</style>
