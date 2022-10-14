<template>
  <div id="accidentForm" style="height: calc(100% - 0.1rem); width: 100%"></div>
</template>
<script>
import api from "@/api";
import moment from "moment";
export default {
  name: "AccidentForm",
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
      this.$axios.post(api.manageAccident("leftMid")).then((res) => {
        this.fetched = true;
        this.allData = res.data.map(d=>({...d,time: moment(d.time,"YYYY-MM").format("YYYY")}));
        this.init()
      });
    },
    init() {
      if (!this.fetched) {
        return;
      }
      if (!this.chart) {
        this.chart = this.$echarts.init(
          document.getElementById("accidentForm")
        );
      }
      const data = this.allData.filter(d=>this.city=='220000'?d.time==this.year:d.time==this.year&&d.city==this.city)
      let newchartName = []
      const countMap = {}
      data.forEach(d => {
        const {sgxt,count} = d
        if(newchartName.indexOf(sgxt)>-1){
          countMap[sgxt] = countMap[sgxt]+count
        }else {
          newchartName.push(sgxt)
          countMap[sgxt] = count
        }
      });
      const newchartValue1 = newchartName.map(n=>countMap[n])
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
            color: "rgba(43,164,184,1)",
          },
          {
            offset: 1,
            color: "rgba(43,164,184,.5)",
          },
        ],
      };
      this.chart.setOption({
        // title: {
        //   text: "总数：" + 32452,
        //   textStyle: {
        //     color: "#0ff",
        //     fontSize: 14,
        //   },
        //   x: "left",
        //   y: "5",
        // },
        legend: {
          data: ["事故数"],
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
        dataZoom: [
          {
            type: "inside",
            show: true,
            start: 0,
            end: 30,
            xAxisIndex: [0],
            zoomLock: true,
            moveHandleSize: 0,
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
            data: newchartName,
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
            data: newchartName,
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
            symbolSize: [barWidth, 10],
            symbolOffset: [0, -5],
            symbolPosition: "end",
            z: 15,
            color: "#5EE7FE",
            zlevel: 2,
            data: newchartValue1,
          },
          {
            name: "事故数",
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
              color: "#5EE7FE",
              fontSize: 12,
              textAlign: "center",
            },
            zlevel: 2,
            data: newchartValue1,
          },
          {
            name: "",
            type: "pictorialBar",
            symbolSize: [barWidth, 10],
            symbolOffset: ["0", 5],
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