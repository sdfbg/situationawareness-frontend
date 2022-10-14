<template>
  <div class="char_box manage_box">
    <h2>
      <span>违法发生时间统计</span>
    </h2>
    <div class="box_tab">
      <a-radio-group v-model="duration" button-style="solid">
        <a-radio-button :value="0"> 季度 </a-radio-button>
        <a-radio-button :value="1"> 月度 </a-radio-button>
      </a-radio-group>
    </div>
    <v-chart
      :option="option"
      :autoresize="true"
      :loading-options="echartsLoadingOptions"
      :loading="loading"
      class="chart"
    />
  </div>
</template>
<script>
import VChart from "vue-echarts";
import api from "@/api";
import cities from "@/common/city";
import * as echarts from "echarts";
import moment from "moment";
const toChineseNumber = (num) => {
  return ["一","二","三","四"][num]
}
export default {
  name: "IllegalHappenTime",
  components: { VChart },
  inject: ["echartsLoadingOptions"],
  props: ["year","code"],
  data(){
    const months = Array.from({length:moment().month()+25}).map((v,i)=>moment().subtract(i,"M")).reverse()
    return {
      duration: 0,
      loading:true,
      months,
      allData: [],
    }
  },
  computed: {
    currentMonths(){
      return this.months.filter(time=>time.year()==this.year)
    },
    codeData(){
      if(this.code=='220000'){
        return this.currentMonths.map(month=>{
          const count =  this.yearData.filter(({time})=>time.month()==month.month()).map(d=>d.count).reduce((d1,d2)=>d1+d2,0)
          return {count, time: month}
        })
      } 
      return this.currentMonths.map(month=>{
        const d =  this.yearData.find(({time,code})=>time.month()==month.month()&&code==this.code)
        const count = d?d.count:0
        return {count, time: month}
      })
    },
    yearData(){
      return this.allData.filter(({time})=>time.year()==this.year)
    },
    seasonData(){
      return Array.from({length: Math.ceil(this.codeData.length/3)}).map((v,i)=>{
        const thisSeasonDatas = this.codeData.slice(i*3, Math.min((i+1)*3,this.codeData.length))
        const count = thisSeasonDatas.map(d=>d.count).reduce((d1,d2)=>d1+d2)
        const time = thisSeasonDatas[0].time
        return {count,time}
      })
    },
    option(){
      if (this.loading) return {};
      let data
      if(this.duration==1){
        data = this.codeData.map(d=>({count:d.count,time:d.time.format('M月')}))
      }else {
        data = this.seasonData.map(d=>({count:d.count,time:`第${toChineseNumber(parseInt(d.time.format("Q"))-1)}季度`}))
      }
      const xAxisData = data.map(d=>d.time)
      const lineData = data.map(d=>d.count)
      return {
        tooltip: {
          trigger: "axis",
        },
        legend: {
          // data: ['示范', '一级', '二级'],
          orient: "horizontal", // 水平
          icon: "circle",
          top: 10,
          x: "center",
          // 宽度
          itemWidth: 10, // 图形宽度。
          itemHeight: 10, // 图形高度。
          borderWidth: 0,
          textStyle: {
            fontSize: "14px",
            color: "#fff",
          },
        },
        grid: {
          top: "20%",
          left: "10%",
          right: "5%",
          bottom: "12%",
          // containLabel: true
        },
        xAxis: [
          {
            type: "category",
            axisLine: {
              show: true,
              lineStyle: {
                color: "#DBDAD9",
                type: "dashed",
                dashOffset: 5,
              },
            },
            splitArea: {
              // show: false,
              color: "#f00",
              lineStyle: {
                color: "#f00",
              },
            },
            axisLabel: {
              color: "#fff",
              interval: 0,
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgba(255,255,255,.3)",
                type: "dashed",
                dashOffset: 5,
              },
            },
            axisTick: {
              //y轴刻度线
              show: false,
            },
            boundaryGap: false,
            data: xAxisData,
          },
        ],

        yAxis: [
          {
            type: "value",
            min: 0,
            // max: 140,
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgba(255,255,255,.3)",
                type: "dashed",
                dashOffset: 5,
              },
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#DBDAD9",
                type: "dashed",
                dashOffset: 5,
              },
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#fff",
              },
            },
            axisTick: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: "",
            type: "line",
            smooth: true, //是否平滑
            showAllSymbol: true,
            symbol: "circle",
            symbolSize: 10,
            lineStyle: {
              normal: {
                color: "#FFF100",
                shadowColor: "rgba(0, 0, 0, .3)",
                shadowBlur: 0,
                shadowOffsetY: 5,
                shadowOffsetX: 5,
              },
            },
            label: {
              show: false,
              position: "top",
              textStyle: {
                color: "#00b3f4",
              },
            },
            itemStyle: {
              color: "#FFF100",
              borderColor: "#fff",
              borderWidth: 3,
              shadowColor: "rgba(0, 0, 0, .3)",
              shadowBlur: 0,
              shadowOffsetY: 2,
              shadowOffsetX: 2,
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(255,241,0,1)",
                    },
                    {
                      offset: 1,
                      color: "rgba(255,241,0,0)",
                    },
                  ],
                  false
                ),
                shadowColor: "rgba(0,179,244, 0.9)",
                shadowBlur: 20,
              },
            },
            data: lineData,
          },
        ],
      }
    },
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData(){
      this.$axios.post(api.manageIllegal('leftTop')).then(res=>{
        this.allData = res.data.filter(d=>cities.some(c=>c.code==d.city)).map(d=>({code:d.city,count:d.count,time:moment(d.time,'YYYYMM')}))
        this.loading = false
      })
    }
  },
};
</script>
<style lang="less" scoped>
@import "~@/assets/style/car.less";
</style>
<style scoped>
  .chart {
    height: calc(100% - 0.1rem);
    width: 100%
  }
</style>