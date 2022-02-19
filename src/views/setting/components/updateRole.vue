<template>
  <el-dialog
    :title="title"
    @close="
      $emit('update:showDialog', false);
      resetForm();
    "
    :visible="showDialog"
    width="width"
  >
    <template>
      <el-row>
        <el-col>
          <el-form
            ref="roleForm"
            :model="roleForm"
            :rules="rules"
            label-width="80px"
          >
            <el-form-item prop="name" label="角色名称">
              <el-input v-model="roleForm.name"></el-input>
            </el-form-item>
            <el-form-item prop="description" label="角色描述">
              <el-input v-model="roleForm.description"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </template>
    <div slot="footer">
      <el-row type="flex" justify="center">
        <el-col style="text-align: center">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="confirm">确 定</el-button>
        </el-col>
      </el-row>
    </div>
  </el-dialog>
</template>

<script>
import { getRoleDetailAPI } from "@/api";
export default {
  props: {
    title: {
      type: [String, Object],
      required: true,
    },
    showDialog: {
      type: Boolean,
    },
    rowId: {
      type: [String, Number],
    },
  },
  name: "UpdateRole",
  data() {
    return {
      rules: {
        name: [{ required: "true", message: "姓名不能为空", trigger: "blur" }],
        description: [
          { required: "true", message: "描述不能为空", trigger: "blur" },
        ],
      },
      roleForm: {
        name: "",
        description: "",
      },
    };
  },

  methods: {
    async getRoleInfo(id) {
      this.roleForm = await getRoleDetailAPI(id);
    },
    // 提交按钮
    confirm() {
      this.$refs.roleForm.validate(async (isOK) => {
        if (isOK) {
          if (this.roleForm.id) {
            this.$emit("updateRole", this.roleForm);
          } else {
            //新增业务
            this.$emit("addRole", this.roleForm);
          }
        }
      });
    },
    cancel() {
      this.$emit("update:showDialog", false);
      this.$refs.roleForm.resetFields();
    },
    resetForm() {
      this.$refs.roleForm.resetFields();
    },
  },
};
</script>

<style>
</style>