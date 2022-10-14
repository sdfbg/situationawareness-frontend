<template>
  <div id="accidentType" style="flex: 1; height: 100%"></div>
</template>
<script>
import api from '../../../../api';
import { pieChart } from "../../../road/chart/pieChart";
export default {
  name: "AccidentType",
  data() {
    return {
      chart: undefined,
      fetched: false,
      allData: []
    };
  },
  props: ["year","city"],
  watch: {
    year() {
      this.init();
    },
    city() {
      this.init();
    },
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.$axios.post(api.manageAccident("rightMid")).then((res) => {
        this.fetched = true;
        this.allData = res.data;
        this.init();
      })
    },
    init() {
      if (!this.fetched) {
        return;
      }
      if (!this.chart) {
        this.chart = this.$echarts.init(
          document.getElementById("accidentType")
        );
      }
      const data = this.allData.filter(d => this.city == '220000' ? d.time == this.year : d.time == this.year && d.city == this.city);
      console.log(data);
      let name = [];
      let countMap = {};
      data.forEach(element => {
        let {accidentType, count} = element;
        if (name.indexOf(accidentType) > -1) {
          countMap[accidentType] += count;
        } else {
          name.push(accidentType);
          countMap[accidentType] = count;
        }
      });
      let echartsData = [];
      for (const prop in countMap) {
        echartsData.push({name: prop, value: countMap[prop]})
      }
      pieChart("accidentType", echartsData, this);
    }
  }
};
</script>