<template>
  <div id="driverPointType" style="height: 100%; width: 100%"></div>
</template>
<script>
import api from "../../../api";
import { pieChart } from "../../road/chart/pieChart";
export default {
  name: "DriverPointType",
  data() {
    return {
      echartsData: [],
      dataLists: [
        { name: "红色预警", value: 11, itemStyle: { color: "#E6203C" } },
        { name: "橙色预警", value: 22, itemStyle: { color: "#FC4E19" } },
        { name: "黄色预警", value: 33, itemStyle: { color: "#C9D007" } },
        { name: "绿色预警", value: 32, itemStyle: { color: "#46AF54" } },
      ],
    };
  },
  mounted() {
    //this.getWarningLevelAna();
    pieChart("driverPointType", this.dataLists, this);
  },
  methods: {
    getEchartsData() {
      var date = new Date();
      var year = date.getFullYear();
      var month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var nowDate = year + "-" + month + "-" + day;
      let data = {
        createTime: nowDate,
      };
      this.$axios.post(api.getPersonMidTop(), data).then((res) => {
        let data = res.data.data;
        if (data.RED != "") {
          this.dataLists.push({
            name: "红色预警",
            value: data.RED,
            itemStyle: { color: "#E6203C" },
          });
        }
        if (data.ORANGE != "") {
          this.dataLists.push({
            name: "橙色预警",
            value: data.ORANGE,
            itemStyle: { color: "#FC4E19" },
          });
        }
        if (data.YELLOW != "") {
          this.dataLists.push({
            name: "黄色预警",
            value: data.YELLOW,
            itemStyle: { color: "#C9D007" },
          });
        }
        if (data.GREEN != "") {
          this.dataLists.push({
            name: "绿色预警",
            value: data.GREEN,
            itemStyle: { color: "#46AF54" },
          });
        }
        // pieChart("driverLicense", this.dataLists, this);
      });
    },
  },
};
</script>