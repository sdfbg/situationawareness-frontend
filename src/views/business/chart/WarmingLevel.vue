<template>
  <v-chart :option="option" :autoresize="true" :loading-options="echartsLoadingOptions" :loading="loading" class="chart"/>
</template>
<script>
import api from "@/api";
import VChart from "vue-echarts";
import { genOption } from "@/components/chart/pieChart";
export default {
  name: "WarningLevel",
  components: { VChart },
  inject: ["echartsLoadingOptions"],
  data() {
    return {
      echartData: [],
      loading: true
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.$axios.post(api.getCompanyCarType()).then((res) => {
        let data = res.data;
        this.echartData.push( { name: "公路客运", value: data.glkc, itemStyle: { color: "#99D3F3" } } )
        this.echartData.push( { name: "旅游客运", value: data.lykc, itemStyle: { color: "#007AFF" } } )
        this.echartData.push( { name: "危险品运输车", value: data.wxp, itemStyle: { color: "#1F9AA7" } } )
        this.echartData.push( { name: "校车", value: data.xc, itemStyle: { color: "#2563AE" } } )
        this.echartData.push( { name: "货车", value: data.hc, itemStyle: { color: "#F5B64C" } } )
        this.loading = false;
      });
    },
  },
  computed: {
    option(){
      if(this.loading) return {};
      let sum = 0;
      this.echartData.forEach(element => {
        sum = sum + element.value;
      });
      let sumString = "车辆总数" + sum;
      return genOption(this.echartData, sumString);
    }
  }
};
</script>