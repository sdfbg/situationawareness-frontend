<template>
  <v-chart :option="option" :autoresize="true" :loading-options="echartsLoadingOptions" :loading="loading" class="chart"/>
</template>
<script>
import api from "@/api";
import VChart from "vue-echarts";
export default {
  name: "JointDisposal",
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
      this.$axios.post(api.getUpdateLicense()).then((res) => {
        this.allData = res.data;
        this.loading = false;
      });
    },
  },
  computed: {
    option() {
      if(this.loading) return {};
      const city = ["长春", "吉林","四平","辽源","通化","白山", "松原","白城","延边州","长白山"];
      let data1 = [],data2 = [], data1Sum = 0, data2Sum = 0;
      for (const prop in this.allData) {
        this.allData[prop].forEach(d => {
          if (d.ZT == "未换证") {
            data1.push(d.COUNT);
            data1Sum = data1Sum + d.COUNT;
          }
          if (d.ZT == "未审验") {
            data2.push(d.COUNT);
            data2Sum = data2Sum + d.COUNT;
          }
        });
      }
      const barWidth = 12;
      const color1 = {
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
            color: "rgba(181,183,59,1)",
          },
          {
            offset: 1,
            color: "rgba(181,183,59,.5)",
          },
        ],
      };
      const color2 = {
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
        //提示框
        tooltip: {
          show: true,
        },
        title: {
          text: "未换证总数:" + data1Sum + " " + "未审验总数:" + data2Sum ,
          textStyle: {
            color: "#fff",
            fontSize: 14,
          },
          x: "left",
          y: "5",
        },
        legend: {
          data: ["未换证", "未审验"],
          icon: "rect",
          top: 5,
          x: "right",
          itemWidth: 18,
          itemHeight: 10,
          textStyle: {
            color: "#fff",
            fontWeight: "normal",
            fontSize: 12,
          },
        },
        grid: {
          top: "12%",
          left: "0%",
          bottom: "0%",
          right: "4%",
          containLabel: true,
        },
        animation: false,
        dataZoom: [
          {
            show: true,
            type: "inside",
            realtime: true,
            start: 0,
            end: 50,
            xAxisIndex: [0]
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
            data: city,
          },
          {
            type: "category",
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            splitArea: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            data: city,
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
              formatter: function(value) {
                return value / 10000 + "万";
              }
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
            //1上
            name: "",
            type: "pictorialBar",
            symbolSize: [barWidth, 8],
            symbolOffset: ["-81%", -5],
            symbolPosition: "end",
            z: 15,
            color: "#FDFF54",
            zlevel: 2,
            data: data1,
          },
          {
            //2上
            name: "",
            type: "pictorialBar",
            symbolSize: [barWidth, 8],
            symbolOffset: ["81%", -5],
            symbolPosition: "end",
            z: 15,
            color: "#5EE7FE",
            zlevel: 2,
            data: data2,
          },
          {
            name: "未换证",
            type: "bar",
            barGap: "60%",
            barWidth: barWidth,
            itemStyle: {
              //
              // color: '',
              color: color1,
              borderColor: color1,
              borderWidth: 1,
              borderType: "solid",
            },
            label: {
              show: true,
              formatter: "{c}",
              position: "top",
              color: "#FCFF54",
              fontSize: 12,
              textAlign: "center",
            },
            zlevel: 2,
            data: data1,
          },
          {
            name: "未审验",
            type: "bar",
            barGap: "60%",
            barWidth: barWidth,
            itemStyle: {
              // color: 'rgba(255,164,41,.16)',
              color: color2,
              borderColor: color2,
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
            data: data2,
          },
          {
            //1下
            name: "",
            type: "pictorialBar",
            symbolSize: [barWidth, 8],
            symbolOffset: ["-81%", 5],
            z: 12,
            color: "#818229",
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
          {
            //2下
            name: "",
            type: "pictorialBar",
            symbolSize: [barWidth, 8],
            symbolOffset: ["81%", 5],
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