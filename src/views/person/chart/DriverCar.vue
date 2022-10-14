<template>
  <v-chart :option="option" :autoresize="true" :loading-options="echartsLoadingOptions" :loading="loading" class="chart"/>
</template>
<script>
import VChart from "vue-echarts";
import api from "@/api";
export default {
  name: "DriverCar",
  components: {VChart},
  inject: ["echartsLoadingOptions"],
  data() {
    return {
      allData: {},
      loading: true
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.$axios.post(api.getDriverLicense()).then((res) => {
        this.allData = res.data;
        this.loading = false;
      })
    },
  },
  computed: {
    option() {
      let data = [];
      for (const prop in this.allData) {
        data.push({name: prop, value: this.allData[prop]})
      }
      let sum = 0;
      data.forEach(d => {
        sum += d.value;
      });
      return {
        color: ["#1fe5ea", "#1daeff", "#f4e051", "#06C955", "#d27461"],
        tooltip: {
          show: true,
          textStyle: {
            fontSize: 16,
            fontWeight: "bold"
          },
          formatter: "驾照类型<br />{b}：{c}<br />占比：{d}%"
        },
        legend: {
          top: "12%",
          left: "10%",
          icon: "rect",
          orient: "vertical",
          itemGap: 20,
          textStyle: {
            color: "#fff",
          },
        },
        title: {
          text: "驾照总数：" + sum,
          textStyle: {
            color: "#fff",
            fontSize: 14,
          },
          x: "center",
          y: "5",
        },
        graphic: {
          elements: [
            {
              type: "text",
              z: 4,
              style: {
                text: "驾照类型",
                fill: "#00ffff",
                font: '1.5em "STHeiti", sans-serif',
              },
              left: "50%",
              top: "46%",
            },
          ],
        },
        series: [
          //环形
          {
            name: "驾照类型",
            type: "pie",
            radius: ["60%", "72%"],
            center: ["60%", "50%"],
            hoverAnimation: false,
            label: {
              normal: {
                show: false,
              },
              emphasis: {
                show: false,
              },
            },
            zlevel: 1,
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: data,
          },
          //环形分割线
          {
            name: "",
            type: "gauge",
            radius: "80%",
            clockwise: true,
            startAngle: "90",
            center: ["60%", "50%"],
            endAngle: "-269.9999",
            splitNumber: 22,
            zlevel: 2,
            detail: {
              offsetCenter: [10, 20],
              formatter: " ",
            },
            axisLine: {
              lineStyle: {
                width: 0,
                opacity: 0,
              },
            },
            axisTick: {
              show: false,
            },
            markArea: {
              itemStyle: {
                color: "#0f0",
              },
            },
            splitLine: {
              show: true,
              length: 32,
              padding: [0, 0, 0],
              lineStyle: {
                color: "#022457",
                width: 3,
              },
            },
            axisLabel: {
              show: false,
            },
          },
          {
            type: "pie",
            name: "",
            tooltip: {
              show: false,
            },
            radius: ["50%", "52%"],
            center: ["60%", "50%"],
            hoverAnimation: false,
            clockWise: false,
            itemStyle: {
              normal: {
                color: "#fff",
              },
            },
            label: {
              show: false,
            },
            data: [100],
          },
        ],
      };
    },
  },
};
</script>
<style scoped lang='less'>
.percentDiv {
  position: absolute;
  top: calc(35% - 0.5rem);
  color: #d8d9dc;
  width: 50%;
  text-align: center;
  div.textDiv {
    line-height: 0.3rem;
    font-size: 0.16rem;
    margin-top: 0.1rem;
  }
  /deep/ .ant-progress-text {
    color: #00fff0;
    font-size: 0.26rem;
  }

  /deep/ path {
    stroke-width: 20;
  }
  /deep/ path.ant-progress-circle-trail {
    stroke: #085fb0 !important;
  }
  /deep/ path.ant-progress-circle-path {
    stroke: #00e9ff !important;
  }
}
.percentDiv2 {
  left: 50%;
  /deep/ path.ant-progress-circle-path {
    stroke: #8ed3e6 !important;
  }
}
</style>