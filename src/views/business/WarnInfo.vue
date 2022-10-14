<template>
  <div class="car_warn">
    <div class="select_box">
      <a-select style="width:100%" v-model="special">
        <a-select-option value="all">预警类型</a-select-option>
        <a-select-option value="0">预警类型一</a-select-option>
        <a-select-option value="1">预警类型二</a-select-option>
      </a-select>
    </div>
    <div class="warn_list road_warn">
      <a-timeline>
        <a-timeline-item v-for="(itemI, index) in listData" :key="index">
          <div class="date">{{itemI.timer}}</div>
          <div class="item_content">
            <div class="content_top">
              <a-row>
                <a-col :span="12">
                  <span v-if="itemI.type == '1'" class="warmingSpan warmingSpan1">
                    <img src="../../assets/images/red.png"/>红色预警
                  </span>
                  <span v-else-if="itemI.type == '2'" class="warmingSpan warmingSpan2">
                    <img src="../../assets/images/org.png"/>橙色预警
                  </span>
                  <span v-else class="warmingSpan warmingSpan3">
                    <img src="../../assets/images/gre.png"/>黄色预警
                  </span>
                </a-col>
                <a-col :span="12" style="text-align:right">
                  <span class="warn_type">多次预警</span>
                </a-col>
              </a-row>
            </div>
            <p>{{itemI.msg}}</p>
            <span style="color:#8959C2;font-weight:bold">{{itemI.gsName}}</span>
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
      special:'all',
      listData: [
        {type: '1',timer: '2022-04-09 12:21:12',gsName: '吉林长春xxxxxx公司',msg: '国道G103事故多发地段国道G103事故多发地段国道G103事故多发地段国道G103事故多发地段国道G103事故多发地段国道G103事故多发地段国道G103事故多发地段'},
        {type: '1',timer: '2022-04-09 12:21:12',gsName: '吉林长春xxxxxx公司',msg: '国道G103事故多发地段国道G103事故多发地段国道G103事故多发地段国道G103事故多发地段国道G103事故多发地段国道G103事故多发地段国道G103事故多发地段'},
        {type: '2',timer: '2022-04-09 12:21:12',gsName: '吉林长春xxxxxx公司',msg: '国道G103事故多发地段国道G103事故多发地段国道G103事故多发地段国道G103事故多发地段国道G103事故多发地段国道G103事故多发地段国道G103事故多发地段'},
        {type: '3',timer: '2022-04-09 12:21:12',gsName: '吉林长春xxxxxx公司',msg: '国道G103事故多发地段国道G103事故多发地段国道G103事故多发地段国道G103事故多发地段国道G103事故多发地段国道G103事故多发地段国道G103事故多发地段'},
        {type: '3',timer: '2022-04-09 12:21:12',gsName: '吉林长春xxxxxx公司',msg: '国道G103事故多发地段国道G103事故多发地段国道G103事故多发地段国道G103事故多发地段国道G103事故多发地段国道G103事故多发地段国道G103事故多发地段'}
      ]
    }
  },
}
</script>
<style lang="less" scoped>
@import "~@/assets/style/car.less";
.car_warn .warn_list .item_content p {color: #D4D7DB;}
.car_warn .warn_list .item_content .content_top .warmingSpan {
  line-height: 0.23rem;
  &.warmingSpan1 {color: #E6203C;}
  &.warmingSpan2 {color: #FC4E19;}
  &.warmingSpan3 {color: #F6FE12;}
  img {width: 0.23rem;height: 0.23rem;margin-right: 0.05rem;}
}
</style>