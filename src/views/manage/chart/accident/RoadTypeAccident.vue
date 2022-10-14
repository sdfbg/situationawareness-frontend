<template>
  <div id="roadTypeAccident" style="height: calc(100% - 0.15rem); width: 100%"></div>
</template>
<script>
import api from "@/api";
export default {
  name: "RoadTypeAccident",
  data() {
    return {
      chart: undefined,
      allData: [],
      fetched: false,
      dllx: undefined,
    };
  },
  props: ["year", "city"],
  mounted() {
    this.fetchData();
  },
  watch: {
    year() {
      this.draw();
    },
    city() {
      this.draw();
    },
  },
  methods: {
    fetchData() {
      this.$axios.post(api.manageAccident("midDown")).then((res) => {
        this.fetched = true;
        this.allData = res.data;
        this.draw();
      });
    },
    showType(){
      this.dllx = undefined
      this.draw()
    },
    showSubType({name}){
      if(this.dllx==undefined && this.allData.find(d=>d.dllx==name)){
        this.dllx = name
        this.draw()
      }else{
        this.dllx = undefined
        this.draw()
      }
    },
    draw() {
      if (!this.fetched) {
        return;
      }
      if (!this.chart) {
        this.chart = this.$echarts.init(
          document.getElementById("roadTypeAccident")
        );
        this.chart.on("click",this.showSubType)
      }
      let newchartName = []
      let newchartValue1;
      let countMap = {}
      let data = this.allData.filter(d=>this.city=='220000'?d.time==this.year:d.time==this.year&&d.city==this.city)
      
      if(!(this.dllx==undefined)){
        data = data.filter(d=>d.dllx==this.dllx)
        data.forEach(d=>{
          const {dlxx,count} = d
          if (newchartName.indexOf(dlxx)>-1) {
            countMap[dlxx] +=  count
          }else {
            newchartName.push(dlxx)
            countMap[dlxx] = count
          }
        })
        newchartValue1 = newchartName.map(n=>countMap[n])
      }else{
        data.forEach(d=>{
          const {dllx,count} = d
          if (newchartName.indexOf(dllx)>-1) {
            countMap[dllx] +=  count
          }else {
            newchartName.push(dllx)
            countMap[dllx] = count
          }
        })
        newchartValue1 = newchartName.map(n=>countMap[n])
      }
      let barWidth = 20;
      let color1 = {
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        type: "linear",
        global: false,
        colorStops: [
          {
            //第一节下面
            offset: 0,
            color: "rgba(43,164,184,1)",
          },
          {
            offset: 1,
            color: "rgba(43,164,184,.5)",
          },
        ],
      };
      this.chart.clear()
      this.chart.setOption({
        // title: {
        //   text: "总数：" + 32452,
        //   textStyle: {
        //     color: "#0ff",
        //     fontSize: 14,
        //   },
        //   x: "center",
        //   y: "5",
        // },
        //提示框
        tooltip: {
          show: true,
        },
        legend: {
          data: ["事故数量"],
          icon: "rect",
          top: 5,
          x: "right",
          itemWidth: 18,
          itemHeight: 12,
          textStyle: {
            color: "#fff",
            fontWeight: "normal",
            fontSize: 12,
          },
        },
        grid: {
          top: "20%",
          left: "2%",
          bottom: "0%",
          right: "2%",
          containLabel: true,
        },
        animation: false,
        xAxis: [
          {
            type: "category",
            axisTick: {
              show: false,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#DBDAD9",
                type: "dashed",
                dashOffset: 5,
              },
            },
            axisLabel: {
              textStyle: {
                color: "#fff",
              },
              interval:0
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: "#ccc",
                type: "dashed",
                dashOffset: 5,
              },
            },
            data: newchartName,
          },
        ],
        yAxis: [
          {
            show: true,
            type: "value",
            axisLine: {
              show: true,
              lineStyle: {
                color: "#DBDAD9",
                type: "dashed",
                dashOffset: 5,
              },
            },
            axisLabel: {
              textStyle: {
                color: "#fff",
              },
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgba(255,255,255,.3)",
                type: "dashed",
                dashOffset: 5,
              },
            },
          },
        ],
        series: [
          {
            name: "事故数量",
            type: "pictorialBar",
            symbolSize: [barWidth, 10],
            symbolOffset: [0, -5],
            symbolPosition: "end",
            z: 15,
            color: "#5EE7FE",
            zlevel: 2,
            data: newchartValue1,
          },

          {
            name: "里程数",
            type: "bar",
            barGap: "60%",
            barWidth: barWidth,
            itemStyle: {
              //
              // color: '',
              color: color1,
              borderColor: color1,
              borderWidth: 1,
              borderType: "solid",
            },
            label: {
              show: true,
              formatter: "{c}",
              position: "top",
              color: "#5EE7FE",
              fontSize: 12,
              textAlign: "center",
            },
            zlevel: 2,
            data: newchartValue1,
          },
          {
            name: "",
            type: "pictorialBar",
            symbolSize: [barWidth, 10],
            symbolOffset: ["0", 5],
            z: 12,
            color: "#2871AA",

            data: [
              {
                name: "",
                value: "100",
              },
              {
                name: "",
                value: "100",
              },
              {
                name: "",
                value: "100",
              },
              {
                name: "",
                value: "100",
              },
              {
                name: "",
                value: "100",
              },
              {
                name: "",
                value: "100",
              },
              {
                name: "",
                value: "100",
              },
              {
                name: "",
                value: "100",
              },
              {
                name: "",
                value: "100",
              },
            ],
          },
        ],
      });
    },
  },
};
</script>