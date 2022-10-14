<template>
  <div
    id="roadHiddenRisk"
    style="height: calc(100% - 0.3rem); width: 100%"
  ></div>
</template>
<script>
import api from "./../../../api/index";
export default {
  name: "RoadHiddenRisk",
  data() {
    return {
      yData: [],
      data: [],
      img1: require("../../../assets/images/top1.png"),
      img2: require("../../../assets/images/top2.png"),
      img3: require("../../../assets/images/top3.png"),
      img: require("../../../assets/images/chart_num.png"),
    };
  },
  props: {},
  watch: {},
  mounted() {
    this.init();
  },
  methods: {
    getList() {
      let data = {
        //传参
      };
      this.$axios.post(api.getRoadMidDown(), data).then((res) => {
        res.vehicleTop10.forEach((element) => {
          this.yData.push(element.ENTRY_TEXT), this.data.push(element.STATNUM);
        });
        if (this.data.length == res.vehicleTop10.length) {
          this.init();
        }
      });
    },
    init() {
      let trafficViolation = this.$echarts.init(
        document.getElementById("roadHiddenRisk")
      );
      this.yData = [
        "饶盖线",
        "珲乌线珲阿线",
        "S001长春经济圈",
        "长石公路",
        "舒陶线",
        "其太线",
        "九王线",
        "长吉北线",
        // "延边市交警支队",
        // "延边市交警支队",
      ];
      this.data = [
        "2000",
        "1800",
        "1600",
        "1000",
        "800",
        "600",
        "400",
        "300",
        // "300",
        // "300",
      ];
      trafficViolation.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "none",
          },
          formatter: function (params) {
            return params[0].name + " : " + params[0].value;
          },
        },
        xAxis: {
          show: false,
          type: "value",
        },
        grid: {
          right: "22%",
          left: "20%",
          top: "0%",
          bottom: "0%",
        },
        yAxis: [
          {
            type: "category",
            inverse: true,
            offset: 110,
            axisLabel: {
              show: true,
              align: "left",
              textStyle: {
                color: "#fff",
                fontSize: "12",
              },
              formatter: function (value, index) {
                var num = "";
                var str = "";
                num = index + 1;
                if (index === 0) {
                  str =
                    "{no1|" + "} {num1|" + num + "} {title1| " + value + "}";
                } else if (index === 1) {
                  str =
                    "{no2|" + "} {num2|" + num + "} {title2| " + value + "}";
                } else if (index === 2) {
                  str =
                    "{no3|" + "} {num3|" + num + "} {title3| " + value + "}";
                } else {
                  str = " {num|" + num + "} {title| " + value + "}";
                }
                return str;
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
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            data: this.yData,
          },
          {
            type: "category",
            inverse: true,
            offset: 0,
            axisTick: "none",
            axisLine: "none",
            show: true,
            axisLabel: {
              textStyle: {
                color: "#fff",
                fontSize: "14",
              },
            },
            data: this.data,
          },
        ],
        // dataZoom: [
        //   {
        //     type: "inside",
        //     show: true,
        //     realtime: true,
        //     start: 0,
        //     end: 50,
        //     xAxisIndex: "horizontal",
        //     yAxisIndex: [0],
        //     bottom: "12",
        //     left: "45",
        //     height: 5,
        //     borderColor: "rgba(0,0,0,0)",
        //     textStyle: {
        //       color: "#05D5FF",
        //     },
        //     showDataShadow: true,
        //   },
        // ],
        series: [
          {
            name: "",
            type: "bar",
            zlevel: 1,
            itemStyle: {
              barBorderRadius: 30,
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: "#1D3571", //  0%  处的颜色
                  },
                  {
                    offset: 1,
                    color: "#00F9FF", //  100%  处的颜色
                  },
                ],
                global: false, //  缺省为  false
              },
            },
            barWidth: 10,
            data: this.data,
          },
        ],
        // tooltip: {
        //   trigger: "axis",
        //   axisPointer: {
        //     type: "shadow",
        //   },
        // },
        // grid: {
        //   top: "15%",
        //   bottom: "10%",
        //   right: "5%",
        // },
        // legend: {
        //   data: ["2022年1月", "2022年2月", "2022年3月"],
        //   textStyle: {
        //     color: "#fff",
        //   },
        // },
        // xAxis: [
        //   {
        //     type: "category",
        //     axisTick: { show: false },
        //     data: ["现场查处", "酒驾醉驾", "超速", "超员", "涉证涉牌"],
        //     axisLabel: {
        //       textStyle: {
        //         color: "#fff",
        //       },
        //     },
        //     axisLine: {
        //       lineStyle: {
        //         color: "#DBDAD9",
        //         type: "dashed",
        //         dashOffset: 5,
        //       },
        //     },
        //     splitLine: {
        //       lingStyle: {
        //         type: "dashed",
        //         dashOffset: 5,
        //         color: "#eee",
        //       },
        //     },
        //   },
        // ],
        // yAxis: [
        //   {
        //     type: "value",
        //     axisLine: {
        //       show: true,
        //       lineStyle: {
        //         color: "#DBDAD9",
        //         type: "dashed",
        //         dashOffset: 5,
        //       },
        //     },
        //     axisLabel: {
        //       textStyle: {
        //         color: "#fff",
        //       },
        //     },
        //     splitLine: {
        //       show: true,
        //       lineStyle: {
        //         color: "#DBDAD9",
        //         type: "dashed",
        //         dashOffset: 5,
        //       },
        //     },
        //   },
        // ],
        // color: ["#2D7DFC", "#FF7723", "#03DAF2"],
        // series: [
        //   {
        //     name: "2022年1月",
        //     type: "bar",
        //     barGap: 0,
        //     itemStyle: {
        //       barWidth: 10,
        //       barBorderRadius: [30, 30, 0, 0],
        //     },
        //     data: [320, 332, 301, 334, 390],
        //   },
        //   {
        //     name: "2022年2月",
        //     type: "bar",
        //     itemStyle: {
        //       barWidth: 10,
        //       barBorderRadius: [30, 30, 0, 0],
        //     },
        //     data: [220, 182, 191, 234, 290],
        //   },
        //   {
        //     name: "2022年3月",
        //     type: "bar",
        //     itemStyle: {
        //       barWidth: 10,
        //       barBorderRadius: [30, 30, 0, 0],
        //     },
        //     data: [150, 232, 201, 154, 190],
        //   },
        // ],
      });
    },
  },
};
</script>