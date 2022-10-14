<template>
  <div class="home_wrap home_other" ref="page">
    <Header v-if="!noHeader" />
    <left-menu />
    <div class="content_other">
      <a-modal
        title="任务处置"
        :visible="modalVisible"
        @cancel="() => setModalVisible(false)"
        centered
        :maskClosable="false"
        :getContainer="() => $refs.page"
        width="12rem"
        :footer="null"
      >
        <task-flow @change="fetchTasks"/>
      </a-modal>
      <div class="crumbs_nav">
        <a-breadcrumb>
          <a-breadcrumb-item>{{ currentPage }}</a-breadcrumb-item>
        </a-breadcrumb>
      </div>
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
            <a-select v-model="searchForm.state" placeholder="请选择任务状态">
              <a-select-option value="0"> 已下发 </a-select-option>
              <a-select-option value="1"> 已接受 </a-select-option>
              <a-select-option value="2"> 已流转 </a-select-option>
              <a-select-option value="3"> 已反馈 </a-select-option>
              <a-select-option value="5"> 已归档 </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item>
            <a-button class="search_btn" @click="fetchTasks" > 查询 </a-button>
            <a-button class="reset_btn" @click="searchForm.content=undefined,searchForm.date=[undefined,undefined]"> 重置 </a-button>
          </a-form-model-item>
        </a-form-model>
      </div>
      <div class="task_container" ref="page">
        <a-table
          rowKey="id"
          :columns="columns"
          :data-source="namedTasks"
          bordered
          :rowClassName="rowClassName"
          :pagination="pagination"
        >
          <template #action="text, record">
            <a-button class="table_action" @click="() => fetchDetail(record)"
              >详情</a-button
            >
            <!-- <a-button class="table_action" @click="escalation">上报</a-button> -->
            <!-- <a-button class="table_action" >审批</a-button> -->
          </template>
          <template #createTime="text, record">
            <p>{{ record.createTime | timeFilter }}</p>
          </template>
          <template #deadline="text, record">
            <p>{{ record.deadline | timeFilter }}</p>
          </template>
          <template #status="text, record">
            <p>{{ record.status | statusFilter }}</p>
          </template>
        </a-table>
        <!-- 上报 -->
      </div>
    </div>
  </div>
</template>
<script>
import LeftMenu from "../disposal/LeftMenu";
import Header from "../warn/Header.vue";
import TaskFlow from "../disposal/TaskFlow.vue";
import moment from "moment";
import api from "@/api/index";
import { mapState, mapMutations, mapActions } from "vuex";
const columns = [
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
    title: "办理人员",
    dataIndex: "handlerUser",
    align: "center",
  },
  {
    title: "接收单位",
    dataIndex: "orgName",
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
  name: "TaskTable",
  components: {
    LeftMenu,
    Header,
    TaskFlow,
  },
  props: {
    status:{
      required: false,
      default: ()=>[]
    }
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
      pagination: {
        pageSize: 10,
        showTotal: (total) => `共 ${total} 条数据`,
        showSizeChanger: true,
        onChange: this.paginationChange,
        current: 1,
        total: 0,
      },
      searchForm: {
        content: undefined,
        date: [undefined, undefined],
        state: undefined
      },
      tasks: [],
      orgs: [],
      users: []
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
    namedTasks(){
      return this.tasks.map((t) => {
        const org = this.orgs.find(o=>o.id==t.orgId)
        const orgName=org?org.orgName:""
        const user = this.users.find(u=>u.id==t.userId)
        const creater=user?user.realName:""
        return { ...t, orgName, creater };
      });
    }
  },
  filters: {
    timeFilter(val) {
      if (!val) return "";
      return val.format("YYYY年MM月DD日");
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
    this.fetchTasks()
  },
  methods: {
    ...mapMutations("dispoal", [
      "setFromWarn",
      "setModalVisible",
      "setAdmin",
      "setTask",
      "setTasks",
    ]),
    ...mapActions("dispoal", ["fetchDetail"]),
    paginationChange(page, pageSize) {
      this.pagination.current = page;
      this.pagination.pageSize = pageSize;
      this.fetchTasks()
    },
    fetchTasks(){
      this.$axios.post(`${api.warnTasks()}/tasks`, {
        content: this.searchForm.content,
        start: this.searchForm.date[0]?this.searchForm.date[0].format("YYYYMMDDHHmmss"):undefined,
        end: this.searchForm.date[1]?this.searchForm.date[1].format("YYYYMMDDHHmmss"):undefined,
        current: this.pagination.current,
        size: this.pagination.pageSize,
        status: this.status,
        state: this.searchForm.state,
      }).then((res) => {
        this.tasks = res.data.records.map((t) => ({
          ...t,
          remind: moment(t.remind, "YYYYMMDDHHmmss"),
          deadline: moment(t.deadline, "YYYYMMDDHHmmss"),
          createTime: moment(t.createTime, "YYYYMMDDHHmmss"),
        }));
        this.pagination.total = res.data.total
      });
    }
  },
};
</script>
<style lang="less" scoped>
@import "../../assets/style/warn/home.less";
@import "../../assets/style/warn/modal.less";
@import "../../assets/style/disposal/disposal.less";
</style>