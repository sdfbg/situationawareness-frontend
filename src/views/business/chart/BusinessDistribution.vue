<template>
  <v-chart :option="option" :autoresize="true" :loading-options="echartsLoadingOptions" :loading="loading"  class="chart"/>
</template>
<script>
import VChart from "vue-echarts";
import cities from "@/common/city";
export default {
  name: "BusinessDistribution",
  components: { VChart },
  inject: ["echartsLoadingOptions"],
  data() {
    return {
      cities,
      echart: undefined,
      echartData: {},
    };
  },
  props: {
    businessCountByArea: Array,
    loading: {
      type: Boolean,
      required: true,
    },
  },
  watch: {
    businessCountByArea() {
      this.init();
    },
  },
  computed: {
    option() {
      if(this.loading) {
        return;
      }
      let data = this.cities
        .map((c) => ({
          name: c.name,
          value: this.businessCountByArea
            .filter((b) => b.code.slice(0, 4) == c.code.slice(0, 4))
            .reduce((total, currentValue) => {
              return total + currentValue.total;
            }, 0),
        }));
      console.log(data);
      let name = [], value = [];
      data.forEach(d => {
        name.push(d.name);
        value.push(d.value);
      });
      let barWidth = 16;
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
      return {
        title: {
          text: "企业总数：" + 54041,
          top: 5,
          textStyle: {
            color: "#fff",
            fontSize: 14,
          },
        },
        //提示框
        tooltip: {
          show: true,
        },
        legend: {
          // data: ["企业数量"],
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
        grid: {
          top: "20%",
          left: "2%",
          bottom: "0%",
          right: "2%",
          containLabel: true,
        },
        dataZoom: [
          {
            type: "inside",
            show: true,
            start: 0,
            end: 50,
            xAxisIndex: [0],
            top: "10%",
            width: "10",
            bottom: "10%",
            height: "80%",
            backgroundColor: "#1C0870",
            fillerColor: "#1687C6",
            borderColor: "rgba(0,255,255,.4)",
            textStyle: {
              color: "#05D5FF",
            },
            zoomLock: true,
            moveHandleSize: 0,
          },
        ],
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
            //上
            name: "",
            type: "pictorialBar",
            symbolSize: [barWidth, 10],
            symbolOffset: [0, -5],
            symbolPosition: "end",
            z: 15,
            color: "#5EE7FE",
            zlevel: 2,
            data: value,
          },
          {
            name: "企业数量",
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
            data: value,
          },
          {
            //下
            name: "",
            type: "pictorialBar",
            symbolSize: [barWidth, 10],
            symbolOffset: [0, 5],
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
      };
    },
  },
};
</script>