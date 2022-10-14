<template>
  <div class="car_warn">
    <div class="select_box">
      <a-select style="width:100%" v-model="special">
        <a-select-option value="all">
         全部类型
        </a-select-option>
        <a-select-option value="0">
          隐患类型一
        </a-select-option>
        <a-select-option value="1">
          隐患类型二
        </a-select-option>
      </a-select>
    </div>
    <div class="warn_list road_warn">
      <a-timeline>
        
        <a-timeline-item v-for="(item,i) in 4" :key="i">
          <div class="date">2022-04-09 12:21:12</div>
          <div class="item_content">
            <div class="content_top">
              <a-row>
                <a-col :span="12">
                  <span class="car_num">国道</span>
                </a-col>
                <a-col :span="12" style="text-align:right">
                  <span class="warn_type">事故多发地段</span>
                </a-col>
              </a-row>
            </div>
            <p>国道G103事故多发地段国道G103事故多发地段国道G103事故多发地段国道G103事故多发地段国道G103事故多发地段国道G103事故多发地段国道G103事故多发地段</p>
            <span style="color:#8959C2;font-weight:bold">G103</span>
          </div>
        </a-timeline-item>
        
      </a-timeline>
    </div>
  </div>
</template>
<script>
export default {
  name:'WarnInfo',
  data() {
    return {
      special:'all'
    }
  },
}
</script>
<style lang="less" scoped>
@import "~@/assets/style/car.less";
</style>