<template>
  <v-chart :option="option" :autoresize="true" :loading-options="echartsLoadingOptions" :loading="loading" class="chart"/>
</template>
<script>
import VChart from "vue-echarts";
import * as echarts from "echarts";
import api from "@/api";
import moment from "moment";
import cities from "@/common/city";
export default {
  name: "DriverAccidentRate",
  components: { VChart },
  inject: ["echartsLoadingOptions"],
  data() {
    return {
      cities,
      allData: [],
      loading: true
    }
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.$axios.post(api.getAccidentByArea3Year()).then((res) => {
        this.allData = res.data;
        this.loading = false;
      });
    },
  },
  computed: {
    option() {
      if(this.loading) return {};
      const year = moment().year();
      const late3Year = [year, year - 1, year - 2];
      let data = late3Year.map(y => this.cities.map(c => this.allData.find(d => d.TIME == y && d.CITY == c.code).COUNT));
      let dataSum = data.reduce((total, arr) => {
        return total + arr.reduce((total, currentValue) => { 
          return total + currentValue;
        }, 0)
      }, 0);
      return {
        title: {
          text: "今年事故总数：" + dataSum,
          textStyle: {
            color: "#fff",
            fontSize: 14,
          },
          x: "left",
          y: "5",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          orient: "horizontal", // 水平
          align: "left",
          icon: "circle",
          top: 5,
          x: "right",
          // 宽度
          itemWidth: 10, // 图形宽度。
          itemHeight: 10, // 图形高度。
          borderWidth: 0,
          textStyle: {
            fontSize: 14,
            color: "#fff",
          },
        },
        grid: {
          top: "20%",
          left: "10%",
          right: "5%",
          bottom: "8%",
          // containLabel: true
        },
        dataZoom: [
          {
            show: true,
            type: "inside",
            start: 0,
            end: 60,
            xAxisIndex: [0],
          },
        ],
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
            data: this.cities.map(c => c.name),
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
            name: "2020",
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
            data: data[0],
          },
          {
            name: "2021",
            type: "line",
            smooth: true, //是否平滑
            showAllSymbol: true,
            // symbol: 'image://./static/images/guang-circle.png',
            symbol: "circle",
            symbolSize: 10,
            lineStyle: {
              normal: {
                color: "#00ca95",
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
                color: "#00ca95",
              },
            },
            itemStyle: {
              color: "#00ca95",
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
                      color: "rgba(0,202,149,0.3)",
                    },
                    {
                      offset: 1,
                      color: "rgba(0,202,149,0)",
                    },
                  ],
                  false
                ),
                shadowColor: "rgba(0,202,149, 0.9)",
                shadowBlur: 20,
              },
            },
            data: data[1],
          },
          {
            name: "2022",
            type: "line",
            smooth: true, //是否平滑
            showAllSymbol: true,
            // symbol: 'image://./static/images/guang-circle.png',
            symbol: "circle",
            symbolSize: 10,
            lineStyle: {
              normal: {
                color: "#0797DB",
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
                color: "#0797DB",
              },
            },
            itemStyle: {
              color: "#0797DB",
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
                      color: "rgba(7,151,219,0.3)",
                    },
                    {
                      offset: 1,
                      color: "rgba(5,95,138,0)",
                    },
                  ],
                  false
                ),
                shadowColor: "rgba(0,02,149, 0.9)",
                shadowBlur: 20,
              },
            },
            data: data[2],
          },
        ],
      };
    },
  },
};
</script>