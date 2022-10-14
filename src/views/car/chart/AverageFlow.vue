<template>
  <div id="averageFlow" style="height: calc(100% - 0.1rem); width: 100%"></div>
</template>
<script>
import api from "./../../../api/index";
export default {
  name: "AverageFlow",
  data() {
    return {
      echartsData: {
        name: [],
        redCount: [],
        orangeCount: [],
        yellowCount: [],
        greenCount: [],
      },
    };
  },
  mounted() {
    this.getEchartsData();
  },
  methods: {
    getEchartsData() {
      this.$axios.post(api.getCarMidDown()).then((res) => {
        let data = res.data.data;
        data.forEach((element) => {
          this.echartsData.name.push(element.name);
          this.echartsData.redCount.push(element.red);
          this.echartsData.orangeCount.push(element.orange);
          this.echartsData.yellowCount.push(element.yellow);
          this.echartsData.greenCount.push(element.green);
        });
        this.init();
      });
    },
    init() {
      let averageFlow = this.$echarts.init(
        document.getElementById("averageFlow")
      );
      // let newchartName = ["公路客运", "旅游客运", "货运", "校车", "危化品运输"],
      //   newchartValue1 = ["91", "51", "29", "91", "51"],
      //   newchartValue2 = ["83", "81", "20", "83", "81"],
      //   newchartValue3 = ["45", "34", "67", "51", "21"],
      //   newchartValue4 = ["34", "29", "45", "37", "67"];
      let barWidth = 20;
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
            color: "rgba(230,32,60,1)",
          },
          {
            offset: 1,
            color: "rgba(230,32,60,.5)",
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
            color: "rgba(229,158,7,1)",
          },
          {
            offset: 1,
            color: "rgba(229,158,7,.5)",
          },
        ],
      };
      var color3 = {
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
            color: "rgba(210,229,7,1)",
          },
          {
            offset: 1,
            color: "rgba(210,229,7,.5)",
          },
        ],
      };
      var color4 = {
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
            color: "rgba(7,229,12,1)",
          },
          {
            offset: 1,
            color: "rgba(7,229,12,.5)",
          },
        ],
      };
      averageFlow.setOption({
        title: {
          text: "公路客运总数：" + 12504 + "   " + "旅游客运总数：" + 3452 + "   " + "危险品运输总数：" + 2024 + "   " + "校车总数：" + 322+ "  " +  "货车总数：" + 33284,
          textStyle: {
            color: "#fff",
            fontSize: 14,
          },
          x: "left",
          y: "5",
        },
        legend: {
          data: ["红色预警", "橙色预警", "黄色预警", "绿色预警"],
          icon: "rect",
          top: 5,
          x: "right",
          itemWidth: 18,
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
            data: this.echartsData.name,
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
            symbolSize: [barWidth, 10],
            symbolOffset: [-48, -5],
            symbolPosition: "end",
            z: 15,
            color: "#B41C05",
            zlevel: 2,
            data: this.echartsData.redCount,
          },
          {
            //2上
            name: "",
            type: "pictorialBar",
            symbolSize: [barWidth, 10],
            symbolOffset: [-16, -5],
            symbolPosition: "end",
            z: 15,
            color: "#B45605",
            zlevel: 2,
            data: this.echartsData.orangeCount,
          },
          {
            //1上
            name: "",
            type: "pictorialBar",
            symbolSize: [barWidth, 10],
            symbolOffset: [16, -5],
            symbolPosition: "end",
            z: 15,
            color: "#D2B403",
            zlevel: 2,
            data: this.echartsData.yellowCount,
          },
          {
            //2上
            name: "",
            type: "pictorialBar",
            symbolSize: [barWidth, 10],
            symbolOffset: [48, -5],
            symbolPosition: "end",
            z: 15,
            color: "#32B904",
            zlevel: 2,
            data: this.echartsData.greenCount,
          },

          {
            name: "红色预警",
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
            data: this.echartsData.redCount,
          },
          {
            name: "橙色预警",
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
            data: this.echartsData.orangeCount,
          },
          {
            name: "黄色预警",
            type: "bar",
            barGap: "60%",
            barWidth: barWidth,
            itemStyle: {
              //
              // color: '',
              color: color3,
              borderColor: color3,
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
            data: this.echartsData.yellowCount,
          },
          {
            name: "绿色预警",
            type: "bar",
            barGap: "60%",
            barWidth: barWidth,
            itemStyle: {
              // color: 'rgba(255,164,41,.16)',
              color: color4,
              borderColor: color4,
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
            data: this.echartsData.greenCount,
          },

          {
            //1下
            name: "",
            type: "pictorialBar",
            symbolSize: [barWidth, 10],
            symbolOffset: [-48, 5],
            z: 12,
            color: "rgba(180,28,5,.5)",
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
            symbolSize: [barWidth, 10],
            symbolOffset: [-16, 5],
            z: 12,
            color: "rgba(180,86,5,.5)",

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
            //1下
            name: "",
            type: "pictorialBar",
            symbolSize: [barWidth, 10],
            symbolOffset: [16, 5],
            z: 12,
            color: "rgba(210,180,3,.5)",
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
            symbolSize: [barWidth, 10],
            symbolOffset: [48, 5],
            z: 12,
            color: "rgba(50,185,4,.5)",

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
          // 头
        ],
      });
    },
  },
};
</script>