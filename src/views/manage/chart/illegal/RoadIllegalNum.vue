<template>
  <v-chart ref="echart" :option="option" :autoresize="true" :loading-options="echartsLoadingOptions" :loading="loading" class="chart"/>
</template>
<script>
import * as echarts from "echarts";
import VChart from "vue-echarts";
import api from "@/api";
import cities from "@/common/city";
let road = [
  {
    name: "国道",
    code: "1"
  },
  {
    name: "省道",
    code: "2"
  },
  {
    name: "县道",
    code: "3"
  },
  {
    name: "乡道",
    code: "4"
  },
  {
    name: "村道",
    code: "5"
  },
  {
    name: "其他",
    code: "9"
  },
];
export default {
  name: "RoadIllegalNum",
  components: { VChart },
  inject: ["echartsLoadingOptions"],
  data() {
    return {
      cities,
      road,
      timer: undefined,
      echartData: [],
      loading: true,
    };
  },
  props: ["year", "city"],
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.$axios.post(api.manageIllegal("rightDown")).then((res) => {
        this.echartData = res.data;
        this.loading = false;
      })
    },
  },
  computed: {
    option() {
      if(this.loading) return {};
      // let name = ["高速", "国道", "省道"],
      //   value = [4979, 6224, 26141];
      let data = [];
      if (this.city == "220000") {
        data = this.road.map(r => ({
          name: r.name,
          value: this.echartData
            .filter(d => d.GLXZDJ == r.code)
            .reduce((total, currentValue) => {
              return total + currentValue.COUNT;
            }, 0)
        }))
      } else {
        let dataFilter = this.echartData.filter(d => d.CITY == this.city && d.TIME == this.year);
        data = this.road.map(r => ({name: r.name, value: dataFilter.find(d => d.GLXZDJ == r.code) ? dataFilter.find(d => d.GLXZDJ == r.code).COUNT : 0}));
      }
      let name = [], value = [];
      data.forEach(d => {
        name.push(d.name);
        value.push(d.value);
      });
      return {
        tooltip: {
          trigger: "axis",
        },
        legend: {
          top: "0%",
          x: "center",
          textStyle: {
            color: "#fff",
          },
          itemWidth: 15,
        },
        grid: {
          top: "15%",
          left: "5%",
          right: "0%",
          bottom: "5%",
          containLabel: true,
        },
        xAxis: {
          type: "value",
          show: true,
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgba(255,255,255,0.8)",
            },
          },
          axisLabel: {
            show: true,
            formatter: (value)=>{
              return value/10000 + "万";
            },
          },
          splitLine: {
            lineStyle: {
              color: "rgba(255,255,255,0.3)", // 分割线颜色
            },
          },
        },
        yAxis: {
          type: "category",
          data: name,
          axisLabel: {
            color: "rgba(255,255,255,1)",
          },
        },
        series: [
          {
            name: "违法数量",
            type: "bar",
            stack: "total",
            label: {
              show: false,
            },
            data: value,
            barWidth: 12,
            itemStyle: {
              label: {
                show: false,
              },
              labelLine: {
                show: false,
              },
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "rgba(41,244,236,.2)" },
                { offset: 0.5, color: "#00CA95" },
                { offset: 1, color: "rgba(41,244,236,.2)" },
              ]),
              borderColor: "rgba(41,244,236,0.7)",
              // shadowBlur: 16,
              shadowColor: "#a2f9f7",
            },
          },
        ],
      };
      
    },
  },
};
</script>