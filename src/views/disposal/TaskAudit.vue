<template>
  <div>
    <hr class="line" />
    <h4>交安委审核</h4>
    <div class="warn_item">
      <a-row>
        <a-col span="24">
          <label style="vertical-align: top">审核意见：</label>
          <a-input v-if="editable" v-model="task.review"/>
          <span v-else>{{task.review}}</span>
        </a-col>
      </a-row>
    </div>
    <div class="warn_item" v-if="!editable">
      <a-row>
        <a-col span="24">
          <label>审核状态：</label>
          <span v-if="task.status>3" class="green">已通过</span>
          <span v-else-if="task.status==3" class="blue">审核中</span>
          <span v-else-if="task.status==-1" class="red">驳回</span>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "TaskAudit",
  props: {
    editable: Boolean,
  },
  computed: {
    ...mapState("dispoal",["task"])
  },
};
</script>

<style lang="less" scoped>
@import "../../assets/style/warn/modal.less";
</style>
