<template>
  <div id="cheliangshigu" style="height: calc(100% - 0.1rem); width: 100%; padding-top: 0.1rem"></div>
</template>
<script>
import * as echarts from "echarts";
import api from "@/api";
import cities from "@/common/city";
export default {
  name: "Cheliangshigu",
  data() {
    return {
      cities,
      chart: undefined,
      echartData: [],
      timer: undefined,
    };
  },
  mounted() {
    this.chart = this.$echarts.init(document.getElementById("cheliangshigu"));
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.$axios.post(api.getAccidentCar()).then((res) => {
        this.echartData = res.data;
        this.init();
      });
    },
    init() {
      let data = this.cities.map((c) => ({
        name: c.name,
        roadData: this.echartData.B.filter(d => d.CITY == c.code)[0].SUM,
        tourData: this.echartData.E.filter(e => e.CITY == c.code)[0].SUM,
        dangerData: this.echartData.R.filter(d => d.CITY == c.code)[0].SUM,
        schoolBusData: this.echartData.P.filter(d => d.CITY == c.code)[0].SUM,
        goodsCarData: this.echartData.F.filter(d => d.CITY == c.code)[0].SUM,
      }));
      let city = [], roadData = [], tourData = [], dangerData = [], schoolBusData = [], goodsCarData = [];
      data.forEach(d => {
        city.push(d.name);
        roadData.push(d.roadData);
        tourData.push(d.tourData);
        dangerData.push(d.dangerData);
        schoolBusData.push(d.schoolBusData);
        goodsCarData.push(d.goodsCarData);
      });
      const option = {
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["公路客运", "旅游客运", "危险品危险", "校车", "货车"],
          x: "left",
          textStyle: {
            color: "#fff",
          },
          itemWidth: 15,
        },
        grid: {
          top: "15%",
          left: "5%",
          right: "0%",
          bottom: "0%",
          containLabel: true,
        },
        xAxis: {
          type: "value",
          axisLine: {
            show: false,
            lineStyle: {
              color: "rgba(255,255,255,0.8)",
            },
          },
          axisLabel: {
            show: false,
          },
          splitLine: {
            lineStyle: {
              color: "rgba(255,255,255,0.3)", // 分割线颜色
            },
          },
        },
        yAxis: {
          type: "category",
          data: city,
          axisLabel: {
            color: "rgba(255,255,255,1)",
          },
        },
        dataZoom: [
          {
            show: false,
            width: 10,
            height: "100%",
            // 指定x/y轴数据维度 "yAxisIndex":
            yAxisIndex: [0],
            start: 100,
            end: 50,
            realtime: true,
            // 距离右侧距离
            right: 0,
            orient: "vertical",
            backgroundColor: "#040E1A",
            borderColor: "#31BFE8",
            fillerColor: "#70D1F9",
          },
        ],
        series: [
          {
            name: "公路客运",
            type: "bar",
            stack: "total",
            label: {
              show: false,
            },
            data: roadData,
            barWidth: 12,
            itemStyle: {
              label: {
                show: false,
              },
              labelLine: {
                show: false,
              },
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "rgba(41,244,236,.2)" },
                { offset: 0.5, color: "#00CA95" },
                { offset: 1, color: "rgba(41,244,236,.2)" },
              ]),
              borderColor: "rgba(41,244,236,0.7)",
              // shadowBlur: 16,
              shadowColor: "#a2f9f7",
            },
          },
          {
            name: "旅游客运",
            type: "bar",
            stack: "total",
            label: {
              show: false,
            },
            data: tourData,
            barWidth: 18,
            itemStyle: {
              label: {
                show: true,
              },
              labelLine: {
                show: false,
              },
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "rgba(7,165,255,0.2)" },
                { offset: 0.5, color: "#007AFF" },
                { offset: 1, color: "rgba(7,165,255,.2)" },
              ]),
              borderColor: "rgba(7,165,255,0.7)",
            },
          },
          {
            name: "危险品运输",
            type: "bar",
            stack: "total",
            label: {
              show: false,
            },
            data: dangerData,
            barWidth: 12,
            itemStyle: {
              labelLine: {
                show: false,
              },
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "rgba(255,222,50,0.2)" },
                { offset: 0.5, color: "#F5B64C" },
                { offset: 1, color: "rgba(255,222,50,.2)" },
              ]),
              borderColor: "rgba(255,222,50,0.7)",
              shadowBlur: 16,
              shadowColor: "rgba(7,165,255,1)",
            },
          },
          {
            name: "校车",
            type: "bar",
            stack: "total",
            label: {
              show: false,
            },
            data: schoolBusData,
            barWidth: 12,
            itemStyle: {
              label: {
                show: true,
              },
              labelLine: {
                show: false,
              },
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "rgba(31,154,167,0.2)" },
                { offset: 0.5, color: "rgba(31,154,167,1)" },
                { offset: 1, color: "rgba(31,154,167,.2)" },
              ]),
              borderColor: "rgba(31,154,167,.7)",
              shadowBlur: 16,
              shadowColor: "#a2f9f7",
            },
          },
          {
            name: "货运",
            type: "bar",
            stack: "total",
            label: {
              show: false,
            },
            data: goodsCarData,
            barWidth: 12,
            itemStyle: {
              label: {
                show: true,
              },
              labelLine: {
                show: false,
              },
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "rgba(153,211,243,.2)" },
                { offset: 0.5, color: "rgba(153,211,243,1)" },
                { offset: 1, color: "rgba(153,211,243,.2)" },
              ]),
              borderColor: "rgba(153,211,243,.7)",
              shadowBlur: 16,
              shadowColor: "#a2f9f7",
            },
          },
        ],
      };
      let startNumber = 0;
      // 有多少条数据
      let yAxisDatalen = city.length;
      // len的值,可以根据你的数量量设置,不要超过yData.length的值,不然不会动
      let len = 6;
      const totals = [
        2000, 1500, 1320, 1617, 1918, 1402, 1683, 1230, 1171, 2234, 1313, 1341,
        1123,
      ];
      option.series.forEach((s) => {
        s.data = s.data.map((d, i) => Math.round((d / totals[i]) * 100));
      });
      this.chart.setOption(option);
      this.chart.on("mouseover", () => {
        clearInterval(this.timer);
      });
      this.chart.on("mouseout", () => {
        this.timer = setInterval(function () {
          if (startNumber === yAxisDatalen - len) {
            startNumber = 0;
          }
          this.chart.dispatchAction({
            type: "dataZoom",
            startValue: startNumber,
            endValue: startNumber + len,
          });
          startNumber++;
        }, 2000);
      });
      this.timer && clearInterval(this.timer);
      this.timer = setInterval(() => {
        if (startNumber === yAxisDatalen - len) {
          startNumber = 0;
        }
        this.chart.dispatchAction({
          type: "dataZoom",
          startValue: startNumber,
          endValue: startNumber + len,
        });
        startNumber++;
      }, 2000);
    },
  },
};
</script>