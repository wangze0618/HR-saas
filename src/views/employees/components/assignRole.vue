<template>
  <el-dialog
    title="分配角色"
    :visible.sync="showDialog"
    :before-close="btnCancel"
  >
    <template>
      <el-checkbox-group v-model="RoleId">
        <el-checkbox v-for="item in list" :label="item.id" :key="item.id">{{
          item.name
        }}</el-checkbox>
      </el-checkbox-group>
    </template>
    <template #footer>
      <el-row type="flex" justify="center">
        <el-col style="text-align: center" :span="20">
          <el-button type="primary" @click="btnOk()">确 定</el-button>
          <el-button type="warning" @click="btnCancel()">取 消</el-button>
        </el-col>
      </el-row>
    </template>
  </el-dialog>
</template>

<script>
import { getRolesAPI, getUserDetailByIdAPI, assignRolesAPI } from "@/api";

getRolesAPI;

export default {
  name: "AssignRole",
  props: {
    showDialog: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: String,
    },
  },
  data() {
    return {
      list: [],
      RoleId: [],
    };
  },
  created() {
    this.getRoles();
  },
  methods: {
    async btnOk() {
      console.log(1);
      await assignRolesAPI({ id: this.userId, roleIds: this.RoleId });
      this.$emit("update:showDialog", false);
    },
    async btnCancel() {
      this.$emit("update:showDialog", false);
    },
    async getRoles() {
      const { rows } = await getRolesAPI({
        page: 1,
        pagesize: 20,
      });
      this.list = rows;
    },
    async getUserDetailById(id) {
      const { roleIds } = await getUserDetailByIdAPI(id);
      this.RoleId = roleIds;
    },
  },
};
</script>

<style>
</style>