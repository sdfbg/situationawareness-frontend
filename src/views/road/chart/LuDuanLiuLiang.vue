<template>
  <v-chart :option="option" :autoresize="true" :loading-options="echartsLoadingOptions" :loading="loading" class="chart"/>
</template>
<script>
import VChart from "vue-echarts";
export default {
  name: "LuDuanLiuLiang",
  components:{VChart},
  inject: ["echartsLoadingOptions"],
  props: {
    roadInfo: {
      type: Object,
      required: true,
    },
    roadType: {
      type: String,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
  },
  computed:{
    option(){
      if(this.loading) return {}
      let roads = this.roadInfo[this.roadType].map(d=>d.dlmc)
      let counts = this.roadInfo[this.roadType].map(d=>Math.round(d.avgFlow))
      const total = Math.round(this.roadInfo[this.roadType].map(d=>d.avgFlow).filter(r=>r!=undefined).reduce((d1,d2)=>d1+d2,0))
      // counts.forEach((count,i) => {
      //   if(count==0){
      //     counts[i] = undefined
      //     roads[i] = undefined
      //   }
      // });
      // roads = roads.filter(r=>r!=undefined)
      // counts = counts.filter(r=>r!=undefined)
      let barWidth = 20;
      let color1 = {
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
      };
      return {
        title: {
          text: "总流量：" + total,
          textStyle: {
            color: "#fff",
            fontSize: 14,
          },
          x: "left",
          y: "5",
        },
        //提示框
        tooltip: {
          show: true,
        },
        grid: {
          top: "20%",
          left: "2%",
          bottom: "0%",
          right: "2%",
          containLabel: true,
        },
        animation: false,
        dataZoom: [
          {
            type: "inside",
            show: true,
            start: 0,
            end: 20,
            xAxisIndex: [0],
          },
        ],
        xAxis: [
          {
            type: "category",
            axisTick: {
              show: false,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#DBDAD9",
                type: "dashed",
                dashOffset: 5,
              },
            },
            axisLabel: {
              textStyle: {
                color: "#fff",
              },
              interval: 0
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: "#ccc",
                type: "dashed",
                dashOffset: 5,
              },
            },
            data: roads,
          },
        ],
        yAxis: [
          {
            show: true,
            type: "value",
            axisLine: {
              show: true,
              lineStyle: {
                color: "#DBDAD9",
                type: "dashed",
                dashOffset: 5,
              },
            },
            axisLabel: {
              textStyle: {
                color: "#fff",
              },
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgba(255,255,255,.3)",
                type: "dashed",
                dashOffset: 5,
              },
            },
          },
        ],
        series: [
          {
            name: "",
            type: "pictorialBar",
            symbolSize: [barWidth, 10],
            symbolOffset: [0, -5],
            symbolPosition: "end",
            z: 15,
            color: "#5EE7FE",
            zlevel: 2,
            data: counts,
          },
          {
            name: "流量",
            type: "bar",
            barGap: "60%",
            barWidth: barWidth,
            itemStyle: {
              color: color1,
              borderColor: color1,
              borderWidth: 1,
              borderType: "solid",
            },
            label: {
              show: true,
              formatter: "{c}",
              position: "top",
              color: "#5EE7FE",
              fontSize: 12,
              textAlign: "center",
            },
            zlevel: 2,
            data: counts,
          },
          {
            name: "",
            type: "pictorialBar",
            symbolSize: [barWidth, 10],
            symbolOffset: ["0", 5],
            z: 12,
            color: "#2871AA",

            data: counts.map(c=>({name:"",value:c})),
          },
        ],
      }
    
    }
  },
};
</script>
<style scoped>
  .chart {
    height: calc(100% - 0.1rem);
    width: 100%
  }
</style>