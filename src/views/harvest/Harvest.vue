<template>
  <div class="home_wrap home_other" ref="page">
    <Header v-if="!noHeader" />
    <left-menu />
    <div class="content_other" ref="contentOtherDiv">
      <template>
        <TaskDetail></TaskDetail>
      </template>
      <template v-if="newVisible">
        <NewTask></NewTask>
      </template>
    </div>
  </div>
</template>
<script>
import LeftMenu from "./layout/LeftMenu.vue";
import Header from "./layout/Header.vue";
import TaskDetail from "../disposal/taskdetail/TaskDetail.vue";
import NewTask from "../disposal/taskdetail/NewTask.vue";
import moment from "moment";
import api from "@/api/index";
import { mapState, mapMutations, mapActions } from "vuex";
const baseColumns=[
  {
    title: "序号",
    dataIndex: "index",
    align: "center",
  },
  {
    title: "预警内容",
    dataIndex: "warnContent",
    align: "center",
  },
  {
    title: "创建人",
    dataIndex: "creater",
    align: "center",
  },
  {
    title: "创建时间",
    scopedSlots: { customRender: "createTime" },
    align: "center",
  },
  {
    title: "截止时间",
    scopedSlots: { customRender: "deadline" },
    align: "center",
  },
  {
    title: "任务状态",
    dataIndex: "status",
    scopedSlots: { customRender: "status" },
    align: "center",
  },
  {
    title: "操作",
    dataIndex: "action",
    align: "center",
    scopedSlots: { customRender: "action" },
  },
]
const columns = [
  {
    title: "接收单位",
    dataIndex: "orgName",
    align: "center",
  },
  {
    title: "处理人",
    dataIndex: "handlerUser",
    align: "center",
  },
  {
    title: "反馈人",
    dataIndex: "feedbackUser",
    align: "center",
  },
  {
    title: "任务状态",
    dataIndex: "status",
    scopedSlots: { customRender: "status" },
    align: "center",
  },
  {
    title: "操作",
    dataIndex: "action",
    align: "center",
    scopedSlots: { customRender: "action" },
  },
];
export default {
  name: "AllTaskBase",
  components: {
    LeftMenu,
    Header,
    TaskDetail,
    NewTask
  },
  data() {
    return {
      rowClassName: (record, index) => {
        if (index % 2 === 0) {
          return "dark_row";
        } else {
          return "light_row";
        }
      },
      columns,
      baseColumns,

      pagination: {
        pageSize: 8,
        showTotal: (total) => `共 ${total} 条数据`,
        showSizeChanger: false,
        onChange: this.paginationChange,

        current: 1,
        total: 0,
      },
      searchForm: {
        content: undefined,
        date: [undefined, undefined],
      },
      taskBases: [],
      users: [],
      orgs: [],
      tasks: [],
      currentTaskBase: {},
      subVisible: false,
      showList: true,
      newVisible:false
    };
  },
  computed: {
    ...mapState("dispoal", ["fromWarn", "modalVisible", "admin", "task"]),
    currentPage() {
      return this.$route.meta.title;
    },
    noHeader() {
      return this.$route.query.noHeader == "true"
    },
    namedTaskBases(){
      return this.taskBases.map((t,i) => {
        const user = this.users.find((u) => u.id == t.userId);
        const creater = user ? user.realName : "";
        return { ...t, creater,index:(this.pagination.current-1)*this.pagination.pageSize+i+1  };
      });
    },
    namedTasks(){
      return this.tasks.map((t) => {
        const org = this.orgs.find(o=>o.id==t.orgId)
        const orgName=org?org.orgName:""
        return { ...t, orgName};
      });
    },
    
  },
  filters: {
    timeFilter(val) {
      if (!val) return "";
      return val.format("YYYY年MM月DD日");
    },
    baseStatusFilter(val) {
      switch (val) {
        case 0:
          return "已下发";
        case 1:
          return "可归档";
        case 2:
          return "已归档";
        default:
          return "异常状态";
      }
    },
    statusFilter(val) {
      switch (val) {
        case -1:
          return "审核未通过";
        case 0:
          return "已下发";
        case 1:
          return "已收到";
        case 2:
          return "已流转";
        case 3:
          return "已经反馈";
        case 4:
          return "审核通过";
        case 5:
          return "已归档";
        default:
          return "异常状态";
      }
    },
  },
  created() {
    this.setAdmin(JSON.parse(localStorage.getItem("userInfo")).admin);
    this.$axios.get(api.organizations()).then((res) => this.orgs = res.data);
    this.$axios.get(api.users()).then((res) =>  this.users = res.data);
    this.fetchTaskBases()
  },
  mounted(){
    if(this.$route.query.taskid){
      this.showList = false
    }else{
      this.showList = true
    }
    if(this.$route.query.isnew){
      this.newVisible = true
    }else{
      this.newVisible = false
    }
  },
  methods: {
    ...mapMutations("dispoal", [
      "setFromWarn",
      "setModalVisible",
      "setAdmin",
      "setTask",
    ]),
    ...mapActions("dispoal", ["fetchDetail"]),
    fetchTaskBases(){
      this.$axios.get(api.warnTasks(),{
        params: {
          content: this.searchForm.content,
          start: this.searchForm.date[0]?this.searchForm.date[0].format("YYYYMMDDHHmmss"):undefined,
          end: this.searchForm.date[1]?this.searchForm.date[1].format("YYYYMMDDHHmmss"):undefined,
          current: this.pagination.current,
          size: this.pagination.pageSize
        }
      }).then((res) => {
        this.taskBases = res.data.records.map((t) => ({
          ...t,
          remind: moment(t.remind, "YYYYMMDDHHmmss"),
          deadline: moment(t.deadline, "YYYYMMDDHHmmss"),
          createTime: moment(t.createTime, "YYYYMMDDHHmmss"),
        }));
        this.pagination.total = res.data.total
      });
    },
    addTask() {
      this.setTask({ orgIds: [], images: [], taskType: 1, status: -2 });
      this.setModalVisible(true);
      this.setFromWarn(false);
    },
    paginationChange(page, pageSize) {
      this.pagination.current = page;
      this.pagination.pageSize = pageSize;
      this.fetchTaskBases()
    },
    fetchTasks(taskBase){
      this.currentTaskBase = taskBase
      this.subVisible = true
      this.$axios.get(`${api.warnTasks()}/${taskBase.id}/tasks`).then((res) => {
        this.tasks = res.data.map((t) => ({
          ...t,
          updateTime: moment(t.updateTime, "YYYYMMDDHHmmss"),
        }));
      });
    },
    archive(task){
      this.$axios.put(`${api.warnTasks()}/${task.id}/archive`).then(()=>{
        task.status = 2
        this.$message.success("成功")
        this.fetchTaskBases()
      })
    },
    //详情
    showTaskDetail(){
      this.showList = false
      this.$router.push({path: '/all', query: {taskid: "2"}})
      // console.log(this.$route.query.taskid)
    },
    hanldeBreadClick(){
      this.showList = true
      this.$router.push('/all')
    },
    addNewTask(){
      this.$router.push({path: '/all', query: {isnew: "1"}})
    }
  },
};
</script>
<style lang="less" scoped>
@import "../../assets/style/warn/home.less";
@import "../../assets/style/warn/modal.less";
@import "../../assets/style/disposal/disposal.less";
</style>