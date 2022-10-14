<template>
  <div
    id="accidentTypeAnalysis" style="height: 100%; width: 100%"
  ></div>
</template>
<script>
import api from "../../../api";
export default {
  name: "AccidentTypeAnalysis",
  data() {
    return {
      echartsData: {
        city: [],
        legend: ["绿色预警", "黄色预警", "橙色预警", "红色预警"],
        data: [],
      },
    };
  },
  mounted() {
    this.getEchartsData();
  },
  methods: {
    getEchartsData() {
      this.$axios.post(api.getCompanyRightTop()).then((res) => {
        let data = res.data.data;
        this.echartsData.city = data.xAxis[0].data;
        this.echartsData.city.splice(9, 1);
        this.echartsData.city = this.echartsData.city.map(c=>c.replace("市", ""));
        data.series.forEach((element) => {
          this.echartsData.data.push(element.data);
        });
        this.echartsData.data.forEach(element => {
          element.splice(9, 1);
        });
        this.init();
      });
    },
    init() {
      let echarts = this.$echarts.init(
        document.getElementById("accidentTypeAnalysis")
      );
      echarts.setOption({
        title: {
          text:"预警总数：" + 13245,
          top: 5,
          textStyle: {
            color: "#fff",
            fontSize: 14,
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: { type: "shadow" },
        },
        color: ["#5FD456", "#FEFE29", "#FC5F2F", "#E6203C"],
        legend: {
          top: 25,
          left: "left",
          itemWidth: 16,
          itemHeight: 10,
          textStyle: {
            fontSize: 10,
            color: "#96A4F4",
          },
          data: this.echartsData.legend,
        },
        grid: {
          left: "1%",
          right: "0%",
          bottom: "2%",
          containLabel: true,
        },
        dataZoom: [
          {
            type: "inside",
            show: true,
            start: 0,
            end: 40,
            xAxisIndex: [0],
            top: "10%",
            width: "10",
            bottom: "10%",
            height: "80%",
            backgroundColor: "#1C0870",
            fillerColor: "#1687C6",
            borderColor: "rgba(0,255,255,.4)",
            textStyle: {
              color: "#05D5FF",
            },
            zoomLock: true,
            moveHandleSize: 0,
          },
        ],
        xAxis: {
          type: "category",
          axisLabel: {
            color: "#96A4F4",
            rotate: 0, //倾斜度
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#DBDAD9",
              type: "dashed",
              dashOffset: 5,
            },
          },
          axisTick: {
            show: false,
          },
          data: this.echartsData.city,
        },
        yAxis: {
          name: "",
          type: "value",
          axisLabel: {
            color: "#fff",
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#DBDAD9",
              type: "dashed",
              dashOffset: 5,
            },
          },
          axisTick: {
            show: false,
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
        series: [
          {
            name: this.echartsData.legend[0],
            type: "bar",
            stack: "总数",
            barWidth: "8",
            label: {
              show: false,
            },
            data: this.echartsData.data[0],
          },
          {
            name: this.echartsData.legend[1],
            type: "bar",
            stack: "总数",
            barWidth: "8",
            label: {
              show: false,
            },
            data: this.echartsData.data[1],
          },
          {
            name: this.echartsData.legend[2],
            type: "bar",
            stack: "总数",
            barWidth: "8",
            label: {
              show: false,
            },
            data: this.echartsData.data[2],
          },
          {
            name: this.echartsData.legend[3],
            type: "bar",
            stack: "总数",
            barWidth: "8",
            label: {
              show: false,
            },
            data: this.echartsData.data[3],
          },
        ],
      });
    },
  },
};
</script>
<style scoped lang='less'>
@font-face {
  font-family: myfont; //自定义字体名称
  src: url("../../../assets/fronts/YouSheBiaoTiHei-2.ttf"); //引入字体文件
  font-weight: normal; //这个是必须设置的而且必须为normal
}
.sgListPDiv {
  padding: 0.05rem 0.2rem;
  .sgListDiv {
    width: 50%;
    display: inline-block;
    text-align: center;
    color: #c4c6cb;
    padding: 0.05rem 0;
    .data_top {
      width: 0.48rem;
      height: 0.48rem;
      background: url(~@/assets/images/rank_circle.png) no-repeat;
      background-size: 100% 100%;
      line-height: 0.4rem;
      margin-right: 0.1rem;

      display: inline-block;
      vertical-align: text-bottom;
    }
    .rightDiv {
      line-height: 0.3rem;
      font-size: 0.14rem;
      display: inline-block;
      width: calc(100% - 0.6rem);
      .numSpan {
        font-family: myfont;
        font-size: 0.26rem;
        margin-right: 0.05rem;
        &.numSpan1 {
          color: #01eef0;
        }
        &.numSpan2 {
          color: #fe6c40;
        }
        &.numSpan3 {
          color: #efec07;
        }
      }
    }
  }
}
</style>