<template>
  <div id="enterpriseAlertPerson" :style="divStyle"></div>
</template>
<script>
import api from "@/api";
// import { color } from 'echarts';
export default {
  name: "EnterpriseAlert",
  props:["divStyle"],
  data() {
    return {
      chart: undefined,
      cities: [
        "长春市",
        "吉林市",
        "四平市",
        "辽源市",
        "通化市",
        "白山市",
        "松原市",
        "白城市",
        "延边州",
        "长白山",
        "高速",
        "森林",
        "梅河口市",
      ],
      legend: ["红色预警", "橙色预警", "黄色预警", "绿色预警"],
    };
  },
  mounted() {
    this.chart = this.$echarts.init(document.getElementById("enterpriseAlertPerson"));
    this.chart.showLoading({
    text: "正在加载...",
    textColor: "#fff",
    color: "#fff",
    maskColor: "transparent",
    X: "center",
    y: "center",
    effect: "spin"
  });
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.$axios.post(api.getWarnByArea()).then((res) => {
        this.init(res.data.data);
      });
    },
    init(data) {
      const defaultData = {};
      let colorKeys = ["redCount", "orangeCount", "yellowCount", "greenCount"];
      let dataNew = this.cities.map(city => {
        let indexData = data.find(d => d.belongArea == city);
        return {
          name: city,
          redCount: indexData.redCount,
          orangeCount: indexData.orangeCount,
          yellowCount: indexData.yellowCount,
          greenCount: indexData.greenCount,
        }
      });
      let redCount = [], orangeCount = [], yellowCount = [], greenCount = [];
      dataNew.forEach(d => {
        redCount.push(d.redCount);
        orangeCount.push(d.orangeCount);
        yellowCount.push(d.yellowCount);
        greenCount.push(d.greenCount);
      });
      colorKeys.forEach((c) => (defaultData[c] = 0));
      // let typeKeys = ["car", "road", "person", "company"];
      // const result = this.cities
      //   .map((city) =>
      //     typeKeys
      //       .map((type) => data[type])
      //       .filter((ds) => ds)
      //       .map((ds) => ds.filter((d) => d.area == city))
      //       .flat()
      //   )
      //   .map((datas) => {
      //     return datas.reduce(
      //       (c1, c2) => {
      //         const t = {};
      //         colorKeys.forEach((c) => (t[c] = c1[c] + c2[c]));
      //         return t;
      //       },
      //       { ...defaultData }
      //     );
      //   });
      // const series = colorKeys.map((l, i) => ({
      //   name: this.legend[i],
      //   type: "bar",
      //   stack: "总数",
      //   barWidth: "8",
      //   label: {
      //     show: false,
      //   },
      //   data: result.map((r) => r[l]),
      // }));
      this.chart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: { type: "shadow" },
        },
        color: ["#E6203C", "#FC5F2F", "#FEFE29", "#5FD456"],
        legend: {
          top: 10,
          left: "center",
          itemWidth: 10,
          itemHeight: 10,
          padding: [5, 10],
          textStyle: {
            fontSize: 10,
            color: "#96A4F4",
          },
          data: this.legend,
        },
        grid: {
          left: "0%",
          right: "0%",
          bottom: "6%",
          containLabel: true,
        },
        dataZoom: [
          {
            show: true,
            type: "inside",
            realtime: true,
            start: 0,
            end: 50,
            xAxisIndex: [0],
            bottom: "12",
            left: "45",
            height: 5,
            borderColor: "rgba(0,0,0,0)",
            textStyle: {
              color: "#05D5FF",
            },
          },
        ],
        xAxis: {
          type: "category",
          axisLabel: {
            color: "#96A4F4",
            rotate: 0, //倾斜度
            interval: 0
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
          data: this.cities,
        },
        yAxis: {
          name: "",
          type: "value",
          nameRotate: 45,
          scale: true,
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
            name: "红色预警",
            type: "bar",
            stack: "总数",
            barWidth: "10",
            label: {
              show: false,
            },
            data: redCount,
          },
          {
            name: "橙色预警",
            type: "bar",
            stack: "总数",
            barWidth: "10",
            label: {
              show: false,
            },
            data: orangeCount,
          },
          {
            name: "黄色预警",
            type: "bar",
            stack: "总数",
            barWidth: "10",
            label: {
              show: false,
            },
            data: yellowCount,
          },
          {
            name: "绿色预警",
            type: "bar",
            stack: "总数",
            barWidth: "10",
            label: {
              show: false,
            },
            data: greenCount,
          },
        ],
      });
      this.chart.hideLoading();
    },
  },
};
</script>