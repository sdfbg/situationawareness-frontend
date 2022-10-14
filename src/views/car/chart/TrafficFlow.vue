<template>
  <div id="trafficFlow" style="height: 100%; width: 100%"></div>
</template>
<script>
import * as echarts from "echarts";
import api from "./../../../api/index";
export default {
  name: "TrafficFlow",
  data() {
    return {
      echart: undefined,
      allData: [],
      city: [
        "长春",
        "吉林",
        "四平",
        "辽源",
        "通化",
        "白山",
        "松原",
        "白城",
        "延边州",
      ],
      data1: [702, 705, 732, 681, 698, 714, 352, 453, 541, 678, 908, 231, 678],
      data2: [281, 398, 214, 179, 289, 356, 567, 890, 678, 709, 453, 563, 342],
      data3: [181, 298, 114, 789, 189, 256, 998, 807, 970, 567, 765, 876, 456],
      data4: [841, 758, 614, 779, 539, 416, 452, 567, 986, 789, 562, 675, 865],
    };
  },
  mounted() {
    this.echart = this.$echarts.init(document.getElementById("trafficFlow"));
    this.echart.showLoading({
      text: "正在加载...",
      textColor: "#fff",
      color: "#fff",
      maskColor: "transparent",
      X: "center",
      y: "center",
      effect: "spin"
    });
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.$axios.post(api.getAccidentCountByArea()).then((res) => {
        this.allData = res.data;
        this.init();
      });
    },
    init() {
      let type = ["公路客运", "旅游客运", "危险品运输", "校车", "货运"];
      console.log(type);
      let data = type.map(t => this.allData.filter(d => d.CLMS == t)).map(d => d.map(e => e.COUNT));
      this.echart.setOption({
        title: {
          text: "车辆总数：" + 602154,
          textStyle: {
            color: "#fff",
            fontSize: 14,
          },
          x: "center",
          y: "5",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          orient: "vertical",
          align: "left",
          icon: "circle",
          top: 0,
          x: "right",
          itemWidth: 10,
          itemHeight: 10,
          borderWidth: 0,
          textStyle: {
            fontSize: 12,
            color: "#fff",
          },
        },
        grid: {
          top: "10%",
          left: "10%",
          right: "5%",
          bottom: "8%",
          // containLabel: true
        },
        dataZoom: [
          {
            type: "inside",
            show: true,
            start: 0,
            end: 60,
            xAxisIndex: [0],
            top: "10%",
            width: "10",
            bottom: "10%",
            height: "80%",
          },
        ],
        xAxis: [
          {
            name:'',
            nameTextStyle: {
                color: '#65d5ff',
              },
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
              interval: 0
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              //y轴刻度线
              show: false,
            },
            boundaryGap: false,
            data: this.city,
          },
        ],
        yAxis: [
          {
            type: "value",
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
              formatter:(value)=>{
                return value/1000 + "千"
              }
            },
            axisTick: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: "公路客运",
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
            data: data[0],
          },
          {
            name: "旅游客运",
            type: "line",
            smooth: true, //是否平滑
            showAllSymbol: true,
            // symbol: 'image://./static/images/guang-circle.png',
            symbol: "circle",
            symbolSize: 10,
            lineStyle: {
              normal: {
                color: "#EE9280",
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
                color: "#EE9280",
              },
            },

            itemStyle: {
              color: "#EE9280",
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
                      color: "rgba(238,146,128,0.3)",
                    },
                    {
                      offset: 1,
                      color: "rgba(238,146,128,0.3)",
                    },
                  ],
                  false
                ),
                shadowColor: "rgba(238,146,128,0.3)",
                shadowBlur: 20,
              },
            },
            data: data[1],
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
            data: data[2],
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
                color: "#4caf50",
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
                color: "#4caf50",
              },
            },
            itemStyle: {
              color: "#4caf50",
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
            data: data[3],
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
                      color: "rgba(0,202,149, 0.3)",
                    },
                    {
                      offset: 1,
                      color: "rgba(0,202,149, 0.3)",
                    },
                  ],
                  false
                ),
                shadowColor: "rgba(0,202,149, 0.3)",
                shadowBlur: 20,
              },
            },
            data: data[4],
          },
        ],
      });
      this.echart.hideLoading();
    },
  },
};
</script>