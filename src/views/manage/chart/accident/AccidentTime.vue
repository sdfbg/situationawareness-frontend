<template>
  <div
    id="driverAccidentRate"
    style="height: calc(100% - 0.1rem); width: 100%"
  ></div>
</template>
<script>
import * as echarts from "echarts";
import api from "@/api";
import moment from "moment";
export default {
  name: "AccidentTime",
  data() {
    return {
      chart: undefined,
      allData: [],
      fetched: false,
    };
  },
  props:["year","city","groupBy"],
  mounted() {
    this.fetchData();
  },
  watch: {
    year() {
      this.drawLine();
    },
    city() {
      this.drawLine();
    },
    groupBy() {
      this.drawLine();
    },
  },
  methods: {
    fetchData() {
      this.$axios.post(api.manageAccident("leftTop")).then((res) => {
        this.fetched = true;
        this.allData = res.data;
        this.drawLine();
      });
    },
    drawLine() {
      if (!this.fetched) {
        return;
      }
      const data = this.allData;
      const currentMonth = this.year==2022?parseInt(moment().format("M")):12
      const months = Array.from({ length: 12 })
        .map((v, i) => i + 1)
        .filter(v=>v<=currentMonth)
      const monthArray = months.map((v) => moment(v, "M").format("M月"))
      const seasonArray = Array.from({length: Math.ceil(monthArray.length/3)}).map((v,i)=>`第${i+1}季度`)
      const counts =  months
            .map((v) => moment(v, "M").format(`${this.year}-MM`))
            .map((t) => data
              .filter((d) => this.city=='220000'?d.time == t:d.time == t&&d.city==this.city)
              .map((d) => d.count)
              .reduce((d1, d2) => d1 + d2 ,0));
      if (!this.chart) {
        this.chart = this.$echarts.init(
          document.getElementById("driverAccidentRate")
        );
      }
      const seasonCounts = Array.from({length:seasonArray.length}).map((v,i)=>counts.slice(i*3,i*3+3>counts.length?counts.length:i*3+3).reduce((c1,c2)=>c1+c2,0))
      this.chart.setOption({
        // title: {
        //   text: "总数：" + 32452,
        //   textStyle: {
        //     color: "#0ff",
        //     fontSize: 14,
        //   },
        //   x: "left",
        //   y: "5",
        // },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          // data: ['示范', '一级', '二级'],
          orient: "horizontal", // 水平
          icon: "circle",
          top: 10,
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
          left: "10%",
          right: "5%",
          bottom: "8%",
          // containLabel: true
        },
        xAxis: [
          {
            type: "category",
            axisLine: {
              show: true,
              lineStyle: {
                color: "#DBDAD9",
                type: "dashed",
                dashOffset: 5,
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
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgba(255,255,255,.3)",
                type: "dashed",
                dashOffset: 5,
              },
            },
            axisTick: {
              //y轴刻度线
              show: false,
            },
            boundaryGap: false,
            data: this.groupBy=='month'? monthArray:seasonArray,
          },
        ],

        yAxis: [
          {
            type: "value",
            min: 0,
            // max: 140,
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgba(255,255,255,.3)",
                type: "dashed",
                dashOffset: 5,
              },
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
        series: [
          {
            name: this.year,
            type: "line",
            smooth: true, //是否平滑
            showAllSymbol: true,
            symbol: "circle",
            symbolSize: 10,
            lineStyle: {
              normal: {
                color: "#FFF100",
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
                color: "#00b3f4",
              },
            },
            itemStyle: {
              color: "#FFF100",
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
                  [
                    {
                      offset: 0,
                      color: "rgba(255,241,0,1)",
                    },
                    {
                      offset: 1,
                      color: "rgba(255,241,0,0)",
                    },
                  ],
                  false
                ),
                shadowColor: "rgba(0,179,244, 0.9)",
                shadowBlur: 20,
              },
            },
            data: this.groupBy=='month'? counts: seasonCounts,
          },
        ],
      });
    },
  },
};
</script>