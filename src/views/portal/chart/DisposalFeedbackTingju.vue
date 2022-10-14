<template>
  <div
    id="disposalFeedback"
    style="height: calc(100% - 0.4rem); width: 100%"
  ></div>
</template>
<script>
// import * as echarts from "echarts";
export default {
  name: "DisposalFeedback",
  mounted() {
    this.drawBar();
  },
  methods: {
    drawBar() {
      let disposalFeedback = this.$echarts.init(
        document.getElementById("disposalFeedback")
      );
      let city = [
        "公安厅",
        "交通运输厅",
        "农业农村厅",
        "教育厅",
        "卫生健康委员会",
        "市场监督管理局",
        "工业和信息化厅",
        "草原河林业局",
        "司法厅",

        "气象局",
        "宣传部",
        "网信办",
      ];
      let data1 = [36, 34, 28, 40, 20, 23, 25, 23, 19];
      let data2 = [30, 34, 10, 20, 18, 25, 26, 49, 29];
      // let data3 = [200, 204, 310, 100, 280, 255, 205, 215, 249];
      let barWidth = 16;
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
      disposalFeedback.setOption({
        //提示框
        tooltip: {
          show: true,
        },
        legend: {
          data: ["接收情况", "完成情况"],
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
          top: "20%",
          left: "2%",
          bottom: "0%",
          right: "2%",
          containLabel: true,
        },
        animation: false,
        dataZoom: [
          //滚动条
          {
            show: true,
            type: "inside",
            realtime: true,
            start: 0,
            end: 40,
            xAxisIndex: [0],
            bottom: "10",
            left: "30",
            height: 10,
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
          // {
          //   type: "category",
          //   axisLine: {
          //     show: false,
          //   },
          //   axisTick: {
          //     show: false,
          //   },
          //   axisLabel: {
          //     show: false,
          //   },
          //   splitArea: {
          //     show: false,
          //   },
          //   splitLine: {
          //     show: false,
          //   },
          //   data: newchartName,
          // },
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
            symbolSize: [barWidth, 10],
            symbolOffset: [-13, -5],
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
            symbolSize: [barWidth, 10],
            symbolOffset: [13, -5],
            symbolPosition: "end",
            z: 15,
            color: "#5EE7FE",
            zlevel: 2,
            data: data2,
          },
          {
            name: "接收情况",
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
            name: "完成情况",
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
            symbolSize: [barWidth, 10],
            symbolOffset: [-13, 5],
            z: 12,
            color: "#818229",
            data: [
              {
                name: "",
                value: "0",
              },
              {
                name: "",
                value: "0",
              },
              {
                name: "",
                value: "0",
              },
              {
                name: "",
                value: "0",
              },
              {
                name: "",
                value: "0",
              },
              {
                name: "",
                value: "0",
              },
              {
                name: "",
                value: "0",
              },
              {
                name: "",
                value: "0",
              },
              {
                name: "",
                value: "0",
              },
            ],
          },
          {
            //2下
            name: "",
            type: "pictorialBar",
            symbolSize: [barWidth, 10],
            symbolOffset: [13, 5],
            z: 12,
            color: "#2871AA",
            data: [
              {
                name: "",
                value: "0",
              },
              {
                name: "",
                value: "0",
              },
              {
                name: "",
                value: "0",
              },
              {
                name: "",
                value: "0",
              },
              {
                name: "",
                value: "0",
              },
              {
                name: "",
                value: "0",
              },
              {
                name: "",
                value: "0",
              },
              {
                name: "",
                value: "0",
              },
              {
                name: "",
                value: "0",
              },
            ],
          },
        ],
      });
    },
  },
};
</script>