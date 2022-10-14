<template>
  <v-chart :option="option" :autoresize="true" :loading-options="echartsLoadingOptions" :loading="loading" class="chart"/>
</template>
<script>
import VChart from "vue-echarts";
export default {
  name: "EnterpriseAlert",
  components: { VChart },
  inject: ["echartsLoadingOptions"],
  data() {
    return {
      echartData: [],
      // loading: true
    };
  },
  mounted() {
    this.init();
  },
  computed: {
    option() {
      // if(this.loading) return {};
      const data = {
        legendData: [
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
        ],
        seriesData: [
          { name: "长春", value: 239 },
          { name: "吉林", value: 194 },
          { name: "四平", value: 168 },
          { name: "辽源", value: 180 },
          { name: "通化", value: 140 },
          { name: "白山", value: 132 },
          { name: "松原", value: 144 },
          { name: "白城", value: 100 },
          { name: "延边州", value: 89 },
          { name: "长白山", value: 69 },
          { name: "高速", value: 289 },
          { name: "森林", value: 89 },
          { name: "梅河口", value: 99 },
        ],
      };
      return {
        // title: {
        //   text: "总人数：" + 1870,
        //   textStyle: {
        //     color: "#fff",
        //     fontSize: 14,
        //   },
        //   x: "left",
        //   y: "5",
        // },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          type: "scroll",
          orient: "vertical",
          right: 10,
          top: 20,
          bottom: 20,
          data: data.legendData,
          textStyle: {
            color: "#fff",
          },
        },
        series: [
          {
            name: "地市区",
            type: "pie",
            radius: "55%",
            center: ["40%", "50%"],
            data: data.seriesData,
            label:{color:'#fff'},
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "#ffffff",
              },
            },
          },
        ],
      };
    },
  },
};
</script>