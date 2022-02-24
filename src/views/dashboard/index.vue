<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <PageTools :showBefore="true">
      <template #before> 111 </template>
      <template #after>
        <div>111</div>
      </template>
    </PageTools>
    <UploadExcel></UploadExcel>
    <ImageUpload></ImageUpload>
    <AssignRole></AssignRole>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import UploadExcel from "@/components/UploadExcel/index.vue";
import ImageUpload from "@/components/ImageUpload/index.vue";
import AssignRole from "../employees/components/assignRole.vue";

export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["name"]),
  },
  components: { UploadExcel, ImageUpload, AssignRole },
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
