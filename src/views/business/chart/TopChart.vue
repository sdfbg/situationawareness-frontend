<template>
  <div
    id="AccidentAnalysis"
    style="height: calc(100% - 0rem); width: 100%;"
  ></div>
</template>
<script>
import * as echarts from "echarts";
import api from "../../../api";
export default {
  name: "AccidentAnalysis",
  data() {
    return {
      img1: require("../../../assets/images/top1.png"),
      img2: require("../../../assets/images/top2.png"),
      img3: require("../../../assets/images/top3.png"),
      img: require("../../../assets/images/chart_num.png"),
      echartsData: [],
    };
  },
  mounted() {
    this.getEchartsData();
  },
  methods: {
    getEchartsData() {
      this.$axios.post(api.getCompanyLeftDown()).then((res) => {
        let data = res.data.data.series[0].data;
        data.forEach((element) => {
          this.echartsData.push({ name: element.name, value: element.value });
        });
        this.init();
      });
    },
    init() {
      let name = [],
        value = [];
      this.echartsData.forEach((element) => {
        element.name = element.name.substring(2);
        name.push(element.name);
        value.push(element.value);
      });
      const colorList = {
        0: ["rgba(242,68,92,.1)", "#890014", "#692D4A", "#D20830"],
        1: ["rgba(242,109,21,.1)", "#B94D05", "#644741", "#EE5D03"],
        2: ["rgba(197,197,10,.1)", "#A6A603", "#7C832A", "#D5D507"],
        3: ["rgba(29,146,212,.1)", "rgba(29,146,212,1)", "#175E92", "#3AB1FF"],
      };
      const highIncidence = this.$echarts.init(
        document.getElementById("AccidentAnalysis")
      );
      highIncidence.setOption({
        grid: {
          left: "0",
          right: "0",
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
            realtime: true,
            start: 0,
            end: 40,
            xAxisIndex: "horizontal",
            yAxisIndex: [0],
            bottom: "12",
            left: "40",
            height: 5,
            borderColor: "rgba(0,0,0,0)",
            textStyle: {
              color: "#05D5FF",
            },
            showDataShadow: true,
          },
        ],
        series: [
          {
            name: "",
            type: "pictorialBar",
            symbolSize: [6, 10],
            symbolOffset: [5, 0],
            symbolPosition: "end",
            z: 12,
            label: {
              color: "#fff",
              show: true,
              position: "right",
              formatter: "{c}",
            },
            data: value,
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
            symbolSize: [6, 10],
            symbolOffset: [-5, 0],
            z: 12,
            data: value,
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
            barWidth: "10",
            data: value,
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
                  num = data.dataIndex + 1;

                  if (data.dataIndex === 0) {
                    str =
                      "{no1|" +
                      "} {num1|" +
                      num +
                      "} {title1| " +
                      name[0] +
                      "}";
                  } else if (data.dataIndex === 1) {
                    str =
                      "{no2|" +
                      "} {num2|" +
                      num +
                      "} {title2| " +
                      name[1] +
                      "}";
                  } else if (data.dataIndex === 2) {
                    str =
                      "{no3|" +
                      "} {num3|" +
                      num +
                      "} {title3| " +
                      name[2] +
                      "}";
                  } else {
                    str =
                      " {num|" +
                      num +
                      "} {title| " +
                      name[data.dataIndex] +
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
            data: value,
          },
        ],
      });
    },
  },
};
</script>
<style scoped lang='less'>
.listPDiv {
  padding: 0.05rem 0.1rem;
  height: calc(100% - 0.35rem);
  margin-top: 0.05rem;
  overflow: auto;
  .listDiv {
    padding: 0.05rem 0.1rem;
    text-align: left;
    .sortDiv {
      color: #fff;
      line-height: 0.22rem;
      display: inline-block;
      height: 0.25rem;
      div {
        width: 0.22rem;
        height: 0.22rem;
        display: inline-block;
        vertical-align: top;
        text-align: center;
        &.sortDiv0 {
          background: url(~@/assets/images/top1.png) no-repeat;
          background-size: 100% 100%;
        }
        &.sortDiv1 {
          background: url(~@/assets/images/top2.png) no-repeat;
          background-size: 100% 100%;
        }
        &.sortDiv2 {
          background: url(~@/assets/images/top3.png) no-repeat;
          background-size: 100% 100%;
        }
      }
    }
    .chartDiv {
      color: #fff;
      line-height: 0.15rem;
      height: 0.15rem;
      div {
        display: inline-block;
        background: #2d99ff;
        height: 0.15rem;
        margin-right: 0.05rem;
        border-radius: 0.1rem;
        &.colorDiv0 {
          background: #ff0000;
        }
        &.colorDiv1 {
          background: #ff8200;
        }
        &.colorDiv2 {
          background: #ffe600;
        }
      }
      span {
        vertical-align: top;
      }
    }
  }
}
</style>