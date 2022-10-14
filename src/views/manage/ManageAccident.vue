<template>
  <div class="page_contnet" >
    <div class="left_bg"></div>
    <div class="right_bg"></div>
    <div class="bottom_bg"></div>
    <div class="page_left" ref="pageLeft">
      <div class="left_search">
        <a-radio-group v-model="year" button-style="solid">
          <a-radio-button :value="2020"> 2020 </a-radio-button>
          <a-radio-button :value="2021"> 2021 </a-radio-button>
          <a-radio-button :value="2022"> 2022 </a-radio-button>
        </a-radio-group>
        <a-select  style="width: 220px" v-model="city" placeholder="请选择地市..." :getPopupContainer="()=>$refs.pageLeft">
          <a-select-option v-for="city in cities" :key="city.code" :value="city.code">
            {{ city.name }}
          </a-select-option>
        </a-select>
      </div>
      <div class="char_box manage_box">
        <div class="box_tab">
          <a-radio-group v-model="groupBy" button-style="solid">
            <a-radio-button :value="'month'"> 月份 </a-radio-button>
            <a-radio-button :value="'season'"> 季度 </a-radio-button>
          </a-radio-group>
        </div>
        <h2>
          <span>事故发生时间统计</span>
        </h2>
        <accident-time
          :year="year"
          :city="city"
          :groupBy="groupBy" />
      </div>
      <div class="char_box manage_box">
        <h2>
          <span>事故形态分析</span>
        </h2>
        <AccidentForm :year="year" :city="city"></AccidentForm>
      </div>
      <div class="char_box manage_box">
        <h2>
          <span>事故车型分析</span>
        </h2>
        <accident-vehicle
          :year="year"
          :city="city" />
      </div>
    </div>
    <div class="page_middle">
      <div class="map_area manage_map">
        <data-display data-url="accidentCount" title="事故总数" />
        <!-- <div class="map_title">
          <a-row>
            <a-col span="16"><h2>气象预警</h2></a-col>
          </a-row>
        </div> -->
        <!-- <div class="weather_warning">
          <div class="warning_item">
            <p>长春市</p>
            <img src="../../assets/images/weather/bx_yellow.png" />
          </div>
          <div class="warning_item">
            <p>吉林市</p>
            <img src="../../assets/images/weather/df_blue.png" />
          </div>
          <div class="warning_item">
            <p>松原</p>
            <img src="../../assets/images/weather/gw_red.png" />
          </div>
          <div class="warning_item">
            <p>吉林市</p>
            <img src="../../assets/images/weather/df_blue.png" />
          </div>
          <div class="warning_item">
            <p>松原</p>
            <img src="../../assets/images/weather/gw_red.png" />
          </div>
        </div> -->
        <div class="map_title" style="right: -11.1rem">
          <a-row>
            <a-col span="6" offset="5" style="text-align: right">
              <a-radio-group
                :value="isTrouble?'trouble':$route.path"
                @change="(e) =>  mapTypeChange(e.target.value)"
                button-style="solid">
                <a-radio-button value="/accident"> 事故 </a-radio-button>
                <a-radio-button value="/illegal">违法</a-radio-button>
                <!-- <a-radio-button value="trouble"> 隐患 </a-radio-button> -->
              </a-radio-group>
            </a-col>
          </a-row>
        </div>
        <div class="echarts_map1">
          <Map
            :stat="accidentCountByArea"
            :loading="mapLoading"
          />
        </div>
      </div>
      <div class="middle_bottom">
        <h2>
          <span>道路类型事故数量统计</span>
        </h2>
        <road-type-accident
          :year="year"
          :city="city"/>
      </div>
    </div>
    <div class="page_left">
      <div class="char_box manage_box">
        <h2>
          <span>事故天气情况分析</span> 
        </h2>
        <div class="chart_content">
          <div class="chart_item">
            <div class="data_count">
              <div class="data_top">
                <img src="../../assets/images/tootip.png" />
              </div>
              <p>晴</p>
            </div>
            <div class="data_count">
              <span>{{ this.weatherData.shine }} 起</span>
            </div>
          </div>
          <div class="chart_item">
            <div class="data_count">
              <div class="data_top">
                <img src="../../assets/images/warn_icon.png" />
              </div>
              <p>阴</p>
            </div>
            <div class="data_count">
              <span>{{ this.weatherData.cloudy }} 起</span>
            </div>
          </div>
          <div class="chart_item">
            <div class="data_count">
              <div class="data_top">
                <img src="../../assets/images/warn_icon.png" />
              </div>
              <p>雨</p>
            </div>
            <div class="data_count">
              <span>{{ this.weatherData.rain }} 起</span>
            </div>
          </div>
        </div>
        <!-- <WeatherAccident></WeatherAccident> -->
      </div>
      <div class="char_box manage_box">
        <h2>
          <span>事故类型数量统计</span>
        </h2>
        <AccidentType :year="year" :city="city"></AccidentType>
      </div>
      <div class="char_box">
        <h2>
          <span>违法行为导致事故统计</span>
        </h2>
        <IllegalToAccident :year="year" :city="city"></IllegalToAccident>
      </div>
    </div>
  </div>
</template>
<script>
import AccidentTime from "./chart/accident/AccidentTime.vue";
import AccidentForm from "./chart/accident/AccidentForm.vue";
import AccidentVehicle from "./chart/accident/AccidentVehicle.vue";
import RoadTypeAccident from "./chart/accident/RoadTypeAccident.vue";
import AccidentType from "./chart/accident/AccidentType.vue";
import IllegalToAccident from "./chart/accident/IllegalToAccident.vue";
import Map from "@/components/chart/Map.vue";
import DataDisplay from "@/views/common/DataDisplay.vue";
import api from "@/api";
import cities from "../../common/city";
export default {
  name: "Manage",
  data() {
    return {
      cities:[
        {
          name: "吉林省",
          code: "220000"
        },
        ...cities],
      city:'220000',
      isTrouble: false,
      year: 2022,
      groupBy: 'month',
      weatherData: {
        shine: 0,
        cloudy: 0,
        rain: 0
      },
      num: 2934,
      arr: new Array(8).fill([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
      numTran: new Array(8).fill(""),
      rightNum: 198,
      rightArr: new Array(8).fill([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
      numRightTran: new Array(8).fill(""),
      accidentCountByArea: [],
      mapLoading: true,
    };
  },
  components: {
    AccidentTime,
    AccidentType,
    AccidentVehicle,
    RoadTypeAccident,
    // WeatherAccident,
    AccidentForm,
    IllegalToAccident,
    Map,
    DataDisplay,
  },
  watch: {
    year() {
      this.getWeatherData();
    },
    city() {
      this.getWeatherData();
    },
  },
  mounted() {
    this.getWeatherData();
    this.fetchMangeAccidentCountByArea()
  },
  methods: {
    getWeatherData() {
      this.$axios.post(api.manageAccident("rightTop")).then((res) => {
        this.weatherData = {
          shine: 0,
          cloudy: 0,
          rain: 0
        }
        const data = res.data.filter(d=>this.city=='220000'?d.time==this.year:d.time==this.year&&d.city==this.city);
        data.forEach(d => {
          if (d.weatherType == "晴") {
            this.weatherData.shine += d.count;
          }
          if (d.weatherType == "阴") {
            this.weatherData.cloudy += d.count;
          }
          if (d.weatherType == "雨") {
            this.weatherData.rain += d.count;
          }
        });
      })
    },
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
    fetchMangeAccidentCountByArea(){
      this.$axios.post(api.getMangeAccidentCountByArea()).then(res=>{
        this.accidentCountByArea = res.data.map(d=>({code:d.CITY,total:d.COUNT,month:d.ADDCOUNT?d.ADDCOUNT:0}))
        this.mapLoading = false
        const distinctData = this.accidentCountByArea.filter(d=>!d.code.endsWith('00'))
        this.num = distinctData.map(d=>d.total).reduce((d1,d2)=>d1+d2,0)
        this.num = this.dealNum(this.num);
        setTimeout(() => {
          this.timer(this.num, this.numTran);
        }, 1000);
        this.rightNum = distinctData.map(d=>d.month).reduce((d1,d2)=>d1+d2,0)
        this.rightNum = this.dealNum(this.rightNum);
        setTimeout(() => {
          this.timer(this.rightNum, this.numRightTran);
        }, 1000);
      })
    }
  },
};
</script>
<style lang="less" scoped>
@import "~@/assets/style/car.less";
</style>