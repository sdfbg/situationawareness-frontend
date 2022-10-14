<template>
  <div
    id="enterpriseVehicles"
    style="height: calc(100% - 0.1rem); width: 100%"
  ></div>
</template>
<script>
import * as echarts from "echarts";
// import api from "./../../../api/index"
export default {
  name: "EnterpriseVehiclesPie",
  data() {
    return {
      dataList: [
        {
          name: "货运",
          value: 15,
          itemStyle: {
            color: "#99D3F3",
          },
        },
        {
          name: "旅游客运",
          value: 408,
          itemStyle: {
            color: "#007AFF",
          },
        },
        {
          name: "校车",
          value: 122,
          itemStyle: {
            color: "#1F9AA7",
          },
        },
        {
          name: "公路客运",
          value: 155,
          itemStyle: {
            color: "#2563AE",
          },
        },
        {
          name: "危化品运输",
          value: 300,
          itemStyle: {
            color: "#F5B64C",
          },
        },
      ],
    };
  },
  prop: {
    dataList: Array,
  },
  mounted() {
    this.drawBar();
  },
  methods: {
    drawBar() {
      let enterpriseVehicles = this.$echarts.init(
        document.getElementById("enterpriseVehicles")
      );
      let yData = [
        "长春",
        "吉林",
        "四平",
        "松原",
        "白城",
        "辽源",
        "通化",
        "白山",
        "延边州",
      ];
      enterpriseVehicles.setOption({
        title: {
          text: "重点车辆总数：" + 18105,
          textStyle: {
            color: "#fff",
            fontSize: 14,
          },
          x: "left",
          y: "5",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["旅游客运", "公路客运", "危险品运输", "校车", "货运"],
          orient: "vertical",
          top: "5",
          x: "right",
          textStyle: {
            color: "#fff",
          },
          itemWidth: 14,
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
          data: [
            "长春",
            "吉林",
            "四平",
            "松原",
            "白城",
            "辽源",
            "通化",
            "白山",
            "延边州",
          ],
          axisLabel: {
            color: "rgba(255,255,255,1)",
          },
        },
        dataZoom: [
          {
            show: false,
            width: 10,
            height: "100%",
            realtime: true,
            // 指定x/y轴数据维度 "yAxisIndex":
            yAxisIndex: [0],
            start: 100,
            end: 50,
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
            name: "旅游客运",
            type: "bar",
            stack: "total",
            label: {
              show: false,
            },

            data: [121, 828, 144, 368, 390, 828, 144, 368, 390],
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
            name: "公路客运",
            type: "bar",
            stack: "total",
            label: {
              show: false,
            },

            data: [271, 132, 413, 210, 521, 828, 144, 368, 390],
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
            name: "危险品运输",
            type: "bar",
            stack: "total",
            label: {
              show: false,
            },
            data: [121, 828, 144, 368, 390, 828, 144, 368, 390],
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
              // shadowBlur: 16,
              // shadowColor: "rgba(7,165,255,1)",
            },
          },
          {
            name: "校车",
            type: "bar",
            stack: "total",
            label: {
              show: false,
            },
            data: [271, 132, 413, 210, 521, 828, 144, 368, 390],
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
              // shadowBlur: 16,
              // shadowColor: "#a2f9f7",
            },
          },
          {
            name: "货运",
            type: "bar",
            stack: "total",
            label: {
              show: false,
            },

            data: [271, 132, 413, 210, 521, 828, 144, 368, 390],
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
              // shadowBlur: 16,
              // shadowColor: "#a2f9f7",
            },
          },
        ],
      });
      let startNumber = 0;
      // 有多少条数据
      let yAxisDatalen = yData.length;
      // len的值,可以根据你的数量量设置,不要超过yData.length的值,不然不会动
      let len = 6;
      enterpriseVehicles.on("mouseover", () => {
        clearInterval(this.timer);
      });
      enterpriseVehicles.on("mouseout", () => {
        this.timer = setInterval(function () {
          if (startNumber === yAxisDatalen - len) {
            startNumber = 0;
          }
          enterpriseVehicles.dispatchAction({
            type: "dataZoom",
            startValue: startNumber,
            endValue: startNumber + len,
          });
          startNumber++;
        }, 2000);
      });
      this.timer && clearInterval(this.timer);
      this.timer = setInterval(function () {
        if (startNumber === yAxisDatalen - len) {
          startNumber = 0;
        }

        enterpriseVehicles.dispatchAction({
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