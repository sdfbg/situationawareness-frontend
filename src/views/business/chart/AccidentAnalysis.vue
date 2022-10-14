<template>
  <v-chart :option="option" :autoresize="true" :loading-options="echartsLoadingOptions" :loading="loading" class="chart"/>
</template>
<script>
import VChart from "vue-echarts";
import api from "@/api";
export default {
  name: "AccidentAnalysis",
  components: { VChart },
  inject: ["echartsLoadingOptions"],
  data() {
    return {
      echartsData: {},
      loading: true
    };
  },
  mounted() {
    this.getEchartsData();
  },
  methods: {
    getEchartsData() {
      this.$axios.post(api.getCompanyLeftMid()).then((res) => {
        this.echartsData = res.data.data;
        this.loading = false;
      });
    },
  },
  computed: {
    option() {
      if(this.loading) return {};
      const legend = ["绿色预警", "黄色预警", "橙色预警", "红色预警"];
      let name = this.echartsData.xAxis[0].data;
      name.splice(1, 1);
      let data = [];
      this.echartsData.series.forEach((element) => {
        data.push(element.data);
      });
      let dataSum = data.flat().reduce((prev, cur) => { return prev + cur }, 0);
      console.log(dataSum);
      return {
        title: {
          text: "预警总数：" + dataSum,
          top: 5,
          textStyle: {
            color: "#fff",
            fontSize: 14,
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: { type: "shadow" },
        },
        color: ["#5FD456", "#FEFE29", "#FC5F2F", "#E6203C"],
        legend: {
          top: 25,
          left: "left",
          itemWidth: 16,
          itemHeight: 10,
          textStyle: {
            fontSize: 10,
            color: "#96A4F4",
          },
          data: legend,
        },
        grid: {
          left: "1%",
          right: "0%",
          bottom: "2%",
          containLabel: true,
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
        xAxis: {
          type: "category",
          axisLabel: {
            color: "#96A4F4",
            interval: 0,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#DBDAD9",
              type: "dashed",
              dashOffset: 5,
            },
          },
          axisTick: {
            show: false,
          },
          data: name,
        },
        yAxis: {
          name: "",
          type: "value",
          axisLabel: {
            color: "#fff",
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#DBDAD9",
              type: "dashed",
              dashOffset: 5,
            },
          },
          axisTick: {
            show: false,
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
        series: [
          {
            name: legend[0],
            type: "bar",
            stack: "总数",
            barWidth: "8",
            label: {
              show: false,
            },
            data: data[0],
          },
          {
            name: legend[1],
            type: "bar",
            stack: "总数",
            barWidth: "8",
            label: {
              show: false,
            },
            data: data[1],
          },
          {
            name: legend[2],
            type: "bar",
            stack: "总数",
            barWidth: "8",
            label: {
              show: false,
            },
            data: data[2],
          },
          {
            name: legend[3],
            type: "bar",
            stack: "总数",
            barWidth: "8",
            label: {
              show: false,
            },
            data: data[3],
          },
        ],
      };
    },
  },
};
</script>
<style scoped lang='less'>
</style>