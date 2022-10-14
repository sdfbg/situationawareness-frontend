<template>
  <div class="modal_container">
    <a-steps :current="current">
      <a-step
        v-for="(item, index) in taskSteps"
        :key="item.title"
      >
        <template slot="title">
          <div class="custom_title">
            <p>{{ item.title }}</p>
            <!-- <span v-if="item.title.length>4">{{item.title.substring(6,item.title.length)}}</span> -->
          </div>
        </template>
        <template slot="subTitle" v-if="index < current">
          <p>2022-08-09</p>
          <span>10:21:12</span>
        </template>
      </a-step>
    </a-steps>
    <!--  -->
    <div class="warn_content">
      <warn-basic
        :task="task"
        :spans="[[12,12],[24],[24]]"
        :editable="!fromWarn && admin==1 && task.status==taskStatus.UNCREATED"/>
      <warn-task-basic
        v-if="currentWarnStatus==warnStatus.AUDITED || !fromWarn"
        :task="task"
        :orgs="orgs"
        :editable="admin==1&&task.status==taskStatus.UNCREATED"/>
      <warn-task-forward
        v-if="task.status>taskStatus.INITED"
        :task="task"
        :users="users.filter(u=>u.departmentId==task.orgIds[0]&&u.activateStatus=='0')"
        :editable="admin==2&&task.status==taskStatus.RECIEVED"/>
      <feedback
        v-if="task.status>=taskStatus.FORWARD||task.status==taskStatus.REJECTED"
        :task="task"
        :editable="admin==0&&(task.status==taskStatus.FORWARD||task.status==taskStatus.REJECTED)"/>
      <task-audit
        v-if="task.status>=taskStatus.FEEBACKED||task.status==-1"
        :task="task"
        :editable="admin==1&&task.status==taskStatus.FEEBACKED"/>
    </div>
    <template v-if="admin==1">
      <div class="btns" v-if="current == stepIndic['预警审核']">
        <a-button key="submit" class="send_btn" type="primary" @click="()=>changeWarnStatus(1)"> 审核通过 </a-button>
        <a-button key="back" class="cancle_btn" @click="()=>changeWarnStatus(2)"> 忽略 </a-button>
      </div>
      <div class="btns" v-if="current == stepIndic['任务下发']">
        <a-button key="submit" class="send_btn" type="primary" @click="createTask" :loading="createTaskLoading"> 下发 </a-button>
        <!-- <a-button key="back" class="cancle_btn"> 取消 </a-button> -->
      </div>
      <div class="btns" v-if="task.status == taskStatus.INITED">
        <a-button key="submit" class="send_btn" type="primary"> 催办 </a-button>
        <!-- <a-button key="back" class="cancle_btn"> 取消 </a-button> -->
      </div>
      <div class="btns" v-if="task.status==taskStatus.FEEBACKED">
        <a-button key="submit" class="send_btn" type="primary" @click="audit"> 通过 </a-button>
        <a-button key="back" class="send_btn" type="primary" @click="reject"> 不通过 </a-button>
      </div>
      <!-- <div class="btns" v-if="task.status==taskStatus.AUDITED">
        <a-button key="submit" class="send_btn" type="primary" @click="archive"> 归档 </a-button>
        <a-button key="back" class="cancle_btn"> 取消 </a-button>
      </div> -->
    </template>
    <template v-else-if="admin===0">
      <div class="btns" v-if="task.status==taskStatus.FORWARD||task.status==taskStatus.REJECTED">
        <a-button key="submit" class="send_btn" type="primary" @click="feedback"> 确定 </a-button>
        <a-button key="back" class="cancle_btn"> 取消 </a-button>
      </div>
    </template>
    <template v-else>
      <div class="btns" v-if="task.status==taskStatus.INITED">
        <a-button key="submit" class="send_btn" type="primary" @click="recieve"> 确定 </a-button>
        <a-button key="back" class="cancle_btn"> 取消 </a-button>
      </div>
      <div class="btns" v-if="task.status==taskStatus.RECIEVED">
        <a-button key="submit" class="send_btn" type="primary" @click="forward"> 确定 </a-button>
        <a-button key="back" class="cancle_btn"> 取消 </a-button>
      </div>
    </template>
  </div>
</template>
<script>
import api from "@/api/index";
import moment from "moment";
import WarnBasic from "./WarnBasic.js";
import WarnTaskBasic from "./WarnTaskBasic.vue";
import WarnTaskForward from "./WarnTaskForward.vue";
import Feedback from "./Feedback.vue";
import TaskAudit from "./TaskAudit.vue";
import { mapState, mapMutations } from "vuex";
export const warnStatus={
  /**
   * 未审核
   */
  INITED:0,
  /**
   * 审核通过
   */
  AUDITED:1,
  /**
   * 忽略
   */
  IGNORED:2,
}
export const taskStatus={
  /**
   * 已下发
   */
  INITED:0,
  /**
   * 已接收
   */
  RECIEVED:1,
  /**
   * 已流转
   */
  FORWARD:2,
  /**
   * 已处置反馈
   */
  FEEBACKED:3,
  /**
   * 已审核
   */
  AUDITED:4,
  /**
   * 已归档
   */
  ARCHIVED:5,
  /**
   * 驳回
   */
  REJECTED:-1,
  /**
   * 未创建
   */
  UNCREATED:-2,
}
const steps = ["预警审核","任务下发","任务接收","任务流转","任务处置反馈","任务评价","任务归档"].map((v)=>({title:v}))
const stepIndic = {
  INITED:0
}
steps.forEach((v,i)=>stepIndic[v.title]=i)
export default {
  name: "TaskFlow",
  components:{WarnBasic, WarnTaskBasic, Feedback, TaskAudit, WarnTaskForward},
  data() {
    return {
      steps,
      orgs:[],
      users: [],
      stat: {
        inited:0,
      },
      stepIndic,
      taskStatus,
      warnStatus,
      createTaskLoading: false
    };
  },
  filters:{
    timefilter(val){
      if(!val) return ""
      return moment(val, "YYYYMMDDHHmmss").format("YYYY年MM月DD日HH时mm分ss秒")
    }
  },
  computed:{
    ...mapState("dispoal", ["fromWarn","admin","task"]),...mapState("dispoal", {
      currentWarnStatus:"warnStatus"
    }),
    current(){
      if(this.fromWarn && this.currentWarnStatus==warnStatus.INITED) return stepIndic["预警审核"]
      if(!this.fromWarn || this.currentWarnStatus==warnStatus.AUDITED) {
        if(this.task.status==taskStatus.UNCREATED) return stepIndic["任务下发"]
        if(this.task.status==taskStatus.INITED) return stepIndic["任务接收"]
        if(this.task.status==taskStatus.RECIEVED) return stepIndic["任务流转"]
        if(this.task.status==taskStatus.FORWARD) return stepIndic["任务处置反馈"]
        if(this.task.status==taskStatus.FEEBACKED) return stepIndic["任务评价"]
        if(this.task.status==taskStatus.AUDITED) return stepIndic["任务归档"]
        if(this.task.status==taskStatus.ARCHIVED) return 7 //任务归档
        if(this.task.status==taskStatus.REJECTED) return stepIndic["任务处置反馈"]
      }
      return -1
    },
    orgUsers(){
      return this.users.map(u=>{
        const org = this.orgs.find(o=>o.id==u.departmentId)
        return {...u,admin:org?org.admin:undefined}
      }).filter(u=>u.admin!=undefined)
    },
    taskSteps(){
      if(this.fromWarn){
        return this.steps
      }else {
        return [{title:"任务审核"},...this.steps.slice(1,this.steps.length)]
      }
    },
  },
  created(){
    this.$axios.get(api.getDepartmentWithoutStation()).then(res=>{
      this.orgs = res.data
    })
    this.$axios.get(api.users()).then(res=>{
      this.users = res.data
    })
  },
  methods: {
    ...mapMutations("dispoal", ["setWarnStatus","setTask", "setWarnStatus"]),
    changeWarnStatus(status){
      this.$axios.post(api.updateWarnStatus(),{
        yjId:this.task.warnId,
        tableName: this.task.modelTable,
        dealStatus: status
      }).then(()=>{
        this.setWarnStatus(status)
      })
    },
    createTask(){
      this.createTaskLoading = true;
      const taskBase = {
        ...this.task,
        deadline: this.task.deadline.format("YYYYMMDDHHmmss"),
        remind: this.task.remind.format("YYYYMMDDHHmmss"),
        suggest: this.task.suggest,
      }
      const warnTasks = this.task.orgIds.map(id=>({orgId:id}))
      this.$axios.post(api.warnTasks(),{taskBase,warnTasks}).then(()=>{
        // 流程到此后此页面不再执行以后步骤
        this.setTask({...this.task,status:0})
        this.setWarnStatus(warnStatus.AUDITED)
        this.$message.success("成功");
        this.$emit("change")
        this.createTaskLoading = false;
      })
    },
    recieve(){
      this.$axios.put(`${api.warnTasks()}/${this.task.id}/recieve`).then(()=>{
        this.$message.success("成功")
        this.$emit("change")
        this.task.status = taskStatus.RECIEVED
      })
    },
    forward(){
      const {forwardUserId} = this.task
      this.$axios.put(`${api.warnTasks()}/${this.task.id}/forward`,{},{params:{forwardUserId}}).then(()=>{
        this.$message.success("成功")
        this.$emit("change")
        this.task.status = taskStatus.FORWARD
      })
    },
    feedback(){
      if (this.task.images.filter(m=>m.uploading).length>0) {
        this.$message.error("文件上传中，请稍后再试")
      }
      this.$axios.put(`${api.warnTasks()}/${this.task.id}/feedback`,{
        deal: this.task.deal,
        feedback: this.task.feedback,
        feedbackUser: this.task.feedbackUser,
        handlerUser: this.task.handlerUser,
        uploadFileIds: this.task.images.map(m=>m.id)
      }).then(res=>{
        this.task.status = taskStatus.FEEBACKED
        this.task.images = res.data.map(d=>({...d,url:api.warnImages(d.uploadFileId,d.suffix)}))
        this.$message.success("成功")
        this.$emit("change")
      })
    },
    audit(){
      this.$axios.put(`${api.warnTasks()}/${this.task.id}/audit`,{
        review: this.task.review,
      }).then(()=>{
        this.$message.success("成功")
        this.$emit("change")
        this.task.status = taskStatus.AUDITED
      })
    },
    reject(){
      this.$axios.put(`${api.warnTasks()}/${this.task.id}/reject`,{
        review: this.task.review,
      }).then(()=>{
        this.$message.success("成功")
        this.$emit("change")
        this.task.status = taskStatus.REJECTED
      })
    },
    archive(){
      this.$axios.put(`${api.warnTasks()}/${this.task.id}/archive`).then(()=>{
        this.task.status = taskStatus.ARCHIVED
        this.$message.success("成功")
        this.$emit("change")
      })
    },
  }
};
</script>
<style lang="less">
@import "../../assets/style/warn/modal.less";
</style>
