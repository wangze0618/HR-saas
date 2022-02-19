<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName">
          <el-tab-pane label="角色管理" name="first">
            <template>
              <!-- 新增按钮 -->
              <el-button
                icon="el-icon-plus"
                @click="
                  showDialog = true;
                  title = '新增';
                "
                type="primary"
                >新增角色</el-button
              >
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
                  width="110"
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
                  <template slot-scope="{ row }">
                    <el-button size="small" type="success">分配权限</el-button>
                    <el-button
                      size="small"
                      type="primary"
                      @click="editRole(row)"
                      >编辑</el-button
                    >
                    <el-button
                      size="small"
                      type="danger"
                      @click="deleteRole(row)"
                      >删除</el-button
                    >
                  </template>
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
                  <el-input v-model="formData.name" disabled></el-input>
                </el-form-item>
                <el-form-item label="公司地址">
                  <el-input
                    disabled
                    v-model="formData.companyAddress"
                  ></el-input>
                </el-form-item>
                <el-form-item label="公司电话">
                  <el-input v-model="formData.companyPhone" disabled></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                  <el-input v-model="formData.mailbox" disabled></el-input>
                </el-form-item>
                <el-form-item label="备注">
                  <el-input
                    v-model="formData.remarks"
                    type="textarea"
                    :rows="3"
                    disabled
                  ></el-input>
                </el-form-item>
              </el-form> </template
          ></el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
    <UpdateRole
      ref="updateRole"
      :title="title"
      :rowId="rowId"
      :showDialog.sync="showDialog"
      @updateRole="updateRole"
      @addRole="addRole"
    ></UpdateRole>
  </div>
</template>

<script>
import {
  getRolesAPI,
  getCompanyInfoAPI,
  deleteRoleAPI,
  getRoleDetailAPI,
  updateRoleAPI,
  addRoleAPI,
} from "@/api";
import { mapGetters } from "vuex";
import UpdateRole from "./components/updateRole.vue";
export default {
  computed: {
    ...mapGetters(["companyId"]),
  },
  data() {
    return {
      title: "",
      rowId: "",
      showDialog: false,
      formData: [],
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
    this.getCompanyInfo();
    this.editRole();
  },

  methods: {
    async addRole(roleForm) {
      this.title = "新增";
      try {
        await addRoleAPI(roleForm);
        this.$message.success("添加成功！");
        this.getRoles();
        this.showDialog = false;
      } catch (error) {}
    },
    // 更新角色
    async updateRole(roleForm) {
      try {
        await updateRoleAPI(roleForm);
        this.getRoles();
        this.$message.success("更改成功");
        this.showDialog = false;
      } catch (error) {
        console.log(error);
      }
    },
    // 编辑角色
    async editRole(row) {
      this.rowId = row.id;
      this.$refs.updateRole.getRoleInfo(this.rowId);
      this.showDialog = true;
      this.title = "编辑";
    },

    // 删除角色
    async deleteRole(row) {
      try {
        await this.$confirm("确定删除？");
        await deleteRoleAPI(row.id);
        this.$notify.success("删除成功！");
      } catch (error) {
        console.log(error);
      }
      this.getRoles();
    },

    // 获取公司信息
    async getCompanyInfo() {
      this.formData = await getCompanyInfoAPI(this.companyId);
    },
    currentPage(page) {
      this.page.page = page;
      this.getRoles();
    },
    async getRoles() {
      const { total, rows } = await getRolesAPI(this.page);
      this.page.total = total;
      this.list = rows;
    },
  },
  components: { UpdateRole },
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
