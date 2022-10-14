<template>
  <div class="page_contnet">
    <div class="left_bg"></div>
    <div class="right_bg"></div>
    <div class="bottom_bg"></div>
    <div class="page_left" ref="pageLeft">
      <div class="left_search">
        <a-radio-group v-model="year" button-style="solid">
          <a-radio-button v-for="y in years" :value="y" :key="y"> {{y}} </a-radio-button>
        </a-radio-group>
        <a-select  style="width: 220px" v-model="city" placeholder="请选择地市..." :getPopupContainer="()=>$refs.pageLeft">
          <a-select-option v-for="city in cities" :key="city.code" :value="city.code">
            {{ city.name }}
          </a-select-option>
        </a-select>
      </div>
      <illegal-happen-time
        :year="year"
        :code="city"/>
      <div class="char_box manage_box">
        <h2>
          <span>两客一危违法数量分析</span>
        </h2>
        <lkyw-illegal-num
          :year="year"
          :code="city"
        />
      </div>
      <div class="char_box manage_box">
        <h2>
          <span>全省农村交通违法数据统计</span>
        </h2>
        <disposal-feedback 
          :year="year"
        />
      </div>
    </div>
    <div class="page_middle">
      <div class="map_area manage_map">
        <data-display data-url="personInfo" title="违法总数"></data-display>
        <div class="map_title" style="right: -11.1rem">
          <a-row>
            <a-col span="6" offset="5" style="text-align: right">
              <a-radio-group
                :value="isTrouble?'trouble':$route.path"
                @change="(e) =>  mapTypeChange(e.target.value)"
                button-style="solid"
              >
                <a-radio-button value="/accident"> 事故 </a-radio-button>
                <a-radio-button value="/illegal">违法</a-radio-button>
                <!-- <a-radio-button value="trouble"> 隐患 </a-radio-button> -->
              </a-radio-group>
            </a-col>
          </a-row>
        </div>
        <div class="echarts_map1">
          <Map
            :stat="illegalCountByArea"
            :loading="mapLoading"
          />
        </div>
      </div>
      <div class="middle_bottom">
        <h2>
          <span>各地市违法查处总量统计</span>
        </h2>
        <illegal-check 
          :year="year"
        />
      </div>
    </div>
    <div class="page_left">
      <div class="char_box manage_box">
        <h2>
          <span>近三年各地市醉酒驾违法数量分析</span>
        </h2>
        <jj-illegal-num />
      </div>
      <div class="char_box manage_box">
        <h2>
          <span>近三年各地市限速违法数量分析</span>
        </h2>
        <zj-illegal-num />
      </div>
      <div class="char_box">
        <h2>
          <span>道路类型违法数量统计</span>
        </h2>
        <road-illegal-num :year="year" :city="city"/>
      </div>
    </div>
  </div>
</template>
<script>
import IllegalHappenTime from "./chart/illegal/IllegalHappenTime.vue";
import LkywIllegalNum from "./chart/illegal/LKYWIllegalNum.vue";
import IllegalCheck from "./chart/illegal/IllegalCheckNum.vue";
import JjIllegalNum from "./chart/illegal/JJIllegalNum.vue";
import ZjIllegalNum from "./chart/illegal/ZJIllegalNum.vue";
import RoadIllegalNum from "./chart/illegal/RoadIllegalNum.vue";
import DisposalFeedback from "./chart/DisposalFeedback.vue";
import DataDisplay from "@/views/common/DataDisplay.vue";
import Map from "@/components/chart/Map.vue";
import api from "../../api/index";
import cities from "../../common/city";
import moment from "moment";
export default {
  name: "ManageIllegal",
  data() {
    const year = moment().year()
    const years = Array.from({length:3}).map((v,i)=>year-i).reverse()
    return {
      cities: [
        {
          name: "吉林省",
          code: "220000"
        },
        ...cities],
      city: '220000',
      years,
      year,
      mode: "default",
      selectCity: [],
      isTrouble: false,
      num: 2643969,
      arr: new Array(8).fill([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
      numTran: new Array(8).fill(""),
      rightNum: 46840,
      rightArr: new Array(8).fill([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
      numRightTran: new Array(8).fill(""),
      illegalCountByArea: [],
      mapLoading: true,
      hbMonth:0,
      tbMonth:0,
      tbYear:0
    };
  },
  components: {
    IllegalHappenTime,
    LkywIllegalNum,
    IllegalCheck,
    JjIllegalNum,
    ZjIllegalNum,
    RoadIllegalNum,
    DisposalFeedback,
    Map,
    DataDisplay,
  },
  filters: {
    retioFilter(ratio){
      return Math.floor(Math.abs(ratio)*100).toFixed(2)+"%"
    }
  },
  mounted() {
    this.fetchMangeIllegalCountByArea()
    this.fetchTopStat()
    this.$store.commit("menu/setSelectedKey", "manage");
  },
  methods: {
    mapTypeChange(mapType){
      this.isTrouble = mapType=='trouble'
      if (!this.isTrouble) {
        this.$router.push(mapType)
      }
    },
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
    fetchMangeIllegalCountByArea(){
      this.$axios.post(api.manageIllegal('midTop')).then(res=>{
        this.illegalCountByArea = res.data.map(d=>({code:d.CITY,total:d.COUNT,month:d.ADDCOUNT?d.ADDCOUNT:0}))
        this.mapLoading = false
      })
    },
    fetchTopStat(){
      this.$axios.post(api.manageIllegal('illegalMapTopCount')).then(res=>{
        const {addMonthCount,count,hbMonth,tbMonth,tbYear} = res.data
        this.hbMonth = hbMonth
        this.tbMonth = tbMonth
        this.tbYear = tbYear
        this.num = count
        this.rightNum = addMonthCount
        this.renderTopStatNum()
      })
    },
    renderTopStatNum(){
      this.num = this.dealNum(this.num);
      setTimeout(() => {
        this.timer(this.num, this.numTran);
      }, 1000);
      this.rightNum = this.dealNum(this.rightNum);
      setTimeout(() => {
        this.timer(this.rightNum, this.numRightTran);
      }, 1000);
    }
  },
};
</script>
<style lang="less" scoped>
@import "~@/assets/style/car.less";
</style>