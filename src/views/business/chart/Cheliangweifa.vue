<template>
  <v-chart :option="option" :autoresize="true" :loading-options="echartsLoadingOptions" :loading="loading" class="chart"/>
</template>
<script>
import VChart from "vue-echarts";
import * as echarts from "echarts";
import api from "@/api";
import cities from "@/common/city";
import carTypes from "@/common/carType";
export default {
  name: "Cheliangweifa",
  components: { VChart },
  inject: ["echartsLoadingOptions"],
  data() {
    return {
      cities,
      carTypes,
      echartData: [],
      loading: true,
    }
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.$axios.post(api.getIllegalCar()).then((res) => {
        this.echartData = res.data;
        this.loading = false;
      })
    },
  },
  computed: {
    option() {
      if(this.loading) return {};
      let data = this.carTypes
        .map(car => ({
          name: car.name,
          value: this.cities
            .map(city => {
              const d = this.echartData.filter(data => data.YYLX == car.value).find(data => data.CITY == city.code) 
              return d ? d.COUNT : 0
            })
        }));
      return {
        title: {
          text: "违法总数：" + 1877,
          left: "100px",
          textStyle: {
            color: "#fff",
            fontSize: 14,
          },
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: data.map(d => d.name),
          orient: "horizontal", // 水平
          icon: "circle",
          x: "center",
          // 宽度
          itemWidth: 10, // 图形宽度。
          itemHeight: 10, // 图形高度。
          borderWidth: 0,
          textStyle: {
            fontSize: "12px",
            color: "#fff",
          },
        },
        grid: {
          top: "12%",
          left: "4%",
          right: "4%",
          bottom: "10%",
          //   containLabel: true
        },
        xAxis: [
          {
            type: "category",
            axisLine: {
              show: true,
              lineStyle: {
                color: "#56a4cd",
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
              show: false,
            },
            axisTick: {
              //y轴刻度线
              show: false,
            },
            boundaryGap: false,
            data: cities.map(d => d.name),
          },
        ],
        yAxis: [
          {
            type: "value",
            min: 0,
            // max: 140,
            splitLine: {
              show: false,
              lineStyle: {
                color: "rgba(255,255,255,0.1)",
              },
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#56a4cd",
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
            name: "旅游客运",
            type: "line",
            smooth: true, //是否平滑
            showAllSymbol: true,
            symbol: "circle",
            symbolSize: 10,
            lineStyle: {
              normal: {
                color: "#00b3f4",
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
              color: "#00b3f4",
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
                      color: "rgba(0,179,244,0.3)",
                    },
                    {
                      offset: 1,
                      color: "rgba(0,179,244,0)",
                    },
                  ],
                  false
                ),
                shadowColor: "rgba(0,179,244, 0.9)",
                shadowBlur: 20,
              },
            },
            data: data[0].value,
          },
          {
            name: "公路客运",
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
            data: data[1].value,
          },
          {
            name: "危险品运输",
            type: "line",
            smooth: true, //是否平滑
            showAllSymbol: true,
            // symbol: 'image://./static/images/guang-circle.png',
            symbol: "circle",
            symbolSize: 10,
            lineStyle: {
              normal: {
                color: "#c31818",
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
                color: "#c31818",
              },
            },
            itemStyle: {
              color: "#c31818",
              borderColor: "#fff",
              borderWidth: 1,
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
                      color: "rgba(255,222,50,0.3)",
                    },
                    {
                      offset: 1,
                      color: "rgba(255,222,50,0.3)",
                    },
                  ],
                  false
                ),
                shadowColor: "rgba(255,222,50,0.3)",
                shadowBlur: 20,
              },
            },
            data: data[2].value,
          },
          {
            name: "货运",
            type: "line",
            smooth: true, //是否平滑
            showAllSymbol: true,
            // symbol: 'image://./static/images/guang-circle.png',
            symbol: "circle",
            symbolSize: 10,
            lineStyle: {
              normal: {
                color: "#ffde32",
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
                color: "#ffde32",
              },
            },
            itemStyle: {
              color: "#ffde32",
              borderColor: "#fff",
              borderWidth: 1,
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
                      color: "rgba(255,222,50,0.3)",
                    },
                    {
                      offset: 1,
                      color: "rgba(255,222,50,0.3)",
                    },
                  ],
                  false
                ),
                shadowColor: "rgba(255,222,50,0.3)",
                shadowBlur: 20,
              },
            },
            data: data[3].value,
          },
          {
            name: "校车",
            type: "line",
            smooth: true, //是否平滑
            showAllSymbol: true,
            // symbol: 'image://./static/images/guang-circle.png',
            symbol: "circle",
            symbolSize: 10,
            lineStyle: {
              normal: {
                color: "#dd7e6b",
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
                color: "#dd7e6b",
              },
            },
            itemStyle: {
              color: "#dd7e6b",
              borderColor: "#fff",
              borderWidth: 1,
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
                      color: "rgba(255,222,50,0.3)",
                    },
                    {
                      offset: 1,
                      color: "rgba(255,222,50,0.3)",
                    },
                  ],
                  false
                ),
                shadowColor: "rgba(255,222,50,0.3)",
                shadowBlur: 20,
              },
            },
            data: data[4].value,
          },
        ],
      };
    },
  },
};
</script>
<style scoped lang='less'>
.chart {
  height: calc(100% - 0.1rem);
  width: 100%
}
</style>