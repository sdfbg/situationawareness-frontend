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
        "高速",
        "森林",
        "梅河口",
      ];
      let data1 = [336, 324, 218, 240, 200, 235, 225, 235, 189,136, 124, 218, 240];
      let data2 = [300, 304, 210, 200, 180, 205, 265, 295, 249,100, 104, 210, 200]; 
      let options=[
        {
          xAxis: {
              data: ["长春","吉林","四平","松原",],
          },
          series: [
              {
                  data: [336, 324, 218, 240,],
              },
              {
                  data: [300, 304, 210, 200,],
              },
              {
                  data: [336, 324, 218, 240,],
              },
              {
                  data: [300, 304, 210, 200,],
              },
          ],
        },
      ];
      for(let i=0;i<(city.length-4);i++ ){
        let newCity = city.slice(i+1).slice(0,4)
        options.push(
          {
            xAxis: {
                data: newCity,
            },
             series: [
                {
                    data: data1.slice(i+1).slice(0,4),
                },
                
                {
                    data: data2.slice(i+1).slice(0,4),
                },
                {
                    data: data1.slice(i+1).slice(0,4),
                },
                
                {
                    data: data2.slice(i+1).slice(0,4),
                },
            ],
          }
        )
      }
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
      let page =[]
      for(let i=1;i<=options.length;i++){
        page.push(i)
      }
      let option = {
        baseOption:{
          timeline: {
            show: false,
            axisType: 'category',
            autoPlay: true,
            playInterval: 2000,
            data: page,
          },
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
        /* dataZoom: [
          //滚动条
          {
            show: true,
            type: "inside",
            realtime: true,
            start: 0,
            end: 50,
            xAxisIndex: [0],
            bottom: "10",
            left: "30",
            height: 10,
            borderColor: "rgba(0,0,0,0)",
            textStyle: {
              color: "#05D5FF",
            },
          },
        ], */
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
            // data: city,
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
            // data: data1,
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
            // data: data2,
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
            // data: data1,
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
            // data: data2,
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
            symbolOffset: [13, 5],
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
              
            ],
          },
        ],
        },
        options:options
      }
      disposalFeedback.setOption(option);
      
    },
  },
};
</script>