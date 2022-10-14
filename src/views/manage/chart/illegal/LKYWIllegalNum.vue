<template>
  <div class="chart_container" style="height: 100%">
    <v-chart
      :option="option"
      :autoresize="true"
      :loading-options="echartsLoadingOptions"
      :loading="loading"
    />
  </div>
</template>
<script>

import VChart from "vue-echarts";
import api from "@/api";
import moment from "moment";
import cities from '@/common/city';
const types=[
  {
    name: "公路客运",
    value: ["B"],
  },
  {
    name: "旅游客运",
    value: ["E"],
  },
  {
    name: "校车",
    value: ["Q","S","P","O"],
  },
  {
    name: "危险品运输",
    value: ["R"],
  },
  {
    name: "货运",
    value: ["F"],
  },
]
export default {
  name: "LKYWIllegalNum",
  components: { VChart },
  inject: ["echartsLoadingOptions"],
  props: ["year","code"],
  data() {
    const months = Array.from({length:moment().month()+25}).map((v,i)=>moment().subtract(i,"M")).reverse()
    return {
      duration: 0,
      loading:true,
      months,
      allData: [],
    }
  },
  computed: {
    codeData(){
      if(this.code=='220000'){
        return this.yearData.map(d=>d.map(d=>d.count).reduce((d1,d2)=>d1+d2,0))
      } 
      return this.yearData.map(d=>{
        const codeData = d.find(({code})=>code==this.code)
        return codeData?codeData.count:0
      })
    },
    yearData(){
      return this.allData.map(d=>d.filter(({time})=>time.year()==this.year))
    },
    option(){
      if (this.loading) return {};
      let data = [
        {
          value: 11755,
          name: "公路客运",
        },
        {
          value: 563,
          name: "旅游客运",
        },
        {
          value: 5674,
          name: "危险品运输",
        },
        {
          value: 256382,
          name: "校车",
        },
        {
          value: 80,
          name: "货运",
        },
      ];
      data = types.map((t,i)=>({name:t.name,value:this.codeData[i]}))
      return {
        color: ["#1fe5ea", "#1daeff", "#f4e051", "#06C955", "#d27461"],
        tooltip: {
          show: true,
        },
        legend: {
          top: "12%",
          left: "0%",
          icon: "rect",
          orient: "vertical",
          itemGap: 20,
          textStyle: {
            color: "#fff",
          },
          data: data,
        },
        title: {
          // text: "驾照类型占比",
          textStyle: {
            color: "#0ff",
            fontSize: 14,
          },
          x: "center",
          y: "5",
        },
        graphic: {
          elements: [
            {
              type: "text",
              z: 4,
              style: {
                text: "车辆类型",
                fill: "#00ffff",
                font: '1.5em "STHeiti", sans-serif',
              },
              left: "50%",
              top: "46%",
            },
          ],
        },
        series: [
          //环形
          {
            name: "车辆类型",
            type: "pie",
            radius: ["60%", "72%"],
            center: ["60%", "50%"],
            hoverAnimation: false,
            label: {
              normal: {
                show: false,
              },
              emphasis: {
                show: false,
              },
            },
            zlevel: 1,
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: data,
          },
          //环形分割线
          {
            name: "",
            type: "gauge",
            radius: "80%",
            clockwise: true,
            startAngle: "90",
            center: ["60%", "50%"],
            endAngle: "-269.9999",
            splitNumber: 22,
            zlevel: 2,
            detail: {
              offsetCenter: [10, 20],
              formatter: " ",
            },
            axisLine: {
              lineStyle: {
                width: 0,
                opacity: 0,
              },
            },
            axisTick: {
              show: false,
            },
            markArea: {
              itemStyle: {
                color: "#0f0",
              },
            },
            splitLine: {
              show: true,
              length: 32,
              padding: [0, 0, 0],
              lineStyle: {
                color: "#022457",
                width: 3,
              },
            },
            axisLabel: {
              show: false,
            },
          },
          {
            type: "pie",
            name: "",
            tooltip: {
              show: false,
            },
            radius: ["50%", "52%"],
            center: ["60%", "50%"],
            hoverAnimation: false,
            clockWise: false,
            itemStyle: {
              normal: {
                color: "#fff",
              },
            },
            label: {
              show: false,
            },
            data: [100],
          },
        ],
      }
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData(){
      this.$axios.post(api.manageIllegal('leftMid')).then(res=>{
        const cityData = res.data.filter(d=>cities.some(c=>c.code==d.CITY))
        this.allData = types.map(t=>
          t.value.map(v=>cityData
            .filter(d=>d.SYXZ==v)
            .map(d=>({code:d.CITY,count:d.COUNT,time: moment(d.TIME,"YYYYMM")}))
          ).flat()
        )
        this.loading = false
      })
    }
  },
};
</script>
<style scoped lang='less'>
.percentDiv {
  position: absolute;
  top: calc(35% - 0.5rem);
  color: #d8d9dc;
  width: 50%;
  text-align: center;
  div.textDiv {
    line-height: 0.3rem;
    font-size: 0.16rem;
    margin-top: 0.1rem;
  }
  /deep/ .ant-progress-text {
    color: #00fff0;
    font-size: 0.26rem;
  }

  /deep/ path {
    stroke-width: 20;
  }
  /deep/ path.ant-progress-circle-trail {
    stroke: #085fb0 !important;
  }
  /deep/ path.ant-progress-circle-path {
    stroke: #00e9ff !important;
  }
}
.percentDiv2 {
  left: 50%;
  /deep/ path.ant-progress-circle-path {
    stroke: #8ed3e6 !important;
  }
}
</style>