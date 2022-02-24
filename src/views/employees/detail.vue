<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName">
          <el-tab-pane label="登录账户设置" name="first">
            <template>
              <el-row type="flex" justify="center">
                <el-col :span="10">
                  <!-- 表单 -->
                  <el-form
                    ref="userForm"
                    :model="userInfo"
                    :rules="rules"
                    label-width="80px"
                  >
                    <el-form-item prop="username" label="姓名">
                      <el-input
                        maxlength="5"
                        v-model="userInfo.username"
                        placeholder="请输入"
                      ></el-input>
                    </el-form-item>
                    <el-form-item prop="password2" label="密码">
                      <el-input
                        type="password"
                        v-model="userInfo.password2"
                        placeholder="请输入"
                      ></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" @click="saveUser"
                        >确认</el-button
                      >
                      <el-button>取消</el-button>
                    </el-form-item>
                  </el-form>
                </el-col>
              </el-row>
            </template>
          </el-tab-pane>
          <el-tab-pane label="个人详情" name="seconde">
            <component :is="UserComponent"></component>
          </el-tab-pane>
          <el-tab-pane label="岗位信息" name="third">
            <component :is="JobComponent"></component>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserDetailByIdAPI } from "@/api";
import { saveUserDetailById } from "@/api/employees";
import UserInfo from "./components/userInfo.vue";
import JobInfo from "./components/jobInfo.vue";

export default {
  data() {
    return {
      UserComponent: "UserInfo",
      JobComponent: "jobInfo",
      activeName: "first",
      userId: this.$route.params.id,
      userInfo: {
        username: "",
        password2: "",
      },
      rules: {
        username: [
          {
            required: true,
            message: "姓名不能为空",
            trigger: "blur",
          },
          {
            min: 2,
            max: 5,
            message: "请填写正确的姓名",
            trigger: "blur",
          },
        ],
        password2: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur",
          },
          {
            min: 6,
            max: 9,
            message: "密码长度6-9位",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    this.getUserDetailById();
  },
  methods: {
    async getUserDetailById() {
      this.userInfo = await getUserDetailByIdAPI(this.userId);
      console.log(this.userInfo);
    },
    async saveUser() {
      try {
        // 校验
        await this.$refs.userForm.validate();
        await saveUserDetailByIdAPI({
          ...this.userInfo,
          password: this.userInfo.password2,
        }); // 将新密码的值替换原密码的值
        this.$message.success("保存成功");
      } catch (error) {
        console.log(error);
      }
    },
  },
  components: { UserInfo, JobInfo },
};
</script>

<style>
</style>
