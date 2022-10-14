<template>
  <div id="riskDanger" style="flex: 1; height: 100%"></div>
</template>
<script>
import { pieChart } from "../../../road/chart/pieChart";
import api from "@/api";
export default {
  name: "RiskDanger",
  data() {
    return {
      chart: undefined,
      allData: [],
      fetched: false,
    };
  },
  props: ["year", "city"],
  watch: {
    year() {
      this.draw();
    },
    city() {
      this.draw();
    },
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.$axios.post(api.manageAccident("leftDown")).then((res) => {
        this.fetched = true;
        this.allData = res.data;
        this.draw();
      });
    },
    draw() {
      if (!this.fetched) {
        return;
      }
      if (!this.chart) {
        this.chart = this.$echarts.init(
          document.getElementById("riskDanger")
        );
      }
      const colors = ["#99D3F3","#007AFF", "#1F9AA7","#1F9AA7","#F5B64C"]
      const data = this.allData.filter(d=>this.city=='220000'?d.time==this.year:d.time==this.year&&d.city==this.city)
      const value = []
      data.forEach(d=>{
        const v = value.find(v=>v.name==d.clsyxz)
        if(v){
          v.value = v.value+d.count
        }else{
          value.push({
            name: d.clsyxz,
            value: d.count,
            itemStyle: {
              color: colors[value.length],
            },
          })
        }
      })
      // let sum = 0, sumString = "";
      // value.forEach(v => {
      //   sum = sum + v.value;
      // });
      // sumString = "事故总数：" + sum
      pieChart("riskDanger", value, this);
    },
  },
};
</script>