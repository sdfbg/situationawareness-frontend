<template>
  <div class="manage_chart" style="width: 100%; height: 100%">
    <EnterpriseAlert :divStyle="divStyle"/>
  </div> 
</template>
<script>
import EnterpriseAlert from "./EnterpriseAlert.vue";
export default {
  name: "WarningStatistics",
  data() {
    return {};
  },
  props: {
    top:{
      default: "0px"
    }
  },
  computed: {
    divStyle(){
      return {
        width: "100%",
        height: "100%",
        top: this.top
      }
    }
  },
  components: {
    EnterpriseAlert,
  },
  methods: {},
};
</script>
<style lang="less" scoped>
@import "~@/assets/style/portal.less";
</style>