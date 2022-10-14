<template>
  <div class="manage_chart">
    <EnterpriseAlertYaoSu></EnterpriseAlertYaoSu>
    <!-- <div class="text_info">
      <div class="info_item" v-for="item in warningCount" :key="item.redCount">
        <label>{{}}</label>
        <span class="city">{{ item.area }}</span>
        <span>{{
          item.redCount + item.orangeCount + item.yellowCount + item.greenCount
        }}</span>
      </div>
    </div> -->
  </div>
</template>
<script>
import EnterpriseAlertYaoSu from "./EnterpriseAlertYaoSu.vue";
export default {
  name: "WarningStatisticsYaoSu",
  data() {
    return {};
  },
  components: {
    EnterpriseAlertYaoSu,
  },
};
</script>
<style lang="less" scoped>
@import "~@/assets/style/portal.less";
</style>