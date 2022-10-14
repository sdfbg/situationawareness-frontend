<template>
  <div class="data_display">
    <div class="data_item">
      <h3>
        <img src="../../assets/images/title_left.png" />
        <span>{{ this.title }}</span>
        <img src="../../assets/images/title_right.png" />
      </h3>
      <div class="numDiv">
        <div class="numDivItemdiv" v-for="(item, index) in arr" :key="index">
          <div class="num_view" :style="{ transform: numTran[index] }">
            <div class="item" v-for="(t, i) in item" :key="i">
              {{ t }}
            </div>
          </div>
        </div>
      </div>
      <div class="msgDiv">
        <span>同比：</span>
        <span class="spanSpan">
          <span v-if="this.countYoy > 0">
            <a-icon type="arrow-up" style="color: #ff0000" />{{
              Math.abs(countYoy * 100).toFixed(2) + "%"
            }}
          </span>
          <span v-if="this.countYoy < 0">
            <a-icon type="arrow-down" style="color: #00ff42" />{{
              Math.abs(countYoy * 100).toFixed(2) + "%"
            }}
          </span>
        </span>
      </div>
    </div>
    <div class="data_item">
      <h3>
        <img src="../../assets/images/title_left.png" />
        <span>月增量</span>
        <img src="../../assets/images/title_right.png" />
      </h3>
      <div class="numDiv">
        <div
          class="numDivItemdiv"
          v-for="(item, index) in rightArr"
          :key="index"
        >
          <div class="num_view" :style="{ transform: numRightTran[index] }">
            <div class="item" v-for="(t, i) in item" :key="i">
              {{ t }}
            </div>
          </div>
        </div>
      </div>
      <div class="msgDiv">
        <span>同比：</span>
        <span class="spanSpan" style="padding-right: 2em">
          <span v-if="this.monthYoy > 0">
            <a-icon type="arrow-up" style="color: #ff0000" />{{
              Math.abs(monthYoy * 100).toFixed(2) + "%"
            }}
          </span>
          <span v-if="this.monthYoy < 0">
            <a-icon type="arrow-down" style="color: #00ff42" />{{
              Math.abs(monthYoy * 100).toFixed(2) + "%"
            }}
          </span>
        </span>
        <span>环比：</span>
        <span class="spanSpan spanSpan2">
          <span v-if="this.monthQoq > 0">
            <a-icon type="arrow-up" style="color: #ff0000" />{{
              Math.abs(monthQoq * 100).toFixed(2) + "%"
            }}
          </span>
          <span v-if="this.monthQoq < 0">
            <a-icon type="arrow-down" style="color: #00ff42" />{{
              Math.abs(monthQoq * 100).toFixed(2) + "%"
            }}
          </span>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import api from "@/api";
import { dealNum, timer } from "@/views/common/numDeal";
export default {
  name: "DataDisplay",
  data() {
    return {
      arr: new Array(8).fill([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
      numTran: new Array(8).fill(""),
      rightArr: new Array(8).fill([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
      numRightTran: new Array(8).fill(""),
      num: 0,
      rightNum: 0,
      countYoy: 0,
      monthYoy: 0,
      monthQoq: 0,
    }
  },
  props: ["dataUrl", "title"],
  mounted() {
    this.fetcheData();
  },
  methods: {
    fetcheData() {
      this.$axios.post(api[this.dataUrl]()).then((res) => {
        const data = res.data.data ? res.data.data : res.data;
        this.num = data.count;
        this.rightNum = data.addMonthCount;
        this.countYoy = data.tbYear;
        this.monthYoy = data.tbMonth;
        this.monthQoq = data.hbMonth;
        this.dealNum();
      })
    },
    dealNum() {
      this.num = dealNum(this.num);
      setTimeout(() => {
        timer(this.arr, this.num, this.numTran, this);
      }, 1000);
      this.rightNum = dealNum(this.rightNum);
      setTimeout(() => {
        timer(this.rightArr, this.rightNum, this.numRightTran, this);
      }, 1000);
    },
  },
};
</script>
<style lang="less" scoped>
@import "~@/assets/style/car.less";
</style>