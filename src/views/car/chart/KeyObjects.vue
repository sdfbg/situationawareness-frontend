<template>
  <div id="keyObjects" style="height: 100%; width: 100%;"></div>
</template>
<script>
import api from "@/api";
export default {
  name: "KeyObjects",
  data() {
    return {
      echartData: [],
      chart: undefined,
      allData: {},
    };
  },
  mounted() {
    this.chart = this.$echarts.init(document.getElementById("keyObjects"));
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
      this.$axios.post(api.getUpdateCard()).then((res) => {
        this.allData = res.data;
        this.init();
      })
    },
    init() {
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
      ];
      let dataG = [], dataM = [], dataQ = [], //G：为检验；M：未报废；G：违法未处理
        sumG = 0, sumM = 0, sumQ = 0;
      this.allData.Q.forEach(d => {
        dataQ.push(d.COUNT);
        sumQ = sumQ + d.COUNT;
      });
      this.allData.M.forEach(d => {
        dataM.push(d.COUNT);
        sumM = sumM + d.COUNT;
      });
      this.allData.G.forEach(d => {
        dataG.push(d.COUNT);
        sumG = sumG + d.COUNT;
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
            color: "rgba(181,183,59,1)",
          },
          {
            offset: 1,
            color: "rgba(181,183,59,.5)",
          },
        ],
      };
      let color2 = {
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
      let color3 = {
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
            color: "rgba(0, 202, 149,1)",
          },
          {
            offset: 1,
            color: "rgba(0, 202, 149,.5)",
          },
        ],
      };
      this.chart.setOption({
        title: {
          text: "总数：" + sumQ + "/" + sumM + "/" + sumG,
          textStyle: {
            color: "#fff",
            fontSize: 14,
          },
          x: "left",
          y: "5",
        },
        //提示框
        tooltip: {
          show: true,
        },
        legend: {
          data: ["未检验", "未报废", "未处理"],
          orient: "vertical",
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
          top: "25%",
          left: "2%",
          bottom: "0%",
          right: "2%",
          containLabel: true,
        },
        animation: false,
        dataZoom: [
          {
            show: true,
            type: "inside",
            realtime: true,
            start: 0,
            end: 30,
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
            symbolOffset: [-19, -5],
            symbolPosition: "end",
            z: 15,
            color: "#FDFF54",
            zlevel: 2,
            data: dataQ,
          },
          {
            //2上
            name: "",
            type: "pictorialBar",
            symbolSize: [barWidth, 8],
            symbolOffset: [0, -5],
            symbolPosition: "end",
            z: 15,
            color: "#5EE7FE",
            zlevel: 2,
            data: dataM,
          },
          {
            //3上
            name: "",
            type: "pictorialBar",
            symbolSize: [barWidth, 8],
            symbolOffset: [19, -5],
            symbolPosition: "end",
            z: 15,
            color: "#5EE7FE",
            zlevel: 2,
            data: dataG,
          },
          {
            name: "未检验",
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
            data: dataQ,
          },
          {
            name: "未报废",
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
            data: dataM,
          },
          {
            name: "未处理",
            type: "bar",
            barGap: "60%",
            barWidth: barWidth,
            itemStyle: {
              // color: 'rgba(255,164,41,.16)',
              color: color3,
              borderColor: color3,
              borderWidth: 1,
              borderType: "solid",
            },
            label: {
              show: true,
              formatter: "{c}",
              position: "top",
              color: "#00ca95",
              fontSize: 12,
              textAlign: "center",
            },
            zlevel: 2,
            data: dataG,
          },
          {
            //1下
            name: "",
            type: "pictorialBar",
            symbolSize: [barWidth, 8],
            symbolOffset: [-19, 5],
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
          {
            //3下
            name: "",
            type: "pictorialBar",
            symbolSize: [barWidth, 8],
            symbolOffset: [19, 5],
            z: 12,
            color: "#00ca95",
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
      this.chart.hideLoading();
    },
  },
};
</script>