<template>
  <v-chart :option="option" :autoresize="true" :loading-options="echartsLoadingOptions" :loading="loading" class="chart"/>
</template>
<script>
import VChart from "vue-echarts";
import api from "@/api";
export default {
  name: "TrafficViolationBar",
  components: { VChart },
  inject: ["echartsLoadingOptions"],
  data() {
    return {
      allData: [],
      loading: true
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.$axios.post(api.getAccidentCount()).then((res) => {
        this.allData = res.data;
        this.loading = false;
      });
    },
  },
  computed: {
    option() {
      if(this.loading) return {};
      let name = [], value = [], sum = 0;
      this.allData.forEach(d => {
        name.push(d.DMSM1);
        value.push(d.COUNT);
        sum = sum + d.COUNT;
      });
      let barWidth = 12;
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
          text: "亡人事故总数：" + sum,
          textStyle: {
            color: "#fff",
            fontSize: 14,
          },
          x: "left",
          y: "5",
        },
        legend: {
          data: ["事故数"],
          icon: "rect",
          top: 5,
          x: "right",
          itemWidth: 20,
          itemHeight: 12,
          textStyle: {
            color: "#fff",
            fontWeight: "normal",
            fontSize: 12,
          },
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
            end: 100,
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
            data: name,
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
            symbolSize: [barWidth, 8],
            symbolOffset: [0, -5],
            symbolPosition: "end",
            z: 15,
            color: "#5EE7FE",
            zlevel: 2,
            data: value,
          },
          {
            name: "事故数",
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
            data: value,
          },
          {
            name: "",
            type: "pictorialBar",
            symbolSize: [barWidth, 8],
            symbolOffset: [0, 5],
            z: 12,
            color: "#2871AA",
            data: [
              {
                name: "",
                value: "100",
              },
              {
                name: "",
                value: "100",
              },
              {
                name: "",
                value: "100",
              },
              {
                name: "",
                value: "100",
              },
              {
                name: "",
                value: "100",
              },
              {
                name: "",
                value: "100",
              },
              {
                name: "",
                value: "100",
              },
              {
                name: "",
                value: "100",
              },
              {
                name: "",
                value: "100",
              },
            ],
          },
        ],
      };
    },
  },
};
</script>