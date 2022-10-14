<template>
  <v-chart :option="option" :autoresize="true" :loading-options="echartsLoadingOptions" :loading="loading" class="chart"/>
</template>
<script>
import VChart from "vue-echarts";
import { genOption } from "@/components/chart/pieChart";
import roadTypes from "@/common/roadTypes.js";
const pieColors = ["#1F9AA7","#2563AE","#99D3F3","#007AFF"]
export default {
  name: "DaoLuLiCheng",
  components: {VChart},
  props: {
    roadInfo: {
      type: Object,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    const dataList = roadTypes.map((r,i)=>({
      name: r.name,
      key: r.value,
      value:0,
      itemStyle: { color: pieColors[i] },
      selected: false,
      hovered: false
    }))
    return {
      dataList
    };
  },
  inject: ["echartsLoadingOptions"],
  computed: {
    option(){
      if(this.loading) return {}
      const dataList = this.dataList.map(d=>{
        const {key} = d
        const value = Math.round(this.roadInfo[key].reduce((total, currentValue)=>{
          return total + currentValue.gls;
        }, 0))
        return {...d,value}
      })
      let sum = 0;
      dataList.forEach(element => {
        sum = sum + element.value;
      });
      let sumString = "公里总数：" + sum;
      return genOption(dataList, sumString);
    }
  },
};
</script>
<style scoped>
  .chart {
    height: calc(100% - 0.1rem);
    width: 100%
  }
</style>