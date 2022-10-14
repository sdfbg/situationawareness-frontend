<template>
  <task-table :status="todoStatus" />
</template>
<script>
import TaskTable from "./TaskTable.vue";
export default {
  name: "TodoTaskTable",
  components: { TaskTable },
  data() {
    return {
      admin:0,
      todoStatus: []
    };
  },
  created() {
    const admin = JSON.parse(localStorage.getItem("userInfo")).admin
    if(admin==1){
      this.todoStatus = [3]
    }else if (admin==0) {
      this.todoStatus = [2,-1]
    }else if (admin==2) {
      this.todoStatus = [0,1]
    }
  },
};
</script>