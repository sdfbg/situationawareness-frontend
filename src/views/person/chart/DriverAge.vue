<template>
  <div id="driverAge" style="height: calc(100% - 0.2rem); width: 100%"></div>
</template>
<script>
import api from "../../../api";
import * as echarts from "echarts";
export default {
  name: "DriverAge",
  data() {
    return {
      img1: require("../../../assets/images/top1.png"),
      img2: require("../../../assets/images/top2.png"),
      img3: require("../../../assets/images/top3.png"),
      img: require("../../../assets/images/chart_num.png"),
      echartData: [],
    };
  },
  mounted() {
    this.getRedWarningKeyCar();
    this.init();
  },
  methods: {
    getRedWarningKeyCar() {
      this.$axios.post(api.getPersonLeftDown()).then((res) => {
        let data = res.data.data;
        data.forEach((element) => {
          this.echartData.push({
            name: element.name + " " + element.personId,
            value: element.integralInt,
          });
        });
        this.init();
      });
    },
    init() {
      let driverAgeEcharts = this.$echarts.init(
        document.getElementById("driverAge")
      );
      let name = [];
      let value = [];
      this.echartData.forEach((element) => {
        name.push(element.name);
        value.push(element.value);
      });
      let chartName = name;
      let chartData = value;
      const colorList = {
        0: ["rgba(242,68,92,.1)", "#890014", "#692D4A", "#D20830"],
        1: ["rgba(242,109,21,.1)", "#B94D05", "#644741", "#EE5D03"],
        2: ["rgba(197,197,10,.1)", "#A6A603", "#7C832A", "#D5D507"],
        3: ["rgba(29,146,212,.1)", "rgba(29,146,212,1)", "#175E92", "#3AB1FF"],
      };
      driverAgeEcharts.setOption({
        grid: {
          left: "2%",
          right: "10%",
          bottom: "0",
          top: "0",
          containLabel: true,
        },
        xAxis: [
          {
            show: false,
          },
          {
            show: false,
          },
        ],
        yAxis: {
          type: "category",
          inverse: true,
          show: false,
        },
        dataZoom: [
          {
            type: "inside",
            show: true,
            yAxisIndex: [0],
            start: 0,
            end: 40,
            orient: "vertical",
            zoomLock: true,
          },
        ],
        series: [
          {
            name: "",
            type: "pictorialBar",
            symbolSize: [10, 20],
            symbolOffset: [5, 5],
            symbolPosition: "end",
            z: 12,
            label: {
              color: "#fff",
              show: true,
              position: "right",
              formatter: "{c}",
            },
            data: chartData,
            itemStyle: {
              opacity: 3.7,
              color: (parms) => {
                if (parms.dataIndex == 0) {
                  return colorList[0][3];
                } else if (parms.dataIndex == 1) {
                  return colorList[1][3];
                } else if (parms.dataIndex == 2) {
                  return colorList[2][3];
                } else {
                  return colorList[3][3];
                }
              },
            },
          },
          {
            name: "",
            type: "pictorialBar",
            symbolSize: [10, 20],
            symbolOffset: [-5, 5],
            z: 12,
            data: chartData,
            itemStyle: {
              opacity: 3.7,
              color: (parms) => {
                if (parms.dataIndex == 0) {
                  return colorList[0][2];
                } else if (parms.dataIndex == 1) {
                  return colorList[1][2];
                } else if (parms.dataIndex == 2) {
                  return colorList[2][2];
                } else {
                  return colorList[3][2];
                }
              },
            },
            label: {
              color: "#fff",
            },
          },
          {
            type: "bar",
            itemStyle: {
              //   "normal": {
              //     "opacity": 3.7,
              //     },

              color: (parms) => {
                if (parms.dataIndex == 0) {
                  return new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    {
                      offset: 0,
                      color: colorList[0][0],
                    },
                    {
                      offset: 1,
                      color: colorList[0][1],
                    },
                  ]);
                } else if (parms.dataIndex == 1) {
                  return new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    {
                      offset: 0,
                      color: colorList[1][0],
                    },
                    {
                      offset: 1,
                      color: colorList[1][1],
                    },
                  ]);
                } else if (parms.dataIndex == 2) {
                  return new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    {
                      offset: 0,
                      color: colorList[2][0],
                    },
                    {
                      offset: 1,
                      color: colorList[2][1],
                    },
                  ]);
                } else {
                  return new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    {
                      offset: 0,
                      color: colorList[3][0],
                    },
                    {
                      offset: 1,
                      color: colorList[3][1],
                    },
                  ]);
                }
                /*  */
              },
            },
            barWidth: "20",
            data: chartData,
          },
          //年份
          {
            show: true,
            type: "bar",
            xAxisIndex: 1, //代表使用第二个X轴刻度
            barGap: "-100%",
            barWidth: "10",
            itemStyle: {
              barBorderRadius: 200,
              color: "transparent",
            },
            label: {
              normal: {
                show: true,
                position: [0, "-20"],
                textStyle: {
                  fontSize: 10,
                  color: "#fff",
                },
                formatter: function (data) {
                  var num = "";
                  var str = "";
                  num = data.dataIndex+1;

                  if (data.dataIndex === 0) {
                    str =
                      "{no1|" +
                      "} {num1|" +
                      num +
                      "} {title1| " +
                      chartName[0] +
                      "}";
                  } else if (data.dataIndex === 1) {
                    str =
                      "{no2|" +
                      "} {num2|" +
                      num +
                      "} {title2| " +
                      chartName[1] +
                      "}";
                  } else if (data.dataIndex === 2) {
                    str =
                      "{no3|" +
                      "} {num3|" +
                      num +
                      "} {title3| " +
                      chartName[2] +
                      "}";
                  } else {
                    str =
                      " {num|" +
                      num +
                      "} {title| " +
                      chartName[data.dataIndex] +
                      "}";
                  }
                  return str;
                  // return chartName[data.dataIndex];
                },
                rich: {
                  num: {
                    color: "#fff",
                    backgroundColor: {
                      image: this.img,
                    },
                    width: 10,
                    height: 10,
                    fontSize: 12,
                    padding: [6, 5, 3, 5],
                    align: "center",
                  },
                  num1: {
                    color: "#fff",
                    backgroundColor: {
                      image: this.img1,
                    },
                    width: 10,
                    height: 10,
                    fontSize: 12,
                    padding: [7, 5, 3, 5],
                    align: "center",
                  },
                  num2: {
                    color: "#fff",
                    backgroundColor: {
                      image: this.img2,
                    },
                    width: 10,
                    height: 10,
                    fontSize: 12,
                    padding: [7, 5, 3, 5],
                    align: "center",
                  },
                  num3: {
                    color: "#fff",
                    backgroundColor: {
                      image: this.img3,
                    },
                    width: 10,
                    height: 10,
                    fontSize: 12,
                    padding: [7, 5, 3, 5],
                    align: "center",
                  },
                },
              },
            },
            data: chartData,
          },
        ],
      });
    },
  },
};
</script>