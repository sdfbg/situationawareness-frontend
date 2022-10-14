<template>
  <div class="page_contnet" ref="page">
    <div class="map_container" v-if="mapStyle != 'gaosu'" style="z-index: 1">
      <map-test :road="road"/>
    </div>
    <div class="left_bg"></div>
    <div class="right_bg"></div>
    <div class="bottom_bg"></div>
    <div class="page_left">
      <div class="char_box road_box">
        <a-switch class="chart_tab" checked-children="道路里程数" un-checked-children="百公里民警数" v-model="leftOne" />
        <h2>
          <span v-if="leftOne">全省道路里程数(单位：公里)</span>
          <span v-else>全省公路百公里民警数</span>
        </h2>
        <dao-lu-li-cheng
          v-if="leftOne"
          :roadInfo="roadInfo"
          :loading="roadInfoLoading"
        />
        <KiloPoliceNum v-else />
      </div>
      <div class="char_box manage_box">
        <h2>
          <span>全省近三年道路亡人事故数</span>
        </h2>
        <time-distribution />
      </div>
      <div class="char_box manage_box">
        <h2>
          <span>全省事故多发点段/公路风险隐患数量</span>
          <a-icon
            class="question_icon"
            type="question-circle"
            @click="hanldeIconClick"
          />
        </h2>
        <div class="chart_content_road">
          <div class="chart_item">
            <div class="data_count">
              <div class="data_top">
                <img src="../../assets/images/tootip.png" />
              </div>
              <p>事故多发点段</p>
            </div>
            <div class="data_count">
              <span>{{ this.accidentData }} 个</span>
            </div>
          </div>
          <div class="chart_item">
            <div class="data_count">
              <div class="data_top">
                <img src="../../assets/images/warn_icon.png" />
              </div>
              <p>公路风险隐患</p>
            </div>
            <div class="data_count">
              <span>{{ this.riskData }} 起</span>
            </div>
          </div>
        </div>
        <!-- 弹窗 -->
        <a-modal
          v-model="explainVisible"
          width="6rem"
          :maskClosable="false"
          :footer="null"
          class="explain_modal"
          :getContainer="() => $refs.page"
          style="left: -300px; top: 700px"
        >
          <template #closeIcon>
            <img src="../../assets/images/portal/three_CLOSE.png" />
          </template>
          <div class="modal_container">
            基于车辆基本信息及车辆状态数据，构建积分体系。模型包含机动车基础信息、机动车状态信息两个大类指标，每个大类指标细化成多个小类指标。车辆积分实行加分制及一票否决制，其计算频率为按日更新，每天00:00进行积分刷新计算。
            若车辆不包含一票否决行为，则车辆得分=机动车基础信息分数+机动车状态信息分数；反之，则车辆得分=60+一票否决分数；同时根据积分值，进行等级划分，包含红色（≥60）、橙（50-60）、黄（40-50）、绿（＜40）四个等级。
          </div>
        </a-modal>
      </div>
    </div>
    <div class="page_middle">
      <div class="map_area">
        <div class="data_display">
          <div class="data_item">
            <h3>
              <img src="../../assets/images/title_left.png" />
              <span>主干公路总条数</span>
              <img src="../../assets/images/title_right.png" />
            </h3>
            <div class="numDiv">
              <div class="numDivItemdiv" v-for="(item, index) in arr" :key="index">
                <div class="num_view" :style="{ transform: numTran[index] }">
                  <div class="item" v-for="(t, i) in item" :key="i">
                    {{ t }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="data_item">
            <h3>
              <img src="../../assets/images/title_left.png" />
              <span>公路里程数</span>
              <img src="../../assets/images/title_right.png" />
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
          </div>
        </div>
        <div class="map_title">
          <a-row>
            <a-col offset="8" style="text-align: right; z-index: 2">
              <a-radio-group v-model="mapStyle" button-style="solid">
                <a-radio-button value="map">路网</a-radio-button>
                <a-radio-button value="gaosu">高速</a-radio-button>
                <!-- <a-radio-button value="mapRisk"> 隐患 </a-radio-button> -->
              </a-radio-group>
            </a-col>
          </a-row>
        </div>
        <div class="echarts_map" v-if="mapStyle=='gaosu'" style="margin-top: 0.6rem">
          <high-speed-bar />
        </div>
        <!-- <div class="map_point" style="top: 15%; left: 20%; z-index: 10">
          <img
            src="../../assets/images/site-gre.png"
            v-if="mapStyle == 'mapRisk'"
          />
        </div>
        <div class="map_point" style="top: 45%; left: 50%; z-index: 10">
          <img
            src="../../assets/images/site-red.png"
            v-if="mapStyle == 'mapRisk'"
          />
        </div>
        <div class="map_point" style="top: 65%; left: 30%; z-index: 10">
          <img
            src="../../assets/images/site-yel.png"
            v-if="mapStyle == 'mapRisk'"
          />
        </div>
        <div class="map_options" style="z-index: 0" v-if="mapStyle == 'mapRisk'">
          <a-checkbox-group @change="onChange" v-model="mapCheck">
            <a-checkbox value="a"> 隐患分布图 </a-checkbox>
            <a-checkbox value="b"> 隐患聚合图 </a-checkbox>
            <a-checkbox value="c"> 隐患热力图 </a-checkbox>
          </a-checkbox-group>
        </div> -->
      </div>
      <div class="middle_bottom road_bottom">
        <div class="chart_container">
          <h2 class="short-title">
            <span>事故多发点段Top10</span>
          </h2>
          <AccidentTop10></AccidentTop10>
        </div>
        <div class="chart_container">
          <h2 class="short-title">
            <span>公路风险隐患Top10</span>
          </h2>
          <FengxianTOP10></FengxianTOP10>
        </div>
      </div>
    </div>
    <div class="page_left">
      <div class="char_box manage_box">
        <h2>
          <span>全省道路流量情况</span>
        </h2>
        <div class="box_tab">
          <a-radio-group v-model="roadType" button-style="solid">
            <a-radio-button
              v-for="roadType in roadTypes"
              :key="roadType.value"
              :value="roadType.value">
              {{roadType.name}} 
            </a-radio-button> 
          </a-radio-group>
        </div>
        <lu-duan-liu-liang
          :roadInfo="roadInfo"
          :roadType="roadType"
          :loading="roadInfoLoading"
        />
      </div>
      <div class="char_box manage_box">
        <h2>
          <span>各地市近三年百公里亡人事故数</span>
        </h2>
        <escalation />
      </div>
      <div class="char_box manage_box">
        <h2>
          <span>各地市事故多发点段和道路隐患分析</span>
        </h2>
        <div class="box_tab">
          <a-radio-group v-model="mileageDuration" button-style="solid">
            <a-radio-button :value="0"> 年度 </a-radio-button>
            <a-radio-button :value="1"> 月度 </a-radio-button>
            <a-radio-button :value="2"> 每天 </a-radio-button>
          </a-radio-group>
        </div>
        <road-mileage :duration="mileageDuration" />
      </div>
    </div>
  </div>
</template>
<script>
import RoadMileage from "./chart/RoadMileage.vue";
import Escalation from "./chart/Escalation.vue";
import TimeDistribution from "./chart/TimeDistribution.vue";
import MapTest from "../manage/mapTest.vue";
import FengxianTOP10 from "./chart/FengxianTOP10.vue";
import AccidentTop10 from "./chart/AccidentTop10.vue";
import LuDuanLiuLiang from "./chart/LuDuanLiuLiang.vue";
import DaoLuLiCheng from "./chart/DaoLuLiCheng.vue";
import api from "../../api";
import KiloPoliceNum from "./chart/KiloPoliceNum.vue";
import HighSpeedBar from "./chart/HighSpeedBar.vue";
import roadTypes from "@/common/roadTypes.js";
import { dealNum, timer } from "@/views/common/numDeal";
export default {
  name: "Car",
  data() {
    return {
      mapCheck: ["a"],
      valueOne: [
        {
          name: "路段1",
          value: "123",
        },
        {
          name: "路段2",
          value: "232",
        },
        {
          name: "路段3",
          value: "187",
        },
        {
          name: "路段2",
          value: "232",
        },
        {
          name: "路段3",
          value: "187",
        },
      ],
      roadOne: "roadBarOne",
      riskData: 0,
      accidentData: 0,
      mapStyle: "map",
      arr: new Array(8).fill([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
      numTran: new Array(8).fill(""),
      rightArr: new Array(8).fill([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
      numRightTran: new Array(8).fill(""),
      num: 80,
      rightNum: 106700,
      countYoy: 0,
      monthYoy: 0,
      monthQoq: 0,
      value: "0",
      leftOne:true,
      roadTypes,
      roadType: roadTypes[0].value,
      roadInfo : {},
      roadInfoLoading: true,
      road: true,
      youXiaType: "0",
      mileageDuration: 0,
      explainVisible: false
    };
  },
  components: {
    RoadMileage,
    Escalation,
    TimeDistribution,
    MapTest,
    FengxianTOP10,
    AccidentTop10,
    LuDuanLiuLiang,
    DaoLuLiCheng,
    KiloPoliceNum,
    HighSpeedBar,
  },
  mounted() {
    this.getRiskAccidentData();
    this.fetchRoadInfo();
    this.dealNum();
  },
  methods: {
    getRiskAccidentData() {
      this.$axios.post(api.getRoadRightTop()).then((res) => {
        let data = res.data.data;
        this.riskData = data.hiddenTrouble.count;
        this.accidentData = data.accident.count;
      });
    },
    fetchRoadInfo(){
      this.$axios.post(api.getRoadInfo()).then((res) => {
        this.roadInfo = res.data.data;
        // this.rightNum = roadTypes.map(r=>r.value).map(t=>this.roadInfo[t]).flat().map(d=>d.gls).reduce((d1,d2)=>d1+d2)
        // this.num = roadTypes.map(r=>r.value).map(t=>this.roadInfo[t]).map(d=>d.length).reduce((d1,d2)=>d1+d2)
        this.roadInfoLoading = false;
      })
    },
    hanldeIconClick() {
      this.explainVisible = true;
    },
    dealNum() {
      this.num = dealNum(this.num);
      setTimeout(() => {
        timer(this.arr, this.num, this.numTran, this);
      }, 1000);
      this.rightNum = dealNum(this.rightNum);
      setTimeout(() => {
        timer(this.rightArr, this.rightNum, this.numRightTran, this);
      }, 1000);
    },
  },
};
</script>
<style lang="less" scoped>
@import "~@/assets/style/car.less";
@import "~@/assets/style/warn/modal.less";
</style>