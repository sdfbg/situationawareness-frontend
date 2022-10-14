<template>
  <v-chart
    :option="option"
    :autoresize="true"
    :loading-options="echartsLoadingOptions"
    :loading="loading"
    class="chart"
  />
</template>
<script>
import VChart from "vue-echarts";
import api from "../../../api";
import cities from "@/common/city.js";
import moment from "moment";
const colors = ["rgb(252,152,12)", "#007AFF", "#1F9AA7"];
export default {
  name: "Escalation",
  components: { VChart },
  inject: ["echartsLoadingOptions"],
  data() {
    const thisYear = moment().year();
    return {
      allData: [],
      years: Array.from({ length: 3 })
        .map((v, i) => thisYear - i)
        .reverse(),
      loading: true,
    };
  },
  computed: {
    option() {
      if (this.loading) return {};
      const xAxisData = cities.map(({name}) => name.slice(0,name.length-1));
      const series = this.years.map((year, i) => {
        const color = colors[i];
        const data = cities.map(({ code }) => this.allData.find((d) => d.year == year && d.code == code).count);
        return {
          name: year.toString(),
          type: "line",
          smooth: false,
          showAllSymbol: true,
          symbol: "ract",
          symbolSize: 10,
          lineStyle: {
            normal: {
              color,
              shadowColor: "rgba(0, 0, 0, .3)",
              shadowBlur: 0,
              shadowOffsetY: 5,
              shadowOffsetX: 5,
            },
          },
          label: {
            show: false,
            position: "top",
            textStyle: {
              color,
            },
          },
          itemStyle: {
            color,
            borderColor: "#fff",
            borderWidth: 3,
            shadowColor: "rgba(0, 0, 0, .3)",
            shadowBlur: 0,
            shadowOffsetY: 2,
            shadowOffsetX: 2,
          },
          data,
        };
      });
      return {
        tooltip: {
          trigger: "axis",
        },
        legend: {
          orient: "horizontal", // 水平
          icon: "rect",
          top: 25,
          x: "center",
          // 宽度
          itemWidth: 10, // 图形宽度。
          itemHeight: 10, // 图形高度。
          borderWidth: 0,
          textStyle: {
            fontSize: "14px",
            color: "#fff",
          },
        },
        grid: {
          top: "10%",
          left: "12%",
          right: "5%",
          bottom: "8%",
        },
        xAxis: [
          {
            type: "category",
            axisLine: {
              show: true,
              lineStyle: {
                color: "#56a4cd",
              },
            },
            splitArea: {
              // show: false,
              color: "#f00",
              lineStyle: {
                color: "#f00",
              },
            },
            axisLabel: {
              color: "#fff",
              interval: 0,
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              //y轴刻度线
              show: false,
            },
            boundaryGap: false,
            data: xAxisData,
          },
        ],

        yAxis: [
          {
            type: "value",
            min: 0,
            // max: 140,
            splitLine: {
              show: false,
              lineStyle: {
                color: "rgba(255,255,255,0.1)",
              },
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#56a4cd",
              },
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#fff",
              },
            },
            axisTick: {
              show: false,
            },
          },
        ],
        series,
      };
    },
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.$axios.post(api.getDeadCountBy3Year()).then((res) => {
        const allData = res.data.map((d) => ({
          code: d.CITY,
          count: d.COUNT,
          year: d.TIME,
        }));
        this.allData = cities
          .map((city) =>
            this.years.map((year) => {
              const count = allData
                .filter((d) => d.year == year && d.code == city.code)
                .map((d) => d.count)
                .reduce((d1, d2) => d1 + d2, 0);
              return { ...city, year, count };
            })
          )
          .flat();
        this.loading = false;
      });
    },
  },
};
</script>