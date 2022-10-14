<template>
  <v-chart :option="option" :autoresize="true" :loading-options="echartsLoadingOptions" :loading="loading" class="chart"/>
</template>
<script>
import api from "../../../api";
import VChart from "vue-echarts";
import { genOption } from "@/components/chart/pieChart";
export default {
  name: "DriverLicense",
  components: {VChart},
  inject: ["echartsLoadingOptions"],
  data() {
    return {
      echartsData: [],
      sumString: "",
      loading: true
    };
  },
  mounted() {
    this.fetchData();
  },
  computed: {
    option(){
      if(this.loading) return {}
      return genOption(this.echartsData, this.sumString);
    }
  },
  methods: {
    fetchData() {
      this.$axios.post(api.getPersonLeftTop()).then((res) => {
        let data = res.data.data;
        if (data == null) {
          return
        }
        if (data.RED) {
          this.echartsData.push({
            name: "红色预警",
            value: data.RED,
            itemStyle: { color: "#E6203C" },
          });
        }
        if (data.ORANGE) {
          this.echartsData.push({
            name: "橙色预警",
            value: data.ORANGE,
            itemStyle: { color: "#FC4E19" },
          });
        }
        if (data.YELLOW) {
          this.echartsData.push({
            name: "黄色预警",
            value: data.YELLOW,
            itemStyle: { color: "#C9D007" },
          });
        }
        if (data.GREEN) {
          this.echartsData.push({
            name: "绿色预警",
            value: data.GREEN,
            itemStyle: { color: "#46AF54" },
          });
        }
        this.loading = false;
        let sum = 0;
        this.echartsData.forEach(element => {
          sum += element.value;
        }); 
        this.sumString = "预警总数：" + sum;
      });
    },
  },
};
</script>