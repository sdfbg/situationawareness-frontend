<template>
  <div id="kiloPoliceNum" style="height: calc(100% - 0.5em); width: 100%"></div>
</template>
<script>
import api from "../../../api";
// import * as echarts from "echarts";
export default {
  name: "KiloPoliceNum",
  data() {
    return {
      echartData: [],
      condition: {
        dateType: 2,
      },
    };
  },
  mounted() {
    this.getEchartsData();
    this.init();
  },
  methods: {
    getEchartsData() {
      this.$axios.post(api.getManageLeftTop(), this.condition).then((res) => {
        this.echartData = res.data.data;
      });
    },
    init() {
      let kiloPoliceNum = this.$echarts.init(
        document.getElementById("kiloPoliceNum")
      );
      let city = [
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
          "森林",
          "高速",
          "梅河口",
        ],
        data1 = [
          "91",
          "51",
          "29",
          "91",
          "51",
          "51",
          "29",
          "91",
          "51",
          "25",
          "65",
          "23",
          "34",
        ],
        data2 = [
          "83",
          "81",
          "20",
          "83",
          "81",
          "81",
          "20",
          "83",
          "81",
          "45",
          "35",
          "29",
          "44",
        ];
      let barWidth = 11;
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
            color: "rgba(181,183,59,1)",
          },
          {
            offset: 1,

            color: "rgba(181,183,59,.5)",
          },
        ],
      };
      var color2 = {
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
      kiloPoliceNum.setOption({
        //提示框
        tooltip: {
          show: true,
        },
        legend: {
          data: ["里程", "民警数"],
          icon: "rect",
          top: 5,
          x: "center",
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
            name: "里程",
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
            name: "民警数",
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
      });
    },
  },
};
</script>