<template>
  <div
    id="IllegalToAccident"
    style="height: calc(100% - 0.5em); width: 100%"
  ></div>
</template>
<script>
import api from "@/api";
import * as echarts from "echarts";
export default {
  name: "IllegalToAccident",
  data() {
    return {
      chart: undefined,
      fetched: false,
      allData: []
    };
  },
  props:["year","city"],
  watch: {
    year() {
      this.init();
    },
    city() {
      this.init();
    },
  },
  mounted() {
    this.fetchData();
  },
  methods: {   
    fetchData() {
      this.$axios.post(api.manageAccident("rightDown")).then((res) => {
        this.fetched = true;
        this.allData = res.data;
        this.init();
      })
    },
    init() {
      if (!this.fetched) {
          return;
      }
      if (!this.chart) {
          this.chart = this.$echarts.init(
            document.getElementById("IllegalToAccident")
          );
      }
      let enterpriseAlertEchart = this.$echarts.init(
        document.getElementById("IllegalToAccident")
      );
      const echartsData = this.allData.filter(d=>this.city=='220000'?d.time==this.year:d.time==this.year&&d.city==this.city);
      const name = [], countMap = {};
      echartsData.forEach(element => {
        const {wfms, count} = element;
        if (name.indexOf(wfms) > -1) {
          countMap[wfms] = countMap[wfms] + count;
        } else {
          name.push(wfms);
          countMap[wfms] = count;
        }
      });
      const seriesData = name.map(n=>({name:n, value: countMap[n]}));
      const option = {
        tooltip: {
          trigger: "axis",
        },
        legend: {
          top: "0%",
          x: "center",
          textStyle: {
            color: "#fff",
          },
          itemWidth: 15,
          // formatter: function(name) {
          //   return echarts.truncateText(name,'...');
          // },
        },
        grid: {
          top: "15%",
          left: "5%",
          right: "0%",
          bottom: "0%",
          containLabel: true,
        },
        xAxis: {
          type: "value",
          axisLine: {
            show: false,
            lineStyle: {
              color: "rgba(255,255,255,0.8)",
            },
          },
          axisLabel: {
            show: false,
          },
          splitLine: {
            lineStyle: {
              color: "rgba(255,255,255,0.3)", // 分割线颜色
            },
          },
        },
        yAxis: {
          type: "category",
          data: name,
          axisLabel: {
            color: "rgba(255,255,255,1)",
            // rotate: "-60"
            formatter: function(name){
              var newName = '';
              const nameNumber = name.length;
              const provideNum = 5;
              const rowNumber = Math.ceil(nameNumber / provideNum);
              if (nameNumber > provideNum) {
                for (let i = 0; i < rowNumber; i++) {
                  var tempStr = '';
                  var start = i * provideNum;
                  var end = start + provideNum;
                  if (i === rowNumber -1) {
                    tempStr = name.substring(start, nameNumber)
                  } else {
                    tempStr = name.substring(start, end) + '\n';
                  }
                  newName += tempStr;
                }
              } else {
                newName = name
              }
              return newName;
            }
          },
        },
        dataZoom: [
          {
            show: false,
            width: 10,
            height: "100%",
            // 指定x/y轴数据维度 "yAxisIndex":
            yAxisIndex: [0],
            start: 100,
            end: 50,
            realtime: true,
            // 距离右侧距离
            right: 0,
            orient: "vertical",
            backgroundColor: "#040E1A",
            borderColor: "#31BFE8",
            fillerColor: "#70D1F9",
          },
        ],
        series: [
          {
            name: "违法数量",
            type: "bar",
            stack: "total",
            label: {
              show: false,
            },
            data: seriesData,
            barWidth: 12,
            itemStyle: {
              label: {
                show: false,
              },
              labelLine: {
                show: false,
              },
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "rgba(41,244,236,.2)" },
                { offset: 0.5, color: "#00CA95" },
                { offset: 1, color: "rgba(41,244,236,.2)" },
              ]),
              borderColor: "rgba(41,244,236,0.7)",
              // shadowBlur: 16,
              shadowColor: "#a2f9f7",
            },
          },
        ],
      };
      let startNumber = 0;
      // 有多少条数据
      let yAxisDatalen = name.length;
      // len的值,可以根据你的数量量设置,不要超过yData.length的值,不然不会动
      let len = 6;
      // const totals = [
      //   2000, 1500, 1320, 1617, 1918, 1402, 1683, 1230, 1171, 2234, 1313, 1341,
      //   1123,
      // ];
      // option.series.forEach((s) => {
      //   s.data = s.data.map((d, i) => Math.round((d / totals[i]) * 100));
      // });
      enterpriseAlertEchart.setOption(option);
      this.timer && clearInterval(this.timer);
      this.timer = setInterval(function () {
        if (startNumber === yAxisDatalen - len) {
          startNumber = 0;
        }

        enterpriseAlertEchart.dispatchAction({
          type: "dataZoom",
          startValue: startNumber,
          endValue: startNumber + len,
        });
        startNumber++;
      }, 1000);
      // enterpriseAlertEchart.setOption({
      //   title: {
      //     left: "center",
      //   },
      //   tooltip: {
      //     trigger: "item",
      //     formatter: "{a} <br/>{b} : {c} ({d}%)",
      //   },
      //   legend: {
      //     type: "scroll",
      //     orient: "vertical",
      //     data: name,
      //     textStyle: {
      //       color: "#fff",
      //     },
      //   },
      //   series: [
      //     {
      //       name: "违法行为",
      //       type: "pie",
      //       radius: "55%",
      //       center: ["40%", "50%"],
      //       data: seriesData,
      //       emphasis: {
      //         itemStyle: {
      //           shadowBlur: 10,
      //           shadowOffsetX: 0,
      //           shadowColor: "#ffffff",
      //         },
      //       },
      //     },
      //   ],
      // });
    },
  },
};
</script>