<template>
  <v-chart :option="option" :autoresize="true" :loading-options="echartsLoadingOptions" :loading="loading" class="chart"/>
</template>
<script>
import api from "@/api";
import * as echarts from "echarts";
import VChart from "vue-echarts";
export default {
  name: "DriverWarning",
  components: { VChart },
  inject: ["echartsLoadingOptions"],
  data() {
    return {
      echartData: [],
      loading: true,
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.$axios.post(api.getCompanyRightMid()).then((res) => {
        this.echartData = res.data.data;
        this.loading = false;
      });
    },
  },
  computed: {
    option() {
      if(this.loading) return {};
      let data = [];
      this.echartData.forEach((d) => {
        if (d.fzjg == "吉A") {
          data.push({ name: "长春", sgs: d.sgs, wfsl: d.wfsl });
        }
        if (d.fzjg == "吉B") {
          data.push({ name: "吉林", sgs: d.sgs, wfsl: d.wfsl });
        }
        if (d.fzjg == "吉C") {
          data.push({ name: "四平", sgs: d.sgs, wfsl: d.wfsl });
        }
        if (d.fzjg == "吉D") {
          data.push({ name: "辽源", sgs: d.sgs, wfsl: d.wfsl });
        }
        if (d.fzjg == "吉E") {
          data.push({ name: "通化", sgs: d.sgs, wfsl: d.wfsl });
        }
        if (d.fzjg == "吉F") {
          data.push({ name: "白山", sgs: d.sgs, wfsl: d.wfsl });
        }
        if (d.fzjg == "吉G") {
          data.push({ name: "白城", sgs: d.sgs, wfsl: d.wfsl });
        }
        if (d.fzjg == "吉H") {
          data.push({ name: "延边州", sgs: d.sgs, wfsl: d.wfsl });
        }
        if (d.fzjg == "吉J") {
          data.push({ name: "松原", sgs: d.sgs, wfsl: d.wfsl });
        }
        if (d.fzjg == "吉K") {
          data.push({ name: "长白山", sgs: d.sgs, wfsl: d.wfsl });
        }
      });
      let city = [], sgs = [], sgsSum = 0, wfsl = [], wfslSum = 0;
      data.forEach(d => {
        city.push(d.name);
        sgs.push(d.sgs);
        sgsSum = sgsSum + d.sgs;
        wfsl.push(d.wfsl);
        wfslSum = wfslSum + d.wfsl;
      });
      return {
        tooltip: {
          trigger: "axis",
        },
        legend: {
          orient: "horizontal", // 水平
          icon: "circle",
          top: 0,
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
          top: "10%",
          left: "10%",
          right: "5%",
          bottom: "8%",
          // containLabel: true
        },
        dataZoom: [
          {
            type: "inside",
            show: true,
            start: 0,
            end: 50,
            xAxisIndex: [0],
          },
        ],
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
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              //y轴刻度线
              show: false,
            },
            boundaryGap: false,
            data: city,
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
        series: [
          {
            name: "违法数 总计：" + wfslSum,
            type: "line", 
            smooth: true, //是否平滑
            showAllSymbol: true,
            symbol: "circle",
            symbolSize: 10,
            lineStyle: {
              normal: {
                color: "#00b3f4",
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
              color: "#00b3f4",
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
                      color: "rgba(0,179,244,0.3)",
                    },
                    {
                      offset: 1,
                      color: "rgba(0,179,244,0)",
                    },
                  ],
                  false
                ),
                shadowColor: "rgba(0,179,244, 0.9)",
                shadowBlur: 20,
              },
            },
            data: wfsl.map(w => Math.round(w / 10000)),
          },
          {
            name: "事故数 总计：" + sgsSum,
            type: "line",
            smooth: true, //是否平滑
            showAllSymbol: true,
            // symbol: 'image://./static/images/guang-circle.png',
            symbol: "circle",
            symbolSize: 10,
            lineStyle: {
              normal: {
                color: "#00ca95",
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
                color: "#00ca95",
              },
            },
            itemStyle: {
              color: "#00ca95",
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
                      color: "rgba(0,202,149,0.3)",
                    },
                    {
                      offset: 1,
                      color: "rgba(0,202,149,0)",
                    },
                  ],
                  false
                ),
                shadowColor: "rgba(0,202,149, 0.9)",
                shadowBlur: 20,
              },
            },
            data: sgs,
          },
        ],
      };
    },
  },
};
</script>