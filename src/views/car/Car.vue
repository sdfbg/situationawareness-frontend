<template>
  <div class="page_contnet">
    <div class="map_container" v-if="mapStyle == 'map'" style="z-index: 1">
      <map-test />
    </div>
    <div class="left_bg"></div>
    <div class="right_bg"></div>
    <div class="bottom_bg"></div>
    <div class="page_left">
      <div class="char_box">
        <a-switch class="chart_tab" checked-children="全省" un-checked-children="各地市" v-model="leftOne" />
        <h2>
          <span v-if="leftOne">全省重点车辆数量分析</span>
          <span v-else>各地市重点车辆类别分析</span>
        </h2>
        <car-b-ao-you-liang v-if="leftOne" />
        <EnterpriseVehiclesPie v-else />
      </div>
      <div class="char_box manage_box">
        <a-switch class="chart_tab" checked-children="全省" un-checked-children="各地市" v-model="leftTwo" />
        <h2>
          <span v-if="leftTwo">全省重点车辆亡人事故数</span>
          <span v-else>各地市重点车辆事故数（起/万辆）</span>
        </h2>
        <traffic-violation-bar v-if="leftTwo" />
        <TrafficFlow v-else />
      </div>
      <div class="char_box">
        <h2>
          <span>全省重点车辆预警等级分析</span>
        </h2>
        <key-traffic />
      </div>
    </div>
    <div class="page_middle">
      <div class="map_area">
        <data-display data-url="carInfo" title="车辆保有量"></data-display>
        <!-- <div class="map_title">
          <a-row>
            <a-col offset="8" style="text-align: right; z-index: 2">
              <a-radio-group v-model="mapStyle" button-style="solid">
                <a-radio-button value="echarts">保有量</a-radio-button>
                <a-radio-button value="map"> 预警 </a-radio-button>
              </a-radio-group>
            </a-col>
          </a-row>
        </div> -->
        <div class="echarts_map">
          <Map v-if="mapStyle == 'echarts'"
            :stat="carCountByArea"
            :loading="mapLoading"/>
        </div>
      </div>
      <div class="middle_bottom">
        <h2>
          <span>全省重点车辆类别预警等级分析</span>
        </h2>
        <AverageFlow />
      </div>
    </div>
    <div class="page_left">
      <div class="char_box">
        <h2>
          <span>全省车辆未检验/未报废/违法未处理数量</span>
        </h2>
        <KeyObjects />
      </div>
      <div class="char_box">
        <h2>
          <span>各地市拖拉机、联合收割机分布情况</span>
        </h2>
        <realTime-warning />
      </div>
      <div class="char_box">
        <h2>
          <span>各地市重点车辆预警分析</span>
        </h2>
        <yu-jing-deng-ji />
      </div>
    </div>
  </div>
</template>
<script>
// import api from "@/api";
import EnterpriseVehiclesPie from "./chart/EnterpriseVehiclesPie.vue";
import TrafficViolationBar from "./chart/TrafficViolationBar.vue";
import TrafficFlow from "./chart/TrafficFlow.vue";
import AverageFlow from "./chart/AverageFlow.vue";
import KeyTraffic from "./chart/KeyTraffic.vue";
import Map from "@/components/chart/Map.vue";
import MapTest from "@/views/manage/mapTest.vue";
import CarBAoYouLiang from "./chart/CarBAoYouLiang.vue";
import YuJingDengJi from "./chart/YuJingDengJi.vue";
import KeyObjects from "./chart/KeyObjects.vue";
import RealTimeWarning from "./chart/RealTimeWarning.vue";
import DataDisplay from "@/views/common/DataDisplay.vue";
import api from "@/api";
export default {
  name: "Car",
  data() {
    return {
      type: "0",
      datalist: [],
      yData: [],
      data: [],
      jiFenList: [],
      colordataList: [],
      jiFenList1: [],
      colorList1: [],
      mapStyle: "echarts",
      driverStat: {
        linkRatio: 0.0,
        tbMonth: 0.0,
        yearAddRatio: 0.0,
      },
      leftOne:true,
      leftTwo:true,
      carCountByArea: [],
      mapLoading: true,
    };
  },
  filters: {
    retioFilter(ratio) {
      return Math.floor(ratio * 100).toFixed(2) + "%";
    },
  },
  components: {
    EnterpriseVehiclesPie,
    TrafficViolationBar,
    TrafficFlow,
    AverageFlow,
    KeyTraffic,
    Map,
    MapTest,
    CarBAoYouLiang,
    YuJingDengJi,
    KeyObjects,
    RealTimeWarning,
    DataDisplay
  },
  mounted() {
    this.getCarCountByArea();
  },
  methods: {
    getCarCountByArea() {
      this.$axios.post(api.getCarCountByArea()).then((res) => {
        this.carCountByArea = res.data.map(d=>({code:d.CITY,total:d.COUNT,month:d.ADDCOUNT?d.ADDCOUNT:0}))
        this.mapLoading = false
      })
    },
  },
};
</script>
<style lang="less" scoped>
@import "~@/assets/style/car.less";
</style>