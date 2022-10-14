<template>
  <div class="page_container" ref="page">
    <div class="map_container" style="z-index: 1">
      <fake-warn-map />
    </div>
    <div class="list_container">
      <h3>
        <img src="../../assets/images/warn/warn_icon.png" />
        <span>预警信息</span>
      </h3>
      <WarnInfo></WarnInfo>
    </div>
    <div class="bar_container">
      <h3>
        <img src="../../assets/images/warn/warn_icon.png" />
        <span>预警数量</span>
      </h3>
      <WarningStatistics top="-50px"></WarningStatistics>
    </div>
  </div>
</template>
<script>
import WarnInfo from "./WarnInfo.vue";
import WarningStatistics from "../portal/chart/WarningStatistics.vue";
import FakeWarnMap from "../manage/FakeWarnMap.vue";
export default {
  name: "WarnPage",
  components: {
    WarnInfo,
    WarningStatistics,
    FakeWarnMap,
  },
};
</script>
<style lang="less" scoped>
@import "~@/assets/style/warn/warn_page.less";
</style>