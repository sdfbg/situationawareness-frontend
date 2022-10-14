<template>
  <v-chart
    :option="option"
    :autoresize="true"
    :loading-options="echartsLoadingOptions"
    :loading="loading"
    class="chart"
  />
</template>
<script>
import VChart from "vue-echarts";
import api from "@/api";
import moment from "moment";
import cities from '@/common/city';
export default {
  name: "IllegalCheckNum",
  components: { VChart },
  inject: ["echartsLoadingOptions"],
  props: ["year"],
  data() {
    return {
      loading:true,
      allData: [],
    };
  },
  computed: {
    yearData(){
      return this.allData.filter(d=>d.year==this.year)
    },
    cityData(){
      return cities.map(({name,code})=>{
        const value = this.yearData.filter(d=>d.code==code).map(d=>d.count).reduce((d1,d2)=>d1+d2,0)
        return {name,value}
      })
    },
    option(){
      if(this.loading) return {}
      const cityNames = this.cityData.map(d=>d.name)
      const  batData = this.cityData.map(d=>d.value)
      let barWidth = 20;
      let color1 = {
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        type: "linear",
        global: false,
        colorStops: [
          {
            //第一节下面
            offset: 0,
            color: "rgba(43,164,184,1)",
          },
          {
            offset: 1,
            color: "rgba(43,164,184,.5)",
          },
        ],
      };
      return {
        legend: {
          data: ["违法数量"],
          icon: "rect",
          top: 5,
          x: "center",
          textStyle: {
            color: "#fff",
            fontWeight: "normal",
            fontSize: 12,
          },
        },
        //提示框
        tooltip: {
          show: true,
        },
        grid: {
          top: "20%",
          left: "2%",
          bottom: "0%",
          right: "2%",
          containLabel: true,
        },
        animation: false,
        xAxis: [
          {
            type: "category",
            axisTick: {
              show: false,
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
              textStyle: {
                color: "#fff",
              },
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: "#ccc",
                type: "dashed",
                dashOffset: 5,
              },
            },
            data: cityNames,
          },
          {
            type: "category",
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            splitArea: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            data: cityNames,
          },
        ],
        yAxis: [
          {
            show: true,
            type: "value",
            axisLine: {
              show: true,
              lineStyle: {
                color: "#DBDAD9",
                type: "dashed",
                dashOffset: 5,
              },
            },
            axisLabel: {
              textStyle: {
                color: "#fff",
              },
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgba(255,255,255,.3)",
                type: "dashed",
                dashOffset: 5,
              },
            },
          },
        ],
        series: [
          {
            name: "",
            type: "pictorialBar",
            symbolSize: [barWidth, 10],
            symbolOffset: [0, -5],
            symbolPosition: "end",
            z: 15,
            color: "#5EE7FE",
            zlevel: 2,
            data: batData,
          },
          //   {
          //     name: "",
          //     type: "pictorialBar",
          //     symbolSize: [barWidth, 10],
          //     symbolOffset: ["81%", -5],
          //     symbolPosition: "end",
          //     z: 15,
          //     color: "#2D8904",
          //     zlevel: 2,
          //     data: newchartValue2,
          //   },

          {
            name: "违法数量",
            type: "bar",
            barGap: "60%",
            barWidth: barWidth,
            itemStyle: {
              //
              // color: '',
              color: color1,
              borderColor: color1,
              borderWidth: 1,
              borderType: "solid",
            },
            label: {
              show: true,
              formatter: "{c}",
              position: "top",
              color: "#5EE7FE",
              fontSize: 12,
              textAlign: "center",
            },
            zlevel: 2,
            data: batData,
          },
          {
            name: "",
            type: "pictorialBar",
            symbolSize: [barWidth, 10],
            symbolOffset: ["0", 5],
            z: 12,
            color: "#2871AA",

            data: [
              {
                name: "",
                value: "100",
              },
              {
                name: "",
                value: "100",
              },
              {
                name: "",
                value: "100",
              },
              {
                name: "",
                value: "100",
              },
              {
                name: "",
                value: "100",
              },
              {
                name: "",
                value: "100",
              },
              {
                name: "",
                value: "100",
              },
              {
                name: "",
                value: "100",
              },
              {
                name: "",
                value: "100",
              },
            ],
          },
          //   {
          //     name: "今日上报情况",
          //     type: "bar",
          //     barGap: "60%",
          //     barWidth: barWidth,
          //     itemStyle: {
          //       // color: 'rgba(255,164,41,.16)',
          //       color: color2,
          //       borderColor: color2,
          //       borderWidth: 1,
          //       borderType: "solid",
          //     },
          //     label: {
          //       show: true,
          //       formatter: "{c}",
          //       position: "top",
          //       color: "rgba(255,228,59,1)",
          //       fontSize: 12,
          //       textAlign: "center",
          //     },
          //     zlevel: 2,
          //     data: newchartValue2,
          //   },
        ],
      }
    
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.$axios.post(api.manageIllegal("midDown")).then((res) => {
        this.allData = res.data.map(d=>({code:d.CITY,count:d.COUNT,year: moment(d.TIME,"YYYYMM").year()}))
        this.loading = false
      });
    },
    init() {},
  },
};
</script>
<style scoped>
  .chart {
    height: calc(100% - 0.1rem);
    width: 100%
  }
</style>