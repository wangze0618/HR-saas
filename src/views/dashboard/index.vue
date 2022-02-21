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
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import UploadExcel from "@/components/UploadExcel/index.vue";

export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["name"]),
  },
  components: { UploadExcel },
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
