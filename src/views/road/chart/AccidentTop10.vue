<template>
  <div id="accidentTop10" style="width: 100%; height: 100%; padding-bottom: .5em"></div>
</template>
<script>
import api from "../../../api/index";
import { fengxianBar } from "./fengxianBar";
export default {
  name: "AccidentTop10",
  data() {
    return {
    };
  },
  mounted() {
    this.getEchartsData();
  },
  methods: {
    getEchartsData() {
      this.$axios.post(api.getRoadMidDown()).then((res) => {
        let data = res.data.data;
        let troubleData = data.hiddenTrouble,
          accidentData = data.accident,
          troubleName = [],
          troubleValue = [],
          accidentName = [],
          accidnetValue = [];
        troubleData.forEach((element) => {
          troubleName.push(element.dlmc);
          troubleValue.push(element.count);
        });
        accidentData.forEach((element) => {
          accidentName.push(element.dlmc);
          accidnetValue.push(element.count);
        });
        fengxianBar("accidentTop10", accidentName, accidnetValue, "");
      });
    },
  },
};
</script>