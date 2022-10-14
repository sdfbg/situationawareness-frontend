<template>
  <v-chart :option="option" :autoresize="true" :loading-options="echartsLoadingOptions" :loading="loading" class="chart"/>
</template>
<script>
import VChart from "vue-echarts";
import { genOption } from "@/components/chart/pieChart";
import api from "@/api";
export default {
  name: "KeyTraffic",
  components: { VChart },
  inject: ["echartsLoadingOptions"],
  data() {
    return {
      echartData: [],
      loading: true
    };
  },
  props: {},
  watch: {},
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.$axios.post(api.getCarLeftTop()).then((res) => {
        this.echartData = res.data.data;
        this.loading = false;
      });
    },
  },
  computed: {
    option() {
      if(this.loading) return {};
      let data = [];
      data.push({
        name: "红色预警",
        value: this.echartData.red,
        itemStyle: { color: "#E6203C" },
      });
      data.push({
        name: "橙色预警",
        value: this.echartData.orange,
        itemStyle: { color: "#FC4E19" },
      });
      data.push({
        name: "黄色预警",
        value: this.echartData.yellow,
        itemStyle: { color: "#C9D007" },
      });
      data.push({
        name: "绿色预警",
        value: this.echartData.green,
        itemStyle: { color: "#46AF54" },
      });
      let sum = 0;
      data.forEach(element => {
        sum = sum + element.value;
      });
      // let sumString = "预警总数：" + sum;
      return genOption(data);
    }
  },
};
</script>