<template>
  <v-chart :option="option" :autoresize="true" :loading-options="echartsLoadingOptions" :loading="loading" class="chart"/>
</template>
<script>
import VChart from "vue-echarts";
import api from "@/api";
import cities from "@/common/city";
export default {
  name: "RealTimeWarning",
  components: { VChart },
  inject: ["echartsLoadingOptions"],
  data() {
    return {
      cities,
      allData: [],
      loading: true
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.$axios.post(api.getVillageCar()).then((res) => {
        this.allData = res.data;
        this.loading = false;
      })
    },
  },
  computed: {
    option() {
      if(this.loading) return {};
      let {拖拉机: dataT, 收割机: dataS} = this.allData;
      let data = this.cities.map(c => ({name: c.name, value: dataT.find(t => t.city == c.code).count + dataS.find(t => t.city == c.code).count}));
      let dataTSum = this.cities.map(c => dataT.find(t => t.city == c.code).count).reduce((prev, cur) => { return prev + cur}, 0);
      let dataSSum = this.cities.map(c => dataS.find(t => t.city == c.code).count).reduce((prev, cur) => { return prev + cur}, 0);
      return {
        title: {
          text: "拖拉机总数："+ dataTSum + " " + "联合收割机总数：" + dataSSum,
          textStyle: {
            color: "#fff",
            fontSize: 14,
          },
          x: "left",
          y: "5",
        },
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
          data: this.cities.map(c => c.name),
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
            data: data,
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
<style lang="less" scoped>
@import "~@/assets/style/car.less";
</style>