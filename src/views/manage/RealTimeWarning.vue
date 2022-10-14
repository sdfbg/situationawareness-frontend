<template>
  <div
    id="realTimeWarning"
    class="car_warn"
    style="height: calc(100% - 1em); width: 100%; padding-top: 0.5em"
  ></div>
</template>
<script>
// import * as echarts from "echarts";
export default {
  name: "RealTimeWarning",
  data() {
    return {
      echartData: [],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let enterpriseAlertEchart = this.$echarts.init(
        document.getElementById("realTimeWarning")
      );
      const data = {
        legendData: [
          "长春",
          "吉林",
          "四平",
          "辽源",
          "通化",
          "白山",
          "松原",
          "白城",
          "延边州",
          "长白山",
          "高速",
          "森林",
          "梅河口",
        ],
        seriesData: [
          { name: "长春", value: 239 },
          { name: "吉林", value: 194 },
          { name: "四平", value: 168 },
          { name: "辽源", value: 180 },
          { name: "通化", value: 140 },
          { name: "白山", value: 132 },
          { name: "松原", value: 144 },
          { name: "白城", value: 100 },
          { name: "延边州", value: 89 },
          { name: "长白山", value: 69 },
          { name: "高速", value: 289 },
          { name: "森林", value: 89 },
          { name: "梅河口", value: 99 },
        ],
      };
      enterpriseAlertEchart.setOption({
        title: {
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          type: "scroll",
          orient: "vertical",
          right: 10,
          top: 20,
          bottom: 20,
          data: data.legendData,
          textStyle: {
            color: "#fff",
          },
        },
        series: [
          {
            name: "地市区",
            type: "pie",
            radius: "55%",
            center: ["40%", "50%"],
            data: data.seriesData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "#ffffff",
              },
            },
          },
        ],
      });
    },},
};
</script>
<style lang="less" scoped>
@import "~@/assets/style/car.less";
</style>