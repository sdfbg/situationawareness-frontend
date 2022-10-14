<template>
  <v-chart :option="option" :autoresize="true" :loading-options="echartsLoadingOptions" :loading="loading" class="chart"/>
</template>
<script>
import VChart from "vue-echarts";
import api from "@/api";
import cities from "@/common/city";
export default {
  name: "ZJIllegalNum",
  components: { VChart },
  inject: ["echartsLoadingOptions"],
  data() {
    return {
      cities,
      echartData: [],
      loading: true,
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.$axios.post(api.manageIllegal("rightMid")).then((res) => {
        this.echartData = res.data;
        this.loading = false;
      })
    },
  },
  computed: {
    option() {
      if(this.loading) return {};
      let data = this.cities.map(c => ({name: c.name, value: this.echartData.filter(d => d.CITY == c.code)[0].COUNT}));
      let name = [];
      data.forEach(d => {
        name.push(d.name);
      });
      return {
        title: {
          left: "center",
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
          data: name,
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
            emphasis: {
              itemStyle: {
                shadowBlur: 0,
                shadowOffsetX: 0,
                shadowColor: "#fff",
              },
            },
          },
        ],
      };
    },
  },
};
</script>