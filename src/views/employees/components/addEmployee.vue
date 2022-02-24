<template>
  <el-dialog title="新增员工" :visible="showDialog" :before-close="btnCancel()">
    <template>
      <el-form
        ref="mainForm"
        :model="formData"
        :rules="rules"
        label-width="120px"
      >
        <el-form-item label="姓名" prop="username">
          <el-input
            v-model="formData.username"
            style="width: 80%"
            placeholder="请输入姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input
            maxlength="11"
            style="width: 80%"
            v-model="formData.mobile"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item label="入职时间" prop="timeOfEntry">
          <el-date-picker
            v-model="formData.timeOfEntry"
            style="width: 80%"
            type="date"
            placeholder="请选择入职时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="聘用形式" prop="formOfEmployment">
          <el-select
            style="width: 80%"
            v-model="formData.formOfEmployment"
            placeholder="请选择"
          >
            <el-option
              v-for="(item, index) in select"
              :key="index"
              :label="item.value"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工号" prop="workNumber">
          <el-input
            style="width: 80%"
            v-model="formData.workNumber"
            placeholder="请输入工号"
          ></el-input>
        </el-form-item>
        <el-form-item label="部门" prop="departmentName">
          <el-input
            @focus="getDepartments"
            style="width: 80%"
            v-model="formData.departmentName"
            placeholder="请输入部门"
          ></el-input>
          <el-tree
            @node-click="selectNode"
            v-loading="loading"
            v-if="showTree"
            :data="treeNode"
            :props="{ label: 'name' }"
          ></el-tree>
        </el-form-item>
        <el-form-item label="转正时间" prop="correctionTime">
          <el-date-picker
            v-model="formData.correctionTime"
            style="width: 80%"
            type="date"
            placeholder="请选择转正时间"
          ></el-date-picker>
        </el-form-item>
      </el-form>
    </template>
    <div slot="footer">
      <el-row type="flex" justify="center">
        <el-button @click="btnCancel()">取 消</el-button>
        <el-button type="primary" @click="btnOk()">确 定</el-button>
      </el-row>
    </div>
  </el-dialog>
</template>

<script>
import { addEmployeeAPI, getDepartmentsAPI } from "@/api";
import { transListToTreeDate } from "@/utils";
import EmployeeEnum from "@/api/constant/employees";

export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      select: [...EmployeeEnum.hireType],
      loading: false,
      showTree: false,
      treeNode: [],
      formData: {
        username: "",
        mobile: "",
        formOfEmployment: "",
        workNumber: "",
        departmentName: "",
        timeOfEntry: "",
        correctionTime: "",
      },
      rules: {
        username: [
          { required: true, message: "用户姓名不能为空", trigger: "blur" },
          {
            min: 1,
            max: 4,
            message: "用户姓名为1-4位",
          },
        ],
        mobile: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: "手机号格式不正确",
            trigger: "blur",
          },
        ],
        formOfEmployment: [
          { required: true, message: "聘用形式不能为空", trigger: "blur" },
        ],
        workNumber: [
          { required: true, message: "工号不能为空", trigger: "blur" },
        ],
        departmentName: [
          { required: true, message: "部门不能为空", trigger: "change" },
        ],
        timeOfEntry: [{ required: true, message: "入职时间", trigger: "blur" }],
      },
    };
  },
  methods: {
    async btnOk() {
      await this.$refs.mainForm.validate();
      await addEmployeeAPI(this.formData);
      this.$emit("updateList");
      this.$emit("update:showDialog", false);
    },
    btnCancel() {
      this.formData = {
        username: "",
        mobile: "",
        formOfEmployment: "",
        workNumber: "",
        departmentName: "",
        timeOfEntry: "",
        correctionTime: "",
      };
      // this.$refs.mainForm.resetFields();
      this.$emit("update:showDialog", false);
    },

    selectNode(node) {
      this.formData.departmentName = node.name;
      this.showTree = false;
    },

    async getDepartments() {
      this.showTree = true;
      this.loading = true;
      const { depts } = await getDepartmentsAPI();
      this.treeNode = transListToTreeDate(depts, "");
      this.loading = false;
    },
  },
};
</script>

<style>
</style>