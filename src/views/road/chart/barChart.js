import * as echarts from "echarts";
export const barChart = (id, val,color)=>{
  let mychart = echarts.init(document.getElementById(id));
  let yVal=[]
  let data=[]
   val.forEach(item=>{
    yVal.push(item.name);
    data.push(item.value)
  })
  mychart.setOption({
    tooltip: { show: false },
    grid: { left: "15%", top: 0, bottom: 0, right: '10%' },
    xAxis: {
      type: "value",
      boundaryGap: false,

      axisLine: { show: false, lineStyle: { color: "#ccc" } },
      axisTick: { show: false },
      axisLabel: { show: false },
      splitLine: { show: false }
    },
    yAxis: {
      type: "category",
      data: yVal,
      axisLine: { show: false, lineStyle: { color: "#ccc" } },
      axisTick: { show: false },
      axisLabel: { fontSize: 10, color: "#fff" },
      inverse: true
    },
    series: [
      {
        name: "",
        type: "pictorialBar",
        symbolSize: [10, 20],
        symbolOffset: [5, 0],
        symbolPosition: "end",
        z: 12,
        label: {
            show: true,
            color:'#fff',
            position: "right",
            formatter: "{c}"
        },
        data: val,
        itemStyle: {
          normal: {
            opacity: 3.7,
            color: color[0]
          }
        }
      },
      {
        name: "",
        type: "pictorialBar",
        symbolSize: [10, 20],
        symbolOffset: [-5, 0],
        z: 12,
        data: val,
        itemStyle: {
          normal: {
            opacity: 3.7,
            color: color[1]
          }
        }
      },
      {
        type: "bar",
        itemStyle: {
          normal: {
            opacity: 3.7,
            color: ()=>{
              return new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                {
                  offset: 0,
                  color: color[2]
                },
                {
                  offset: 1,
                  color: color[3]
                }
              ]);
            }
          }
        },
        barWidth: "20",
        data: val,
      }
    ]
  });
}