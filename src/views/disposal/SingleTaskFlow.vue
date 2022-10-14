<template>
  <div class="home_wrap home_other" ref="page">
    <a-modal
      title="预警应急处置"
      :visible="true"
      centered
      :maskClosable="false"
      :getContainer="() => $refs.page"
      width="12rem"
      :footer="null"
    >
    <task-flow/>
  </a-modal>
  </div>
</template>
<script>
import TaskFlow from "./TaskFlow.vue";
import { mapActions } from "vuex";
export default {
  name: "SingleTaskFlow",
  components: {TaskFlow},
  created(){
    const str = this.$route.query.id
    const strs = str.split(",")
    const id = strs[0]
    const tableName = strs[1]
    const dataSourceType = strs[2]
    this.fetchWarnDetail({id,tableName,dataSourceType})
  },
  methods: {
    ...mapActions("dispoal",["fetchWarnDetail"])
  }
}
</script>
<style lang="less" scoped>
@import "../../assets/style/warn/home.less";
@import "../../assets/style/warn/modal.less";
@import "../../assets/style/disposal/disposal.less";
</style>