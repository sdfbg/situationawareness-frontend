<template>
  <v-chart
    :option="option"
    :autoresize="true"
    :loading-options="echartsLoadingOptions"
    :loading="loading"
  />
</template>
<script>
import VChart from "vue-echarts";
import api from "@/api";
import moment from "moment";
import { genOption } from "@/components/chart/pieChart";
const types = [
  {
    name: "超员载客",
    type: 1,
    itemStyle: {
      color: "#99D3F3",
    },
  },
  {
    name: "货车违法载人",
    type: 2,
    itemStyle: {
      color: "#007AFF",
    },
  },
  {
    name: "逆向行驶",
    type: 12,
    itemStyle: {
      color: "#1F9AA7",
    },
  },
  {
    name: "酒驾醉驾",
    type: 13,
    itemStyle: {
      color: "#2563AE",
    },
  },
  {
    name: "摩托车驾驶人不戴安全头盔",
    type: 14,
    itemStyle: {
      color: "#F5B64C",
    },
  },
  {
    name: "无证驾驶",
    type: 15,
    itemStyle: {
      color: "#F5B64C",
    },
  },
]
export default {
  name: "DisposalFeedback",
  components: { VChart },
  inject: ["echartsLoadingOptions"],
  props: ["year"],
  data() {
    return {
      loading:true,
      allData: [],
    };
  },
  computed: {
    yearData(){
      return this.allData.filter(d=>d.year==this.year)
    },
    typedData(){
      return types.map(t=>{
        const {itemStyle, type, name} = t
        const value =this.yearData.filter(d=>d.type==type).map(d=>d.count).reduce((d1,d2)=>d1+d2,0)
        return {value,itemStyle,name}
      })
    },
    option(){
      return genOption(this.typedData)
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.$axios.post(api.manageIllegal("leftDown")).then((res) => {
        this.allData = res.data.map(d=>({type: parseInt(d.TYPE),count:d.COUNT,year: moment(d.TIME,"YYYYMM").year()}))
        this.loading = false;
      });
    },
  },
};
</script>