<template>
  <v-chart :option="option" :autoresize="true" :loading-options="echartsLoadingOptions" :loading="loading" class="chart"/>
</template>
<script>
import VChart from "vue-echarts";
import api from "@/api";
export default {
  name: "YuJingDengji",
  components: { VChart },
  inject: ["echartsLoadingOptions"],
  data() {
    return {
      echartsData: [],
      legend: ["红色预警", "橙色预警", "黄色预警", "绿色预警"],
      loading: true
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.$axios.post(api.getCarRightTop()).then((res) => {
        this.echartsData = res.data.data;
        this.loading = false;
      });
    },
  },
  computed: {
    option() {
      if(this.loading) return {};
      let name = [], red = [], orange = [], yellow = [], green = [];
      this.echartsData.forEach((d) => {
        name.push(d.name)
        red.push(d.red);
        orange.push(d.orange);
        yellow.push(d.yellow);
        green.push(d.green);
      });
      return {
        title: {
          text: "预警总数：" + 602441,
          textStyle: {
            color: "#fff",
            fontSize: 14,
          },
          x: "left",
          y: "5",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: { type: "shadow" },
        },
        color: ["#E6203C", "#FC5F2F", "#FEFE29", "#5FD456"],
        legend: {
          top: 26,
          x: "left",
          itemWidth: 16,
          itemHeight: 10,
          textStyle: {
            fontSize: 10,
            color: "#96A4F4",
          },
        },
        grid: {
          left: "1%",
          right: "0%",
          bottom: "2%",
          containLabel: true,
        },
        dataZoom: [
          {
            show: true,
            type: "inside",
            realtime: true,
            start: 0,
            end: 30,
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
            formatter: function(value) {
              return value == 0 ? 0 : value / 10000 + "万";
            }
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
            name: "红色预警",
            type: "bar",
            stack: "总数",
            barWidth: "10",
            label: {
              show: false,
            },
            data: red,
          },
          {
            name: "橙色预警",
            type: "bar",
            stack: "总数",
            barWidth: "10",
            label: {
              show: false,
            },
            data: orange,
          },
          {
            name: "黄色预警",
            type: "bar",
            stack: "总数",
            barWidth: "10",
            label: {
              show: false,
            },
            data: yellow,
          },
          {
            name: "绿色预警",
            type: "bar",
            stack: "总数",
            barWidth: "10",
            label: {
              show: false,
            },
            data: green,
          },
        ],
      };
    },
  },
};
</script>
<style scoped lang='less'>
.chart {
  height: calc(100% - 0.1rem);
  width: 100%
}
</style>