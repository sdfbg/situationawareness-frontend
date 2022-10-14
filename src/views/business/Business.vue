<template>
  <div class="page_contnet">
    <div class="map_container" v-if="mapStyle=='map'" style="z-index: 1">
      <map-test></map-test>
    </div>
    <div class="left_bg"></div>
    <div class="right_bg"></div>
    <div class="bottom_bg"></div>
    <div class="page_left">
      <div class="char_box">
        <a-switch class="chart_tab" checked-children="全省" un-checked-children="各地市" v-model="leftOne" />
        <h2>
          <span v-if="leftOne">全省重点企业车辆类型分析</span>
          <span v-else>各地市重点企业数量分析</span>
        </h2>
        <warming-level v-if="leftOne" :loading="echartLoading"/>
        <business-distribution v-else :businessCountByArea="businessCountByArea" :loading="echartLoading"/>
      </div>
      <div class="char_box">
        <a-switch class="chart_tab" checked-children="全省" un-checked-children="各地市" v-model="leftTwo" />
        <h2>
          <span v-if="leftTwo">全省重点企业类型预警分析</span>
          <span v-else>各地市重点企业预警等级分析</span>
        </h2>
        <accident-analysis v-if="leftTwo" />
        <AccidentTypeAnalysis v-else/>
      </div>
      <div class="char_box">
        <h2>
          <span>全省重点企业事故数Top10</span>
        </h2>
        <TopChart />
      </div>
      <!-- <div class="char_box">
        <h2>
          <span>重点企业事故类型分析</span>
        </h2>
        <AccidentTypeAnalysis />
      </div> -->
    </div>
    <div class="page_middle">
      <div class="map_area">
        <div class="data_display">
          <div class="data_item">
            <h3>
              <img src="../../assets/images/title_left.png"/>
              <span>企业总数</span>
              <img src="../../assets/images/title_right.png"/>
            </h3>
            <div class="numDiv">
              <div
                class="numDivItemdiv"
                v-for="(item, index) in arr"
                :key="index"
              >
                <div class="num_view" :style="{ transform: numTran[index] }">
                  <div class="item" v-for="(t, i) in item" :key="i">
                    {{ t }}
                  </div>
                </div>
              </div>
            </div>
            <div class="msgDiv">
            同比：<span class="spanSpan"><a-icon type="arrow-up" style="color: #ff0000"/>1.76%</span>
            </div>
          </div>
          <div class="data_item">
            <h3>
              <img src="../../assets/images/title_left.png"/>
              <span>月增量</span>
              <img src="../../assets/images/title_right.png"/>
            </h3>
            <div class="numDiv">
            <div
              class="numDivItemdiv"
              v-for="(item, index) in rightArr"
              :key="index"
            >
              <div class="num_view" :style="{ transform: numRightTran[index] }">
                <div class="item" v-for="(t, i) in item" :key="i">
                  {{ t }}
                </div>
              </div>
            </div>
          </div>
          <div class="msgDiv">
            同比：<span class="spanSpan" style="padding-right: 2em"
              >0%</span
            >
            环比：<span class="spanSpan spanSpan2"
              >0%</span
            >
          </div>
          </div>
        </div>
        <!-- <div class="map_title">
          <a-row>
            <a-col offset="8" style="text-align: right; z-index: 2">
              <a-radio-group  v-model="mapStyle" button-style="solid">
                <a-radio-button value="echarts">保有量</a-radio-button>
                <a-radio-button value="map">预警</a-radio-button>
                <a-radio-button value="charts"> 统计图 </a-radio-button>
              </a-radio-group>
            </a-col>
          </a-row>
        </div> -->
        <div class="echarts_map">
          <Map v-if="mapStyle=='echarts'"
            :stat="businessCountByArea"
            :loading="mapLoading"
            :showMonth="true"/>
        </div>
        <div class="map_point" style="top: 45%; left: 50%" v-if="mapStyle=='map'">
          <img src="../../assets/images/alert-red.png" />
        </div>
        <div class="map_point" style="top: 35%; left: 40%" v-if="mapStyle=='map'">
          <img src="../../assets/images/alert-org.png" />
        </div>
        <div class="map_point" style="top: 15%; left: 20%" v-if="mapStyle=='map'">
          <img src="../../assets/images/alert-gre.png" />
        </div>
        <div class="map_point" style="top: 65%; left: 30%" v-if="mapStyle=='map'">
          <img src="../../assets/images/alert-yel.png" />
        </div>
        <div class="map_options" style="z-index: 10" v-if="mapStyle=='map'">
          <div class="bjDiv">
            <img src="../../assets/images/alert-red.png" />红色预警
          </div>
          <div class="bjDiv">
            <img src="../../assets/images/alert-org.png" />橙色预警
          </div>
          <div class="bjDiv">
            <img src="../../assets/images/alert-yel.png" />黄色预警
          </div>
          <div class="bjDiv">
            <img src="../../assets/images/alert-gre.png" />绿色预警
          </div>
        </div>
      </div>
      <div class="middle_bottom">
        <h2>
          <span>各地市重点企业所属车辆违法分析</span>
        </h2>
        <cheliangweifa />
      </div>
    </div>
    <div class="page_left">
      <div class="char_box">
        <h2>
          <span>各地市近三年驾校违法数/事故数（起/万人）</span>
        </h2>
        <driver-warning />
      </div>
      <div class="char_box manage_box">
        <h2>
          <span>各地市重点运输企业备案数量</span>
        </h2>
        <key-vehicle />
      </div>
      <div class="char_box manage_box">
        <h2>
          <span>各地市重点企业所属车辆事故率（百辆）</span>
        </h2>
        <div class="box_tab" style="top: 0.15rem">
          <!-- <a-radio-group v-model="value" default-value="2" button-style="solid">
            <a-radio-button value="0"> 年度 </a-radio-button>
            <a-radio-button value="1"> 月度 </a-radio-button>
            <a-radio-button value="2"> 每天 </a-radio-button>
          </a-radio-group> -->
        </div>
        <cheliangshigu />
      </div>
    </div>
  </div>
</template>
<script>
import AccidentAnalysis from "./chart/AccidentAnalysis.vue";
import AccidentTypeAnalysis from "./chart/AccidentTypeAnalysis.vue";
import WarmingLevel from "./chart/WarmingLevel.vue";
import BusinessDistribution from "./chart/BusinessDistribution.vue";
// import WarnInfo from "./WarnInfo.vue";
import TopChart from "./chart/TopChart.vue";
import MapTest from "../manage/mapTest.vue";
import Cheliangshigu from "./chart/Cheliangshigu.vue";
import Cheliangweifa from "./chart/Cheliangweifa.vue";
import Map from "@/components/chart/Map.vue";
import api from "@/api";
import KeyVehicle from "./chart/KeyVehicle.vue";
import DriverWarning from "../manage/chart/DriverWarning.vue"
export default {
  name: "Car",
  data() {
    return {
      mapStyle:'echarts',
      num: 12423,
      arr: new Array(8).fill([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
      numTran: new Array(8).fill(""),
      rightNum: 2345,
      rightArr: new Array(8).fill([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
      numRightTran: new Array(8).fill(""),
      driverStat: {
        linkRatio: 0.0,
        tbMonth: 0.0,
        yearAddRatio: 0.0
      },
      leftOne:true,
      leftTwo:true,
      businessCountByArea: [],
      mapLoading: true,
      echartLoading: true,
    };
  },
  filters: {
    retioFilter(ratio){
      return Math.floor(ratio*100).toFixed(2)+"%"
    }
  },
  components: {
    AccidentAnalysis,
    AccidentTypeAnalysis,
    WarmingLevel,
    BusinessDistribution,
    DriverWarning,
    TopChart,
    MapTest,
    Cheliangshigu,
    Cheliangweifa,
    Map,
    KeyVehicle
  },
  mounted(){
    this.$axios.post(api.companyInfo()).then(res=>{
      this.num = res.data.data 
      this.rightNum = 0;
      this.num = this.dealNum(this.num);
      setTimeout(() => {
        this.timer(this.num, this.numTran);
      }, 1000);
      this.rightNum = this.dealNum(this.rightNum);
      setTimeout(() => {
        this.timer(this.rightNum, this.numRightTran);
      }, 1000);
      this.driverStat = res.data.data
    })
    this.fetchCompanyCountByArea()
  },
  methods:{
    dealNum(num) {
      num = num.toString();
      // 把数变成字符串
      if (num.length < 8) {
        num = "0" + num; // 如未满八位数，添加"0"补位
        // 递归添加"0"补位
        num = this.dealNum(num);
      }
      return num;
    },
    //变动动画
    timer(num, trans) {
      this.arr.forEach((item, i) => {
        item.forEach((subItem) => {
          if (num[i] == subItem) {
            trans[i] = "translateY(-" + num[i] * 10 + "%)";
            this.$forceUpdate();
          }
        });
      });
    },
    fetchCompanyCountByArea(){
      this.$axios.post(api.getCompanyCountByArea()).then(res=>{
        this.businessCountByArea = res.data.map(d=>({code:d.CITY,total:d.COUNT,month:0}))
        this.mapLoading = false
        this.echartLoading = false
      })
    }
  }
};
</script>
<style lang="less" scoped>
@import "~@/assets/style/car.less";
.page_middle .map_area h2 {
  padding: 0 0.2rem;
  width: 2rem;
  font-style: oblique;
}
.page_middle .map_area.road_map .map_options {
  padding: 0.05rem 0.1rem;
  .bjDiv {
    padding: 0.05rem 0;
    img {
      height: 0.25rem;
      width: 0.19rem;
      margin-right: 0.05rem;
    }
  }
}
</style>