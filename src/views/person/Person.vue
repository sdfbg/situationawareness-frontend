<template>
  <div class="page_contnet" ref="page">
    <div class="map_container" v-if="mapStyle == 'map'" style="z-index: 1">
      <map-test />
    </div>
    <div class="left_bg"></div>
    <div class="right_bg"></div>
    <div class="bottom_bg"></div>
    <div class="page_left">
      <div class="char_box">
        <a-switch
          class="chart_tab"
          checked-children="驾照"
          un-checked-children="驾龄"
          v-model="leftOne"
        />
        <h2>
          <span v-if="leftOne">全省驾驶人驾照类型占比</span>
          <span v-else>全省驾驶人驾龄（岁）占比</span>
        </h2>
        <driver-car v-if="leftOne" />
        <driver-change v-else />
      </div>
      <div class="char_box">
        <h2>
          <span>全省驾驶人未换证/未审验数量</span>
        </h2>
        <joint-disposal />
      </div>
      <div class="char_box">
        <a-switch
          class="chart_tab"
          checked-children="全省"
          un-checked-children="各地市"
          v-model="leftTwo"
        />
        <h2>
          <span v-if="leftTwo">全省驾驶人预警等级分析</span>
          <span v-else>各地市积分预警数量分析</span>
          <!-- <a-icon
            class="question_icon"
            type="question-circle"
            @click="hanldeIconClick"
          /> -->
        </h2>
        <DriverLicense v-if="leftTwo" />
        <point-alert-num v-else />
        <!-- 弹窗 -->
        <!-- <a-modal
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
            红色预警：根据违法数量、事故数量、车龄计算得出<br />
            橙色预警：根据违法数量、事故数量、车龄计算得出<br />
            黄色预警：根据违法数量、事故数量、车龄计算得出<br />
            绿色预警：根据违法数量、事故数量、车龄计算得出<br />
          </div>
        </a-modal> -->
      </div>
    </div>
    <div class="page_middle">
      <div class="map_area">
        <data-display data-url="personInfo" title="驾驶人总数"></data-display>
        <div class="echarts_map" style="margin-top: 1rem;">
          <Map
            v-if="mapStyle == 'echarts'"
            :stat="personCountByArea"
            :loading="mapLoading"/>
        </div>
      </div>
      <div class="middle_bottom">
        <h2>
          <span>全省重点驾驶人违法行为分析</span>
        </h2>
        <div class="box_tab">
          <a-radio-group v-model="duration" default-value="0" button-style="solid" @change="matchIllegalType(duration)">
            <a-radio-button :value="0"> 年 </a-radio-button>
            <a-radio-button :value="1"> 月 </a-radio-button>
            <a-radio-button :value="2"> 日 </a-radio-button>
          </a-radio-group>
        </div>
        <div class="category">
          <div class="category_box" v-for="(item, i) in driverIllegalType" :key="i">
            <p>{{ item.name }}</p>
            <span class="count" :style="{ color: colorList[i][0] }">
              {{ item.value }}
            </span>
            <div class="pie_box">
              <div :id="`pieChart${i}`" style="width: 1rem; height: 1rem"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="page_left">
      <div class="char_box">
        <h2>
          <span>全省近三年驾驶人交通事故数（起/万人）</span>
        </h2>
        <driver-accident-rate />
      </div>
      <div class="char_box">
        <h2>
          <span>全省近三年驾驶人交通违法数（起/万人）</span>
        </h2>
        <traffic-violation-rate />
      </div>
      <div class="char_box">
        <h2>
          <span>全省患有妨碍安全驾驶人员数量</span>
        </h2>
        <enterprise-alert />
      </div>
    </div>
  </div>
</template>
<script>
import { ringPie } from "./ringPie";
import DriverChange from "./chart/DriverChange.vue";
import DriverAccidentRate from "./chart/DriverAccidentRate.vue";
import DriverLicense from "./chart/DriverLicense.vue";
import DriverCar from "./chart/DriverCar.vue";
import TrafficViolationRate from "./chart/TrafficViolationRate.vue";
import Map from "@/components/chart/Map.vue";
import MapTest from "@/views/manage/mapTest.vue";
import PointAlertNum from "./chart/PointAlertNum.vue";
import JointDisposal from "./chart/JointDisposal.vue";
import EnterpriseAlert from "./chart/EnterpriseAlert.vue";
import DataDisplay from "@/views/common/DataDisplay.vue";
import api from "@/api";
export default {
  name: "Person",
  data() {
    return {
      type: "0",
      countArr: [80, 43, 22, 65, 35],
      driverIllegalType: [],
      colorList: [
        ["#06C955", "#6E8E7E"],
        ["#6FAEF3", "#4F74B8"],
        ["#f4e051", "#6E8E7E"],
        ["#1fe5ea", "#1daeff"],
        ["#EE9280", "#446886"],
      ],
      explainVisible: false,
      mapStyle: "echarts",
      driverStat: {
        linkRatio: 0.0,
        tbMonth: 0.0,
        yearAddRatio: 0.0,
      },
      warningCount: {},
      leftOne: true,
      leftTwo: true,
      personCountByArea: [],
      mapLoading: true,
      duration: 0,
      illegalType: {}
    };
  },
  filters: {
    retioFilter(ratio) {
      return Math.floor(ratio * 100).toFixed(2) + "%";
    },
  },
  computed: {},
  components: {
    DriverChange,
    DriverAccidentRate,
    DriverLicense,
    DriverCar,
    TrafficViolationRate,
    Map,
    MapTest,
    JointDisposal,
    PointAlertNum,
    EnterpriseAlert,
    DataDisplay,
  },
  mounted() {
    this.getIllegalType();
    this.getPersonCountByArea();
  },
  methods: {
    //重点驾驶人违法行为分析
    getIllegalType(){
      this.$axios.post(api.getIllegalType()).then((res) => {
        this.illegalType = res.data;
        this.matchIllegalType(0);
        this.$nextTick(()=>{
          for (let i = 0; i < this.driverIllegalType.length; i++) {
            ringPie(
              "pieChart" + i,
              this.driverIllegalType[i].rate,
              this.colorList[i]
            );
          }
        })
      })
    },
    matchIllegalType(value) {
      this.driverIllegalType = [];
      if (value == "0") {
        let {"%%_3": sum, "%酒%_3": drunk, "%速%_3": speed, "%证%_3": card, "%线%_3": line} = this.illegalType;
        let other = sum - (line + card + speed + drunk);
        this.driverIllegalType.push({name: "酒驾醉驾", value: drunk, rate: Math.round(drunk / sum * 100)});
        this.driverIllegalType.push({name: "限速违规", value: speed, rate: Math.round(speed / sum * 100)});
        this.driverIllegalType.push({name: "涉证违规", value: card, rate: Math.round(card / sum * 100)});
        this.driverIllegalType.push({name: "标识标线违规", value: line, rate: Math.round(line / sum * 100)});
        this.driverIllegalType.push({name: "其他违规", value: other, rate: Math.round(other / sum * 100)});
      }
      if (value == "1") {
        let {"%%_2": sum, "%酒%_2": drunk, "%速%_2": speed, "%证%_2": card, "%线%_2": line} = this.illegalType;
        let other = sum - (line + card + speed + drunk);
        this.driverIllegalType.push({name: "酒驾醉驾", value: drunk, rate: Math.round(drunk / sum * 100)});
        this.driverIllegalType.push({name: "限速违规", value: speed, rate: Math.round(speed / sum * 100)});
        this.driverIllegalType.push({name: "涉证违规", value: card, rate: Math.round(card / sum * 100)});
        this.driverIllegalType.push({name: "标识标线违规", value: line, rate: Math.round(line / sum * 100)});
        this.driverIllegalType.push({name: "其他违规", value: other, rate: Math.round(other / sum * 100)});
      }
      if (value == "2") {
        let {"%%_1": sum, "%酒%_1": drunk, "%速%_1": speed, "%证%_1": card, "%线%_1": line} = this.illegalType;
        let other = sum - (line + card + speed + drunk);
        this.driverIllegalType.push({name: "酒驾醉驾", value: drunk == null ? 0 : drunk, rate: drunk == null ? 0 : Math.round(drunk / sum * 100)});
        this.driverIllegalType.push({name: "限速违规", value: speed == null ? 0 : speed, rate: speed == null ? 0 : Math.round(speed / sum * 100)});
        this.driverIllegalType.push({name: "涉证违规", value: card == null ? 0 : card, rate: card == null ? 0 : Math.round(card / sum * 100)});
        this.driverIllegalType.push({name: "标识标线违规", value: line == null ? 0 : line, rate: line == null ? 0 : Math.round(line / sum * 100)});
        this.driverIllegalType.push({name: "其他违规", value: other == 0 ? 0 : other, rate: other == 0 ? 0 : Math.round(other / sum * 100)});
      }
      this.$nextTick(()=>{
        for (let i = 0; i < this.driverIllegalType.length; i++) {
          ringPie(
            "pieChart" + i,
            this.driverIllegalType[i].rate,
            this.colorList[i]
          );
        }
      })
    },
    //地图各市地图人数
    getPersonCountByArea() {
      this.$axios.post(api.getPersonCountByArea()).then((res) => {
        this.personCountByArea = res.data.map(d=>({code:d.CITY,total:d.COUNT,month:d.ADDCOUNT?d.ADDCOUNT:0}))
        this.mapLoading = false
      })
    },
    hanldeIconClick() {
      this.explainVisible = true;
    },
  },
};
</script>
<style lang="less" scoped>
@import "~@/assets/style/car.less";
@import "~@/assets/style/warn/modal.less";
.page_left {
  width: 22%;
}
.page_middle {
  .top_bottom {
    height: 1.6rem;
    position: relative;
    // background: url(~@/assets/images/tongji_bg.png) no-repeat;
    background-size: 100% 100%;
    .lineBGImg {
      position: absolute;
      left: calc(50% - 0.1rem);
      top: 0.2rem;
      height: calc(100% - 0.4rem);
    }
    .divDiv {
      float: left;
      width: 50%;
      height: 100%;
      .numDiv {
        padding: 0.1rem 0.2rem;
        overflow: hidden;
        .numDivItemdiv {
          float: left;
          background: url(~@/assets/images/number_bg.png) no-repeat;
          background-size: 100% 100%;
          text-align: center;
          height: 0.6rem;
          width: 0.45rem;
          line-height: 0.6rem;
          margin-right: 0.12rem;
          font-size: 0.33rem;
          overflow: hidden;
          .num_view {
            position: relative;
            display: inline-block;
            margin-right: 18px;
            width: 100%;
            height: auto;

            background: transparent;
            transition: transform 1s ease-in-out;
          }
          .item {
            background: transparent;
            width: 100%;
          }
        }
      }
      .msgDiv {
        font-size: 0.16rem;
        padding-left: 0.2rem;
        .spanSpan {
          color: #00ff42;
          font-size: 0.22rem;
        }
        .spanSpan2 {
          color: #ff0000;
        }
      }
    }
  }
  .center_bottom {
    height: calc(66.6666% - 1.8rem);
  }
}
.msgPPDiv {
  overflow: auto;
  height: calc(100% - 0.4rem);
  margin-top: 0.1rem;
  .msgPDiv {
    width: calc(50% - 0.4rem);
    float: left;
    background: url(~@/assets/images/warn_item_bg.png) no-repeat;
    background-size: 100% 100%;
    margin: 0 0.2rem 0.1rem;
    padding: 0.1rem 0.2rem;
  }
  .topMsgDiv {
    & > div {
      display: inline-block;
      padding: 0 0.05rem;
      background: #00ffff;
      line-height: 0.18rem;
      color: #000;
      font-size: 0.12rem;
      &.moreDiv {
        float: right;
        background: #e60012;
        border-radius: 0.05rem;
        color: #fff;
      }
    }
  }
  .msgTitleDiv {
    padding: 0.05rem 0.2rem 0.05rem 0;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .timeDiv {
    color: #02d8e1;
    text-align: right;
  }
  // .msgPDiv:nth-child(even) {
  //   margin-left: 0.2rem;
  // }
}
</style>