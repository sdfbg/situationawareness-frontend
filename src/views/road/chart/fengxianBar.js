import * as echarts from "echarts";
const img1 = require("../../../assets/images/top1.png");
const img2 = require("../../../assets/images/top2.png");
const img3 = require("../../../assets/images/top3.png");
const img = require("../../../assets/images/chart_num.png");
export const fengxianBar = (id, yData, data,title) => {
  let mychart = echarts.init(document.getElementById(id));

  mychart.setOption({
    title: {
      text: title,
      textStyle: {
        color: "#0ff",
        fontSize:14
      },
      x: "center",
      y: "5"
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "none"
      },
      formatter: function(params) {
        return params[0].name + " : " + params[0].value;
      }
    },
    xAxis: {
      show: false,
      type: "value"
    },
    grid: {
      right: "10%",
      left: "25%",
      top: "4%",
      bottom: "0%"
    },
    yAxis: [
      {
        type: "category",
        inverse: true,
        offset: 120,
        axisLabel: {
          show: true,
          align: "left",
          textStyle: {
            color: "#fff",
            fontSize: "12"
          },
          formatter: function(value, index) {
            var num = "";
            var str = "";
            num = index + 1;
            if (index === 0) {
              str = "{no1|" + "} {num1|" + num + "} {title1| " + value + "}";
            } else if (index === 1) {
              str = "{no2|" + "} {num2|" + num + "} {title2| " + value + "}";
            } else if (index === 2) {
              str = "{no3|" + "} {num3|" + num + "} {title3| " + value + "}";
            } else {
              str = " {num|" + num + "} {title| " + value + "}";
            }
            return str;
          },
          rich: {
            num: {
              color: "#fff",
              backgroundColor: {
                image: img
              },
              width: 10,
              height: 10,
              fontSize: 12,
              padding: [6, 5, 3, 5],
              align: "center"
            },
            num1: {
              color: "#fff",
              backgroundColor: {
                image: img1
              },
              width: 10,
              height: 10,
              fontSize: 12,
              padding: [7, 5, 3, 5],
              align: "center"
            },
            num2: {
              color: "#fff",
              backgroundColor: {
                image: img2
              },
              width: 10,
              height: 10,
              fontSize: 12,
              padding: [7, 5, 3, 5],
              align: "center"
            },
            num3: {
              color: "#fff",
              backgroundColor: {
                image: img3
              },
              width: 10,
              height: 10,
              fontSize: 12,
              padding: [7, 5, 3, 5],
              align: "center"
            }
          }
        },
        splitLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        data: yData
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
            fontSize: "14"
          }
        },
        data: data
      }
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
                color: "#1D3571" //  0%  处的颜色
              },
              {
                offset: 1,
                color: "#00F9FF" //  100%  处的颜色
              }
            ],
            global: false //  缺省为  false
          }
        },
        barWidth: 10,
        data: data
      }
    ]
  });
};
