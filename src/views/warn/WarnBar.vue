<template>
  <div id="warnCount" style="height: calc(100% - 0.4rem); width: 100%"></div>
</template>
<script>
export default {
  name: "WarnBar",
  data() {
    return {
      city: [
        "长春",
        "吉林",
        "四平",
        "辽源",
        "通化",
        "白山",
        "松原",
        "白城",
        "延边州",
        "长白山",
        "高速",
        "森林",
        "梅河口",
      ],
      legend: ["红色预警", "橙色预警", "黄色预警", "绿色预警"],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let echarts = this.$echarts.init(document.getElementById("warnCount"));
      // mock 数据
      const dataArr = {
        xdata: [
          "长春",
          "吉林",
          "四平",
          "辽源",
          "通化",
          "白山",
          "松原",
          "白城",
          "延边州",
          "长白山",
          "高速",
          "森林",
          "梅河口",
        ],
        result: [
          { name: "红色预警", data: [32, 45, 40, 40, 30, 20, 60, 89, 24] },
          { name: "橙色预警", data: [15, 20, 10, 30, 10, 10, 88, 45, 54] },
          { name: "黄色预警", data: [25, 10, 40, 80, 20, 10, 18, 34, 65] },
          { name: "绿色预警", data: [18, 40, 30, 50, 20, 10, 28, 23, 56] },
        ],
      };
      // 头部菱形
      const diamondData = dataArr.result.reduce((pre, cur, index) => {
        pre[index] = cur.data.map(
          (el, id) => el + (pre[index - 1] ? pre[index - 1][id] : 0)
        );
        return pre;
      }, []);
      const color = [
        [
          { offset: 0, color: "#af0808" },
          { offset: 0.5, color: "#dc0707" },
          { offset: 0.5, color: "#af0808" },
          { offset: 1, color: "#dc0707" },
        ],
        [
          { offset: 0, color: "#cc681e" },
          { offset: 0.5, color: "#f67c20" },
          { offset: 0.5, color: "#cc681e" },
          { offset: 1, color: "#f67c20" },
        ],

        [
          { offset: 0, color: "#B9B903" },
          { offset: 0.5, color: "#B9B903" },
          { offset: 0.5, color: "#9B9B02" },
          { offset: 1, color: "#B9B903" },
        ],
        [
          { offset: 0, color: "#5FD456" },
          { offset: 0.5, color: "#5FD456" },
          { offset: 0.5, color: "#12AC06" },
          { offset: 1, color: "#5FD456" },
        ],
      ];
      // series
      let series = dataArr.result.reduce((p, c, i, array) => {
        p.push(
          {
            z: i + 1,
            stack: "总量",
            type: "bar",
            name: c.name,
            barGap: "-100%",
            barWidth: 40,
            data: c.data,
            itemStyle: {
              color: {
                type: "linear",
                x: 0,
                x2: 1,
                y: 0,
                y2: 0,
                colorStops: color[i],
              },
            },
          },
          {
            z: i + 10,
            type: "pictorialBar",
            symbolPosition: "end",
            symbol: "diamond",
            symbolOffset: [0, "-50%"],
            symbolSize: [40, 10],
            data: diamondData[i],
            itemStyle: {
              color: {
                type: "linear",
                x: 0,
                x2: 1,
                y: 0,
                y2: 0,
                colorStops: color[i],
              },
            },
            tooltip: { show: false },
          }
        );
        // 是否最后一个了？
        if (p.length === array.length * 2) {
          p.push({
            z: array.length * 2,
            type: "pictorialBar",
            symbolPosition: "start",
            data: dataArr.result[0].data,
            symbol: "diamond",
            symbolOffset: ["0%", "50%"],
            symbolSize: [40, 10],
            itemStyle: {
              color: {
                type: "linear",
                x: 0,
                x2: 1,
                y: 0,
                y2: 0,
                colorStops: color[0],
              },
            },
            tooltip: { show: false },
          });
          return p;
        }
        return p;
      }, []);
      echarts.setOption({
        tooltip: { trigger: "axis" },
        xAxis: {
          axisTick: { show: true },
          axisLine: { lineStyle: { color: "rgba(255,255,255, .2)" } },
          axisLabel: { textStyle: { fontSize: 12, color: "#fff" } },
          data: dataArr.xdata,
        },
        yAxis: {
          splitLine: {
            lineStyle: {
              color: "rgba(255,255,255, .5)",
              type: [5, 5],

              dashOffset: 5,
            },
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgba(255,255,255, .5)",
              type: [5, 5],

              dashOffset: 5,
            },
          },

          axisLabel: { textStyle: { fontSize: 12, color: "#fff" } },
        },
        grid: { top: "5%", left: "15%", right: "3%", bottom: "30%" },
        legend: {
          data: ["红色预警", "橙色预警", "黄色预警", "绿色预警"],
          textStyle: { fontSize: 14, color: "#fff" },
          y: "15%",
          x: "0",
          orient: "vertical",
          // 禁止点击
          selectedMode: false,
        },
        series,
      });
    },
  },
};
</script>
<style scoped lang='less'>
</style>