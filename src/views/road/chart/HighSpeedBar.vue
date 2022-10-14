<template>
  <div id="highSpeed" style="height: calc(100% - 0.5rem); width: 100%">123</div>
</template>
<script>
// import * as echarts from "echarts";
export default {
  name: 'HighSpeedBar',
  mounted () {
    this.init()
  },
  methods: {
    init () {
      let chartData = {
        xData: [
          "长春分局",
          "德惠分局",
          "吉林分局",
          "四平分局",
          "伊通分局",
          "双辽分局",
          "通化分局",
          "靖宇分局",
          "松原分局",
          "白城分局",
          "延吉分局",
          "敦化分局",
          "梅河口分局"
        ],
        data: [341.28, 266.57, 314, 187.767, 304.627, 324.7, 272, 399, 398.35, 516.05, 338, 319.8, 260],
      };

      let highSpeed = this.$echarts.init(document.getElementById('highSpeed'));
      highSpeed.setOption(
        {
          // backgroundColor: '#00265f',
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            top: '10%',
            right: '5%',
            left: '10%',
            bottom: '8%'
          },
          xAxis: [{
            type: 'category',
            data: chartData.xData,
            axisLine: {
              lineStyle: {
                color: 'rgba(255,255,255,0.4)'
              },
            },
            axisLabel: {
              margin: 10,
              color: '#fff',
              textStyle: {
                fontSize: 16
              },
              interval:0
            },
          }],
          yAxis: [{
            axisLabel: {
              formatter: '{value}km',
              color: '#fff',
              fontSize:16
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: 'rgba(255,255,255,0.4)'
              }
            },

            splitLine: {
              lineStyle: {
                color: 'rgba(255,255,255,0.12)'
              }
            }
          }],
          series: [
            {
              //1上
              name: "",
              type: "pictorialBar",
              symbolSize: [25, 8],
              symbolOffset: ["0", -5],
              symbolPosition: "end",
              z: 15,
              tooltip:{
                show:false
              },
              color: "#5EE7FE",
              zlevel: 2,
              data: chartData.data,
            },
            {
              type: 'bar',
              data: chartData.data,
              barWidth: '25',
              itemStyle: {
                normal: {
                  color: {
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    type: "linear",
                    global: false,
                    colorStops: [
                      {
                        //第一节下面
                        offset: 0,
                        color: "rgba(43,164,184,1)",
                      },
                      {
                        offset: 1,
                        color: "rgba(43,164,184,.5)",
                      },
                    ],
                  },
                  // barBorderRadius: [30, 30, 30, 30],
                  shadowColor: 'rgba(0,160,221,1)',
                  shadowBlur: 4,
                }
              },
              label: {
                normal: {
                  show: true,
                  lineHeight: 30,
                  width: 80,
                  height: 30,
                  backgroundColor: 'rgba(0,255,255,0.2)',
                  borderRadius: 200,
                  position: ['-10', '-60'],
                  distance: 1,
                  formatter: [
                    '    {d|●}',
                    ' {a|{c}}     \n',
                    '    {b|}'
                  ].join(','),
                  rich: {
                    d: {
                      color: '#3CDDCF',
                    },
                    a: {
                      color: '#fff',
                      align: 'center',
                      fontSize:16
                    },
                    b: {
                      width: 1,
                      height: 30,
                      borderWidth: 1,
                      borderColor: '#234e6c',
                      align: 'left'
                    },
                  }
                }
              }
            },
            {
              //1下
              name: "",
              type: "pictorialBar",
              symbolSize: [25, 8],
              symbolOffset: ["0", 5],
              z: 12,
              tooltip:{
                show:false
              },
              color: "rgba(43,164,184,1)",
              data: chartData.data,
            },
          ]
        }
      )
    }
  }
}
</script>