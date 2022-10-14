<template>
  <v-chart :option="option" :autoresize="true" :loading-options="echartsLoadingOptions" :loading="loading" class="chart"/>
</template>
<script>
import VChart from "vue-echarts";
import api from "@/api";
export default {
  name: "CarBaoYouLiang",
  components: {VChart},
  inject: ["echartsLoadingOptions"],
  data() {
    return {
      allData: [],
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.$axios.post(api.getCarType()).then((res) => {
        console.log(res);
      })
    },
  },
  computed: {
    option() {
      let data = [
        {
          value: 565 ,
          name: "公路客运",
        },
        {
          value: 178,
          name: "旅游客运",
        },
        {
          value: 634,
          name: "危险品运输车",
        },
        {
          value: 22,
          name: "校车",
        },
        {
          value: 16706,
          name: "货运",
        },
      ];
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
          left: "6%",
          icon: "rect",
          orient: "vertical",
          itemGap: 30,
          textStyle: {
            color: "#fff",
          },
        },
        title: {
          text: "重点车辆总数：" + 18105,
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
                text: "车辆类型",
                fill: "#00ffff",
                font: '1.5em "STHeiti", sans-serif',
              },
              left: "58.5%",
              top: "46%",
            },
          ],
        },
        series: [
          //环形
          {
            name: "车辆类型",
            type: "pie",
            radius: ["60%", "72%"],
            center: ["70%", "50%"],
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
            center: ["70%", "50%"],
            endAngle: "-269.9999",
            splitNumber: 22,
            zlevel: 2,
            detail: {
              offsetCenter: [10, 20],
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
            center: ["70%", "50%"],
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