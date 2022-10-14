<template>
  <v-chart :option="option" :autoresize="true" :loading-options="echartsLoadingOptions" :loading="loading" class="chart"/>
</template>
<script>
import VChart from "vue-echarts";
import api from "@/api";
import * as echarts from "echarts";
import moment from "moment";
export default {
  name: "TimeDistribution",
  components: {VChart},
  inject: ["echartsLoadingOptions"],
  data(){
    return {
      allData:[],
      loading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    drawLine() {},
    fetchData(){
      this.$axios.post(api.getAccidentCountBy3Year()).then(res=>{
        this.allData = res.data.map(d=>({count:d.COUNT,name:d.DMSM1,year:d.TIME}))
        this.loading = false
      })
    }
  },
  computed: {
    option(){
      if(this.loading) return {}
      const thisYear = moment().year()
      const nameSet = new Set()
      this.allData.forEach(d=>{
        nameSet.add(d.name)
      })
      const xAxisData = [...nameSet]
      const colors = [
        {
          line:"#FFF100",
          label:"#FFF100",
          area:["rgba(255,241,0,1)","rgba(255,241,0,0)"],
          shadow:"rgba(0,179,244, 0.9)",
        },
        {
          line:"#00ca95",
          label:"#00ca95",
          area:["rgba(0,202,149,0.3)","rgba(0,202,149,0)"],
          shadow:"rgba(0,202,149, 0.9)",
        },
        {
          line:"#00b3f4",
          label:"#00b3f4",
          area:["rgba(0,179,244,0.3)","rgba(0,179,244,0)"],
          shadow:"rgba(0,179,244, 0.9)",
        }
      ]
      const series = colors.map((c, i)=>{
        const year = (thisYear-(2-i)).toString()
        const yearData = this.allData.filter(d=>d.year==year)
        const data = xAxisData.map(name=>{
          const nameData = yearData.find(y=>y.name==name)
          return nameData?nameData.count:0
        })
        return {
          name: year,
          type: "line",
          smooth: true, //是否平滑
          showAllSymbol: true,
          symbol: "circle",
          symbolSize: 10,
          lineStyle: {
            normal: {
              color: c.line,
              shadowColor: "rgba(0, 0, 0, .3)",
              shadowBlur: 0,
              shadowOffsetY: 5,
              shadowOffsetX: 5,
            },
          },
          label: {
            show: false,
            position: "top",
            textStyle: {
              color: c.label,
            },
          },
          itemStyle: {
            color: c.line,
            borderColor: "#fff",
            borderWidth: 3,
            shadowColor: "rgba(0, 0, 0, .3)",
            shadowBlur: 0,
            shadowOffsetY: 2,
            shadowOffsetX: 2,
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                c.area.map((color, offset)=>({offset,color})),
                false
              ),
              shadowColor: c.shadow,
              shadowBlur: 20,
            },
          },
          data,
        }
      })
      return {
        tooltip: {
          trigger: "axis",
        },
        legend: {
          orient: "horizontal", // 水平
          icon: "circle",
          top: 25,
          x: "center",
          // 宽度
          itemWidth: 10, // 图形宽度。
          itemHeight: 10, // 图形高度。
          borderWidth: 0,
          textStyle: {
            fontSize: "14px",
            color: "#fff",
          },
        },
        grid: {
          top: "20%",
          left: "11%",
          right: "5%",
          bottom: "22%",
          // containLabel: true
        },
        xAxis: [
          {
            type: "category",
            axisLine: {
              show: true,
              lineStyle: {
                color: "#56a4cd",
              },
            },
            splitArea: {
              // show: false,
              color: "#f00",
              lineStyle: {
                color: "#f00",
              },
            },
            axisLabel: {
              color: "#fff",
              interval: 0,
              width: 30,
              overflow: "break",
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              //y轴刻度线
              show: false,
            },
            boundaryGap: false,
            data: xAxisData,
          },
        ],
        yAxis: [
          {
            type: "value",
            min: 0,
            // max: 140,
            splitLine: {
              show: false,
              lineStyle: {
                color: "rgba(255,255,255,0.1)",
              },
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#56a4cd",
              },
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#fff",
              },
            },
            axisTick: {
              show: false,
            },
          },
        ],
        series,
      }
    }
  },
};
</script>
<style scoped>
  .chart {
    height: calc(100% - 0rem);
    width: 100%
  }
</style>