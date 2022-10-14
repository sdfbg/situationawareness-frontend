<template>
  <div>
    <h4>任务流转</h4>
    <hr class="line" />
    <div class="warn_item">
      <a-row>
        <a-col :span="24">
          <label>流转人：</label>
          <span v-if="editable">
            <a-select 
              style="width: 170px"
              v-model="task.forwardUserId"
              :options="users.map(o=>({label:o.realName,value:o.id}))"/>
          </span>
          <span v-else>
            {{users.filter(o=>task.forwardUserId==o.id).map(o=>o.realName).join(",")}}
          </span>
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script>
export default {
  name: "WarnTaskForward",
  props: {
    editable: Boolean,
    task: Object,
    users: Array
  },
};
</script>
<style lang="less" scoped>
@import "../../assets/style/warn/modal.less";
</style>
