<template>
  <div class="chart_container" style="height: 100%">
    <div id="ageChart" style="width: 100%; height: 100%; padding-left: 5em; padding-bottom: 2em"></div>
    <!-- <div id="genderChart" style="width: 80%; height: 100%"></div> -->
  </div>
</template>
<script>
import api from "@/api";
export default {
  name: "DriverChange",
  data() {
    return {
      chart: undefined,
      fetched: true,
      allData: [],
    };
  },
  mounted() {
    this.chart = this.$echarts.init(document.getElementById("ageChart"));
    this.chart.showLoading({
      text: "正在加载...",
      textColor: "#fff",
      color: "#fff",
      maskColor: "transparent",
      X: "center",
      y: "center",
      effect: "spin"
    });
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.$axios.post(api.getDriverAge()).then((res) => {
        this.fetched = true;
        this.allData = res.data;
        this.init();
      })
    },
    init() {
      if (!this.fetched) {
        return;
      }
      let data = [], sum = 0;
      data.push({name: "不满一年", value: this.allData["lessOne"]});
      data.push({name: "1-3年", value: this.allData["For1To3"]});
      data.push({name: "4-5年", value: this.allData["For3To5"]});
      data.push({name: "6-10年", value: this.allData["For5To10"]});
      data.push({name: "11-15年", value: this.allData["For10To15"]});
      data.push({name: "16-20年", value: this.allData["For15To20"]});
      data.push({name: "超过20年", value: this.allData["more20"]});
      data.forEach(d => {
        sum = sum + d.value;
      });
      let arrName = this.getArrayValue(data, "name");
      let arrValue = this.getArrayValue(data, "value");
      this.sumValue = eval(arrValue.join("+"));
      let num = this.sumValue;
      let objData = this.array2obj(data, "name");
      let optionData = this.getData(data);
      
      this.chart.setOption({
        title: {
          text: "总数：" + sum,
          textStyle: {
            color: "#0ff",
            fontSize: 14,
          },
          x: "center",
          y: "5",
        },
        legend: {
          backgroundColor: "#0C2956",
          show: true,
          icon: "circle",
          top: "center",
          right: "10%",
          orient: "vertical",
          data: arrName,
          itemWidth: 10,
          itemHeight: 10,
          width: 12,
          // padding: [0, 18],
          itemGap: 10,
          formatter: function (name) {
            return (
              "{title|" +
              name +
              "} {value|" +
              ((objData[name].value / num) * 100).toFixed(2) +
              "}  {title|%}"
            );
          },
          textStyle: {
            rich: {
              title: {
                fontSize: 13,
                lineHeight: 10,
                color: "#fff",
              },
              value: {
                fontSize: 13,
                lineHeight: 20,
                color: "#0ff",
              },
            },
          },
        },
        tooltip: {
          show: true,
          trigger: "item",
          formatter: "{a}<br>{b}:{c}({d}%)",
        },
        color: [
          "rgb(9,187,247)",
          "rgb(184,254,165)",
          "rgb(253,218,23)",
          "rgb(252,152,12)",
        ],
        xAxis: [
          {
            show: false,
          },
        ],
        series: optionData.series,
      });
      this.chart.hideLoading();
    },
    getArrayValue(array, key) {
      var newkey = key || "value";
      var res = [];
      if (array) {
        array.forEach(function (t) {
          res.push(t[newkey]);
        });
      }
      return res;
    },
    array2obj(array, key) {
      var resObj = {};
      for (var i = 0; i < array.length; i++) {
        resObj[array[i][key]] = array[i];
      }
      return resObj;
    },
    getData(data) {
      var res = {
        series: [],
        yAxis: [],
      };
      for (let i = 0; i < data.length; i++) {
        res.series.push({
          name: "驾龄",
          type: "pie",
          clockWise: false, //顺时加载
          hoverAnimation: false, //鼠标移入变大
          radius: [98 - i * 15 + "%", 93 - i * 15 + "%"],
          center: ["30%", "60%"],
          label: {
            show: false,
          },
          itemStyle: {
            label: {
              show: false,
            },
            labelLine: {
              show: false,
            },
            borderWidth: 6,
          },
          data: [
            {
              value: data[i].value,
              name: data[i].name,
            },
            {
              value: this.sumValue - data[i].value,
              name: "",
              itemStyle: {
                color: "rgba(0,0,0,0)",
                borderWidth: 0,
              },
              tooltip: {
                show: false,
              },
              hoverAnimation: false,
            },
          ],
        });
        res.series.push({
          name: "",
          type: "pie",
          silent: true,
          z: 1,
          clockWise: false, //顺时加载
          hoverAnimation: false, //鼠标移入变大
          radius: [98 - i * 15 + "%", 93 - i * 15 + "%"],
          center: ["30%", "60%"],
          label: {
            show: false,
          },
          itemStyle: {
            label: {
              show: false,
            },
            labelLine: {
              show: false,
            },
            borderWidth: 5,
          },
          data: [
            {
              value: 7.5,
              itemStyle: {
                color: "rgb(3, 31, 62)",
                borderWidth: 0,
              },
              tooltip: {
                show: false,
              },
              hoverAnimation: false,
            },
          ],
        });
        res.yAxis.push(
          ((data[i].value / this.sumValue) * 100).toFixed(2) + "%"
        );
      }
      return res;
    },
  },
};
</script>