<template>
  <div id="TrafficRoadFlow" style="height: calc(100% - 0.7rem)">
    <button @click="sendRoadInfo"></button>
  </div>
</template>
<script>
import * as echarts from "echarts";
import api from "@/api";
export default {
  name: 'TrafficRoadFlow',
  data() {
    return {
      chart: undefined,
      allData: [],
    }
  },
  props: ["roadType"],
  watch: {
    roadType() {
      this.init();
    },
  },
  mounted () {
    this.chart = this.$echarts.init(document.getElementById('TrafficRoadFlow'));
    this.chart.showLoading({
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
    fetchData(){
      this.$axios.post(api.getRoadInfo()).then((res) => {
        this.allData = res.data.data;
        this.sendRoadInfo();
        this.init();
      })
    },
    sendRoadInfo() {
      this.$emit('receiveRoadInfo',this.allData);
    },
    init () {
      let roads = this.allData[this.roadType].map(d=>d.dlmc)
      let counts = this.allData[this.roadType].map(d=>Math.round(d.avgFlow))
      counts.forEach((count,i) => {
        if(count==0){
          counts[i] = undefined
          roads[i] = undefined
        }
      });
      roads = roads.filter(r=>r!=undefined)
      counts = counts.filter(r=>r!=undefined)
      let trueData = counts;this.chart.setOption(
        {
          tooltip: {
            trigger: 'axis',
            show: true,
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
            },
            
          },
          legend: {
            show: false,
            top: "20px"
          },
          grid: {
            top: '5%',
            left: '-10%',
            right: '10%',
            bottom: '15%',
            containLabel: true,
          },
          dataZoom: [
            {
              type: "inside",
              show: true,
              start: 0,
              end: 20,
              yAxisIndex: [0],
              zoomLock: true,
              moveHandleSize: 0,
            },
          ],
          xAxis: [
            {
              splitLine: {
                show: false,
              },
              type: 'value',
              show: true,
              axisLine: {
                show: true,
                lineStyle: {
                  color: 'rgba(255,255,255,.6)',
                  type: [5, 10],
                  dashOffset: 5
                }
              },
              axisLabel: {
                color: '#00C5F3'
              }
            },
          ],
          yAxis: [
            {
              splitLine: {
                show: false,
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: 'rgba(255,255,255,.6)',
                  type: [5, 5],
                  dashOffset: 5
                }
              },
              type: 'category',
              axisTick: {
                show: false,
              },
              inverse: true,
              data: roads,
              axisLabel: {
                color: '#00C5F3',
                fontSize: 14,
                margin: 50,
                textStyle: {
                  align: 'left',
                },
              },
            },
          ],
          series: [
            {
              name: '',
              type: 'bar',
              barWidth: 20, // 柱子宽度
              label: {
                show: true,
                position: 'right', // 位置
                color: '#00C5F3',
                fontSize: 14,
                // distance: 12, // 距离
                formatter: function (value, i) {
                  return value[i];
                },
              }, // 柱子上方的数值
              itemStyle: {
                barBorderRadius: [0, 0, 0, 0], // 圆角（左上、右上、右下、左下）
                color: () => {
                  return new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    {
                      offset: 0,
                      color: 'rgba(0,203,250,.1)',
                    },
                    {
                      offset: 1,
                      color: 'rgba(0,203,250,1)',
                    },
                  ]);
                },
              },
              data: trueData,
            },
          ],
        }
      )
      this.chart.hideLoading();
    }
  }
}
</script>