<template>
  <div id="enterpriseAlertYaoSu" style="width: 100%; height: 100%"></div>
</template>
<script>
import api from "@/api";
export default {
  name: "EnterpriseAlertYaoSu",
  data() {
    return {
      chart: undefined,
      allData: {},
      fetched: false,
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.$axios.post(api.getWarnAreaLevel()).then((res) => {
        this.fetched = true;
        this.allData = res.data.data;
        this.init();
      })
    },
    init() {
      if (!this.fetched) {
        return ;
      }
      if (!this.chart) {
        this.chart = this.$echarts.init(
          document.getElementById("enterpriseAlertYaoSu")
        );
      }
      let name = [], value = [];
      for (const prop in this.allData) {
        if (prop == "car") {
          name.push("车辆");
        }
        if (prop == "person") {
          name.push("驾驶人");
        }
        if (prop == "road") {
          name.push("道路");
        }
        if (prop == "company") {
          name.push("企业");
        }
        value.push(this.allData[prop])
      }
      this.chart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: { type: "shadow" },
        },
        color: ["#FEFE29"],
        legend: {
          name: "统计数量",
          top: 10,
          left: "center",
          itemWidth: 10,
          itemHeight: 10,
          padding: [5, 10],
          textStyle: {
            fontSize: 10,
            color: "#96A4F4",
          },
        },
        grid: {
          left: "0%",
          right: "0%",
          bottom: "6%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          axisLabel: {
            color: "#96A4F4",
            rotate: 0, //倾斜度
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
          name: "统计数量",
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
        series: {
          name: "统计数量",
          type: "bar",
          // stack: "总数",
          barWidth: "10",
          label: {
            show: false,
          },
          data: value,
        },
      });
    },
  },
};
</script>