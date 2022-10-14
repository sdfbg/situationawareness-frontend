<template>
  <div id="keyVehicle" style="width: 100%; height: calc(100%)"></div>
</template>
<script>
import api from "../../../api";
export default {
  name: "KeyVehicle",
  data() {
    return {
      img1: require("../../../assets/images/top1.png"),
      img2: require("../../../assets/images/top2.png"),
      img3: require("../../../assets/images/top3.png"),
      img: require("../../../assets/images/chart_num.png"),
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    getSlowTrafficIllegal() {
      this.$axios.post(api.getSlowTrafficIllegal()).then((res) => {
        this.echartData = res.data;
      });
    },
    init() {
      let keyVehicleEcharts = this.$echarts.init(
        document.getElementById("keyVehicle")
      );
      let city = [
        "长春",
        "吉林",
        "四平",
        "辽源",
        "通化",
        "白山",
        "松原",
        "白城",
        "延边州",
        "长白山",
        "高速",
        "森林",
        "梅河口",
      ];
      let data = [
        "1740",
        "650",
        "380",
        "104",
        "93",
        "243",
        "184",
        "468",
        "147",
        "395",
        "16",
        "84",
        "211",
      ];
      data.sort((a, b) => b - a);
      let max = Math.max.apply(null, data);
      let getMax = [];
      for (let i = 0; i < city.length; i++) {
        getMax.push(max);
      }
      keyVehicleEcharts.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "none",
          },
          formatter: function (params) {
            return params[0].name + " : " + params[0].value;
          },
        },
        dataZoom: [
          {
            show: true,
            type: "inside",
            realtime: true,
            start: 0,
            end: 60,
            yAxisIndex: [0],
            bottom: "12",
            left: "45",
            height: 5,
            borderColor: "rgba(0,0,0,0)",
            textStyle: {
              color: "#05D5FF",
            },
          },
        ],
        xAxis: {
          show: false,
          type: "value",
        },
        grid: {
          right: "12%",
          left: "35%",
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
            data: city,
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
            data: data,
          },
        ],
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
            data: data,
          },
        ],
      });
    },
  },
};
</script>