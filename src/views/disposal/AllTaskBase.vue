<template>
  <div class="home_wrap home_other" ref="page">
    <Header v-if="!noHeader"></Header>
    <left-menu />
    <div class="content_other" ref="contentOtherDiv">
      <div class="crumbs_nav">
        <a-breadcrumb>
          <a-breadcrumb-item>{{ currentPage }}
            <img @click="hanldeBreadClick" v-if="!showList && presentation == 'a'" src="@/assets/images/warn/taskdetail/close_icon.png"/>
          </a-breadcrumb-item>
        </a-breadcrumb>
        <a-button class="export_btn" v-if="presentation == 'b'" @click="exportExcel"></a-button>
        <a-button class="search_btn" v-if="currentCityCode" @click="goback">返回</a-button>
      </div>
      <div class="page_tab">
        <a-radio-group v-model="presentation" button-style="solid">
          <a-radio-button value="a">
            详情
          </a-radio-button>
          <a-radio-button value="b">
            统计
          </a-radio-button>
        </a-radio-group>
      </div>
      <template v-if="presentation == 'b'">
        <div class="task_container" ref="page">
          <a-table
            rowKey="name"
            :columns="warnStatColumns"
            bordered
            :data-source="currentStats"
            :rowClassName="rowClassName"
            :loading="loading"
            :pagination="statPagination"
          >
            <template #name="text, record">
              <a @click="drill(record)">{{ text }}</a>
            </template>
            <template #total="text, record">
              <a @click="statDetail(record, null, null)">{{ text }}</a>
            </template>
            <template #intercept="text, record">
              <a @click="statDetail(record, 1, null)">{{ text }}</a>
            </template>
            <template #feedback="text, record">
              <a @click="statDetail(record, null, 3)">{{ text }}</a>
            </template>
          </a-table>
        </div>
        <a-modal
          title="任务列表"
          :visible="statDetailVisible"
          @cancel="statDetailVisible = false"
          :maskClosable="false"
          :getContainer="() => $refs.contentOtherDiv"
          centered
          width="12rem"
          :footer="null"
          destroyOnClose
        >
          <div class="task_container" ref="page">
            <a-table
              rowKey="id"
              :columns="statDetailColumns"
              :data-source="statDetailData"
              bordered
              :rowClassName="rowClassName"
              :pagination="statDetailPagination"
            >
              <template #createTime="text, record">
                <p>{{ record.createTime | timeFilter }}</p>
              </template>
              <template #deadline="text, record">
                <p>{{ record.deadline | timeFilter }}</p>
              </template>
              <template #status="text, record">
                <p>{{ record.status | baseStatusFilter }}</p>
              </template>
            </a-table>
          </div>
        </a-modal>
      </template>
      <template v-else>
        <template v-if="showList">
          <!-- <a-button @click="showTaskDetail">详情</a-button>
          <a-button @click="addNewTask">新增</a-button> -->
          <div class="search_container" style="margin-top: 0.1rem">
            <a-form-model layout="inline" :model="searchForm">
              <a-form-model-item label="预警内容">
                <a-input v-model="searchForm.content" placeholder="请输入预警内容" />
              </a-form-model-item>
              <a-form-model-item label="创建日期">
                <a-range-picker
                  v-model="searchForm.date"
                  :show-time="{ format: 'HH:mm' }"
                  format="YYYY-MM-DD HH:mm"
                  :placeholder="['开始时间', '结束时间']"
                >
                  <img
                    src="../../assets/images/warn/modal/date_icon.png"
                    slot="suffixIcon"
                  />
                </a-range-picker>
              </a-form-model-item>
              <a-form-model-item label="任务状态">
                <a-select allowClear v-model="searchForm.state" placeholder="请选择任务状态">
                  <a-select-option value="0"> 未归档 </a-select-option>
                  <a-select-option value="1"> 可归档 </a-select-option>
                  <a-select-option value="2"> 已归档 </a-select-option>
                </a-select>
              </a-form-model-item>
              <a-form-model-item label="下发任务状态">
                <a-select allowClear v-model="searchForm.issueState" placeholder="请选择下发任务状态">
                  <a-select-option value="0"> 已下发 </a-select-option>
                  <a-select-option value="1"> 已接受 </a-select-option>
                  <a-select-option value="2"> 已流转 </a-select-option>
                  <a-select-option value="3"> 已反馈 </a-select-option>
                  <a-select-option value="5"> 已归档 </a-select-option>
                </a-select>
              </a-form-model-item>
              <a-form-model-item>
                <a-button class="search_btn" @click="fetchTaskBases" > 查询 </a-button>
                <a-button class="reset_btn" @click="searchForm.content=undefined,searchForm.date=[undefined,undefined]"> 重置 </a-button>
                <a-button class="search_btn" @click="addTask"> 新增 </a-button>
              </a-form-model-item>
            </a-form-model>
          </div>
          <div class="task_container" ref="page">
            <a-table
              rowKey="id"
              :columns="baseColumns"
              :data-source="namedTaskBases"
              bordered
              :rowClassName="rowClassName"
              :pagination="pagination"
            >
              <template #action="text, record">
                <a-button class="table_action" @click="() => fetchTasks(record)"
                  >下发任务列表</a-button
                >
                <a-button :class="record.status==1?'table_action':'cancel_btn'" :disabled="record.status!=1" @click="()=>archive(record)">归档</a-button>
                <!-- <a-button class="table_action" >审批</a-button> -->
              </template>
              <template #createTime="text, record">
                <p>{{ record.createTime | timeFilter }}</p>
              </template>
              <template #deadline="text, record">
                <p>{{ record.deadline | timeFilter }}</p>
              </template>
              <template #status="text, record">
                <p>{{ record.status | baseStatusFilter }}</p>
              </template>
            </a-table>
            <!-- 上报 -->
          </div>  
          <!-- 任务处置弹窗 -->
          <a-modal
            title="任务处置"
            :visible="modalVisible"
            @cancel="()=>setModalVisible(false)"
            centered
            :maskClosable="false"
            :getContainer="() => $refs.page"
            width="12rem"
            :footer="null"
          >
            <task-flow/>
          </a-modal>
          <a-modal
            title="下发任务列表"
            :visible="subVisible"
            @cancel="subVisible = false"
            centered
            :maskClosable="false"
            :getContainer="() => $refs.contentOtherDiv"
            width="12rem"
            :footer="null"
          >
            <div class="task_container" ref="page">
              <a-table
                rowKey="id"
                :columns="columns"
                :data-source="namedTasks"
                bordered
                :rowClassName="rowClassName"
                :pagination="false"
              >
                <template #action="text, record">
                  <a-button class="table_action" @click="() => fetchDetail({...currentTaskBase,...record})"
                    >详情</a-button
                  >
                </template>
                <template #status="text, record">
                  <p>{{ record.status | statusFilter }}</p>
                </template>
              </a-table>
            </div>
          </a-modal>

        </template>
        <template v-else>
          <template>
            <TaskDetail></TaskDetail>
          </template>
          <template v-if="newVisible">
            <NewTask></NewTask>
          </template>
        </template>
      </template>
    </div>
  </div>
</template>
<script>
import LeftMenu from "../disposal/LeftMenu";
import Header from "../warn/Header.vue";
import TaskFlow from "../disposal/TaskFlow.vue";
import TaskDetail from "../disposal/taskdetail/TaskDetail.vue";
import NewTask from "../disposal/taskdetail/NewTask.vue";
import moment from "moment";
import api from "@/api/index";
import cities from "@/common/tjcity";
import { mapState, mapMutations, mapActions } from "vuex";
const baseColumns=[
  {
    title: "序号",
    dataIndex: "index",
    align: "center",
    width: "5%"
  },
  {
    title: "预警内容",
    dataIndex: "warnContent",
    align: "center",
    width: "40%",
    ellipsis: true
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    scopedSlots: { customRender: "createTime" },
    align: "center",
  },
  {
    title: "截止时间",
    dataIndex: "deadline",
    scopedSlots: { customRender: "deadline" },
    align: "center",
  },
  {
    title: "任务状态",
    dataIndex: "status",
    scopedSlots: { customRender: "status" },
    align: "center",
    width: "10%"
  },
  {
    title: "操作",
    dataIndex: "action",
    align: "center",
    scopedSlots: { customRender: "action" },
  },
];
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
const warnStatColumns = [
  {
    title: "部门名称",
    dataIndex: "name",
    align: "center",
    scopedSlots: { customRender: "name"}
  },
  {
    title:"任务总数",
    dataIndex:"total",
    align:"center",
    scopedSlots: { customRender: "total"}
  },
  {
    title: "已拦截数",
    dataIndex: "intercept",
    align: "center",
    scopedSlots: { customRender: "intercept"}
  },
  {
    title: "已反馈数",
    dataIndex: "feedback",
    align: "center",
    scopedSlots: { customRender: "feedback"}
  },
  {
    title: "拦截率",
    dataIndex: "interceptRate",
    align: "center",
  },
  {
    title: "反馈率",
    dataIndex: "feedbackRate",
    align: "center",
  },
];
const statDetailColumns = [
  {
    title: "序号",
    dataIndex: "index",
    align: "center",
    width: "5%"
  },
  {
    title: "预警内容",
    dataIndex: "warnContent",
    align: "center",
    ellipsis: true
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    scopedSlots: { customRender: "createTime" },
    align: "center",
  },
  {
    title: "截止时间",
    dataIndex: "deadline",
    scopedSlots: { customRender: "deadline" },
    align: "center",
  },
  {
    title: "任务状态",
    dataIndex: "status",
    scopedSlots: { customRender: "status" },
    align: "center",
  },
]
export default {
  name: "AllTaskBase",
  components: {
    LeftMenu,
    Header,
    TaskFlow,
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
      dataSource:[],
      warnStatDataSource: [],
      columns,
      baseColumns,
      warnStatColumns,
      pagination: {
        pageSize: 8,
        showTotal: (total) => `共 ${total} 条数据`,
        showSizeChanger: false,
        onChange: this.paginationChange,
        current: 1,
        total: 0,
      },
      statPagination:{
        pageSize: 10,
        showTotal:total => `总共 ${total} 条记录`,
      },
      statDetailPagination:{
        current: 1,
        pageSize: 8,
        total: 0,
        showTotal: (total) => `共 ${total} 条数据`,
        showSizeChanger: false,
        onChange: this.statDetailPaginationChange,
      },
      searchForm: {
        content: undefined,
        date: [undefined, undefined],
        state: undefined,
        issueState: undefined
      },
      taskBases: [],
      users: [],
      orgs: [],
      tasks: [],
      currentTaskBase: {},
      subVisible: false,
      presentation: "a",
      loading: false,
      stats:[],
      currentCityCode: undefined,
      currentDepId: undefined,
      statDetailColumns,
      statDetailVisible: false,
      statDetailData: [],
      recordLocal: {},
      stateTypeLocal: undefined,
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
    depStats(){
      return this.stats.map(s=>{
        const {id,name,cityCode} = s
        const total = s.total+s.children.map(c=>c.total).reduce((o1,o2)=>o1+o2,0)
        const feedback = s.feedback+s.children.map(c=>c.feedback).reduce((o1,o2)=>o1+o2,0)
        const intercept = s.intercept+s.children.map(c=>c.intercept).reduce((o1,o2)=>o1+o2,0)
        return {id,name,total,feedback,intercept,cityCode}
      })
    },
    cityStats(){
      const ct = cities.map(c=>{
        const depStats = this.depStats.filter(d=>d.cityCode==c.code)
        const total = depStats.map(d=>d.total).reduce((o1,o2)=>o1+o2,0)
        const feedback = depStats.map(d=>d.feedback).reduce((o1,o2)=>o1+o2,0)
        const intercept = depStats.map(d=>d.intercept).reduce((o1,o2)=>o1+o2,0)
        return {...c,total,feedback,intercept}
      })
      if(!this.$store.state.userInfo.userInfo.cityCode){
        return ct
      }
      return ct.filter(s => s.total > 0);
    },
    // stationStats(){
    //   return this.stats.map(s=>s.children)
    // },
    currentStats(){
      let stats
      if(this.currentDepId){
        stats = this.stats.filter(s => this.currentDepId==s.name).map(s => s.children).flat()
      }else if(this.currentCityCode){
        stats = this.depStats.filter(d=>d.cityCode==this.currentCityCode)
      }else {
        stats = this.cityStats
      }
      stats.sort((o1,o2)=>o2.total-o1.total)
      return stats.map(s=>{
        const feedbackRate = s.total==0?"0.00%":`${(s.feedback*100/s.total).toFixed(2)}%`
        const interceptRate = s.total==0?"0.00%":`${(s.intercept*100/s.total).toFixed(2)}%`
        return {...s,feedbackRate,interceptRate}
      })
    }
  },
  filters: {
    timeFilter(val) {
      if (!val) return "";
      return val.format("YYYY年MM月DD日");
    },
    baseStatusFilter(val) {
      switch (val) {
        case 0:
          return "未归档";
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
          return "已接受";
        case 2:
          return "已流转";
        case 3:
          return "已反馈";
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
  mounted() {
    this.fetchWarnStat();
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
    fetchWarnStat() {
      this.loading = true
      this.$axios.get(api.warnTaskStat()).then(res => {
        this.stats = res.data
        this.loading = false;
      })
    },
    drill(record) {
      console.log(record);
      if(!this.currentCityCode){
        this.currentCityCode = record.code
      }else if(!this.currentDepId){
        this.currentDepId = record.name
      }
    },
    statDetail(record,interceptStatus, feedBackStatus) {
      let orgId = "";
      if(record.code) {
        orgId = record.code.slice(0, 4);
      }
      if(record.cityCode) {
        orgId = record.cityCode
      }
      if(record.id) {
        orgId = record.id
      }
      this.$axios.get(api.warnTasks(), {
        params: {
          content: undefined,
          start: undefined,
          end: undefined,
          state: undefined,
          issueState: undefined,
          current: this.statDetailPagination.current,
          size: this.statDetailPagination.pageSize,
          orgId: orgId,
          feedBackStatus: feedBackStatus,
          interceptStatus: interceptStatus
        }
      }).then((res) => {
        this.statDetailData = res.data.records.map((d, i) => ({
          ...d,
          deadline: moment(d.deadline, "YYYYMMDDHHmmss"),
          createTime: moment(d.createTime, "YYYYMMDDHHmmss"),
          index: (this.statDetailPagination.current-1) * this.statDetailPagination.pageSize + i + 1
        }))
        this.statDetailPagination.total = res.data.total;
        this.statDetailVisible = true;
        this.recordLocal = record;
        this.stateTypeLocal = feedBackStatus;
      })
    },
    statDetailPaginationChange(page, pageSize) {
      this.statDetailPagination.current = page;
      this.statDetailPagination.pageSize = pageSize;
      this.statDetail(this.recordLocal, this.stateTypeLocal);
    },
    fetchTaskBases(){
      this.$axios.get(api.warnTasks(),{
        params: {
          content: this.searchForm.content,
          start: this.searchForm.date[0]?this.searchForm.date[0].format("YYYYMMDDHHmmss"):undefined,
          end: this.searchForm.date[1]?this.searchForm.date[1].format("YYYYMMDDHHmmss"):undefined,
          state: this.searchForm.state,
          issueState: this.searchForm.issueState,
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
    },
    hanldeBreadClick(){
      this.showList = true
      this.$router.push('/all')
    },
    addNewTask(){
      this.$router.push({path: '/all', query: {isnew: "1"}})
    },
    goback(){
      if(this.currentDepId){
        this.currentDepId=undefined
      }else if(this.currentCityCode){
        this.currentCityCode=undefined
      }
    },
    exportExcel(){
      // const querystring = require("querystring");
      this.$axios.post(api.export('123'),{"infos":this.currentStats},
          {
            responseType: "blob",
          }).then(res => {
        this.downloadFile(res.data);
      })
    },
    downloadFile(data) {
      // 文件导出
      if (!data) {
        return;
      }
      let url = window.URL.createObjectURL(new Blob([data]));
      let link = document.createElement("a");
      link.style.display = "none";
      link.href = url;
      link.setAttribute("download", "各地市部门预警统计表.xls");
      document.body.appendChild(link);
      link.click();
    },
  },
};
</script>
<style lang="less" scoped>
@import "../../assets/style/warn/home.less";
@import "../../assets/style/warn/modal.less";
@import "../../assets/style/disposal/disposal.less";
</style>