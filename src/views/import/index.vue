<template>
  <div>
    <UploadExcel :onSuccess="Success"></UploadExcel>
  </div>
</template>

<script>
import { importEmployeeAPI } from "@/api";
export default {
  data() {
    return {};
  },
  methods: {
    async Success({ header, results }) {
      // 如果是导入员工
      const userRelations = {
        入职日期: "timeOfEntry",
        手机号: "mobile",
        姓名: "username",
        转正日期: "correctionTime",
        工号: "workNumber",
      };
      const newRes = results.map((item) => {
        let newArr = {};
        Object.keys(item).forEach((key) => {
          newArr[userRelations][key] = item[key];
        });
        return newArr;
      });

      await importEmployeeAPI(newRes); // 调用导入接口
      this.$notify.success("导入成功");
      this.$router.back();
    },
  },
};
</script>

<style>
</style>