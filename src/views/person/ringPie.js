import * as echarts from "echarts";
export const ringPie = (id, val, color) => {
  let mychart = echarts.init(document.getElementById(id));
  let option = {
    title: {
      text: val + "%",
      x: "center",
      y: "center",
      textStyle: {
        fontSize: 24,
        color: color[0],
        fontFamily:'myFont'
      }
    },
    tooltip: {
      trigger: "item",
      show: true
    },
    series: [
      {
        type: "pie",
        center: ["50%", "50%"],
        radius: ["80%", "92%"],
        clockwise: false,
        avoidLabelOverlap: false,
        hoverOffset: 0,
        itemStyle: {
          normal: {
            color: function(params) {
              return color[params.dataIndex];
            }
          }
        },
        label: {
          show: false
        },
        labelLine: {
          normal: {
            length: 20,
            length2: 30,
            lineStyle: {
              width: 1
            }
          }
        },
        data: [
          {
            name: "同比",
            value: val
          },
          {
            name: "",
            value: 100 - parseInt(val),
            tooltip: {
              show: false
            }
          }
        ]
      }
    ]
  };
  mychart.setOption(option);
};
