<template>
  <div class="box">
    <el-dialog
      :title="title"
      :visible="showlog"
      class="boxlog"
      @close="$emit('closeLog', false)"
    >
      <el-form
        ref="mainForm"
        :rules="rules"
        label-width="120px"
        :model="formDate"
      >
        <el-form-item label="部门名称" prop="name">
          <el-input
            style="width: 80%"
            placeholder="1-50个字符"
            v-model="formDate.name"
          />
        </el-form-item>

        <el-form-item label="部门编码" prop="code">
          <el-input
            style="width: 80%"
            placeholder="1-50个字符"
            v-model="formDate.code"
          />
        </el-form-item>

        <el-form-item label="部门负责人" prop="manager">
          <el-select
            @focus="getEmployeeSimple"
            style="width: 80%"
            placeholder="请选择"
            v-model="formDate.manager"
          >
            <el-option
              v-for="item in people"
              :key="item.id"
              :value="item.username"
              :label="item.username"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="部门介绍" prop="introduce">
          <el-input
            style="width: 80%"
            placeholder="1-300个字符"
            type="textarea"
            :rows="3"
            v-model="formDate.introduce"
          />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-row type="flex" justify="center">
          <el-col :span="6" class="footerBtn">
            <el-button
              @click="
                showlog = false;
                resetForm();
              "
              >取 消</el-button
            >
            <el-button
              type="primary"
              @click="
                checkForm();
                submitDate();
              "
              >确 定</el-button
            >
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  addDepartmentsAPI,
  getDepartDetailAPI,
  getDepartmentsAPI,
  getEmployeeSimpleAPI,
  updateDepartmentsAPI,
} from "@/api";
import { title } from "@/settings";
export default {
  computed: {
    ...mapGetters(["title"]),
  },
  props: {
    showDialog: {
      type: Boolean,
      default: false,
    },
    node: {
      type: Object,
    },
  },
  name: "AddDept",
  watch: {
    node: {
      deep: true,
      immediate: true,
      handler(val) {
        this.treeNode = val;
      },
    },
    showDialog: function (val) {
      this.showlog = val;
    },
  },
  methods: {
    submitDate() {
      this.$refs.mainForm.validate(async (isOK) => {
        if (isOK) {
          if (this["title"] === "新增") {
            await addDepartmentsAPI({ ...this.formDate, pid: this.node.id });

            console.log(111);
          } else if (this["title"] === "编辑") {
            await updateDepartmentsAPI(this.formDate);
          }
        }
      });
    },
    // 获取部门详情
    async getDepartDetail(id) {
      this.formDate = await getDepartDetailAPI(id);
    },
    resetForm() {
      this.formData = {
        name: "",
        code: "",
        manager: "",
        introduce: "",
      };
      this.$refs.mainForm.resetFields();
    },
    checkForm() {
      this.$refs.mainForm.validate(async (isOK) => {
        if (isOK) {
          await addDepartmentsAPI({ ...this.formDate, pid: this.node.id });
          this.$emit("update:showDialog", false);
        }
      });
    },
    async getEmployeeSimple() {
      this.people = await getEmployeeSimpleAPI();
    },
  },
  data() {
    const checkNameRepeat = async (rule, value, callback) => {
      // 先要获取最新的组织架构数据
      const { depts } = await getDepartmentsAPI();
      // depts是所有的部门数据
      // 如何去找技术部所有的子节点

      const isRepeat = depts
        .filter((item) => item.pid === this.treeNode.id)
        .some((item) => item.name === value);
      isRepeat
        ? callback(new Error(`同级部门下已经有${value}的部门了`))
        : callback();
    };
    // 检查编码重复
    const checkCodeRepeat = async (rule, value, callback) => {
      // 先要获取最新的组织架构数据
      const { depts } = await getDepartmentsAPI();
      const isRepeat = depts.some((item) => item.code === value && value); // 这里加一个 value不为空 因为我们的部门有可能没有code
      isRepeat
        ? callback(new Error(`组织架构中已经有部门使用${value}编码`))
        : callback();
    };
    return {
      people: [],
      showlog: this.showDialog,
      treeNode: this.node,
      formDate: {
        name: "", // 部门名称
        code: "", // 部门编码
        manager: "", // 部门管理者
        introduce: "", // 部门介绍
      },
      rules: {
        name: [
          { required: true, message: "部门名称不能为空", trigger: "blur" },
          {
            min: 1,
            max: 50,
            message: "部门名称要求1-50个字符",
            trigger: "blur",
          },
          { trigger: "blur", validator: checkNameRepeat },
        ],
        code: [
          { required: true, message: "部门编码不能为空", trigger: "blur" },
          {
            min: 1,
            max: 50,
            message: "部门编码要求1-50个字符",
            trigger: "blur",
          },
          { trigger: "blur", validator: checkCodeRepeat },
        ],
        manager: [
          { required: true, message: "部门负责人不能为空", trigger: "blur" },
        ],
        introduce: [
          { required: true, message: "部门介绍不能为空", trigger: "blur" },
          {
            trigger: "blur",
            min: 1,
            max: 300,
            message: "部门介绍要求1-50个字符",
          },
        ],
      },
    };
  },
};
</script>

<style lang="scss">
@media (max-width: 700px) {
  .box {
    .boxlog {
      .el-dialog {
        width: 95%;
      }
    }
  }
}
.footerBtn {
  display: flex;
  justify-content: space-around;
}
</style>