<template>
  <div id="roleTable">
    <div class="table_content">
      <a-table :columns="columns" :dataSource="loginlog" :pagination="pagination">
      </a-table>
    </div>
  </div>
</template>
<script>
import api from "@/api";

const columns = [
  {
    title: "序号",
    dataIndex: "index",
    key: "index",
    width: 80
  },
  {
    title: "用户名",
    dataIndex: "accountNumber",
    width: 180
  },
  {
    title: "姓名",
    dataIndex: "realname",
    width: 180
  },
  {
    title: "警号",
    dataIndex: "policeId",
    width: 180
  },
  {
    title: "IP",
    dataIndex: "clientIp",
    width: 180
  },
  {
    title: "登陆时间",
    dataIndex: "createTime",
    width: 180
  }
];

export default {
  name: "roleTable",
  data() {
    return {
      loginlog: [],
      columns,
      pageNum:1,
      pagination:{
         pageSize: 10,
         showQuickJumper:false,
         total:0,
         current:1,
         showTotal:total => `总共 ${total} 条记录`,
         onChange:(pageNum)=>{
           this.pageNum = pageNum;
           this.getLoginLogTable();
         }
      },
    };
  },
  props:{
      searchValue: {
        type: String,
        required: false,
      }
  },
  created() {
    this.getLoginLogNum();
    this.getLoginLogTable();
    console.log("ddd:"+this.pagination.current);
  },
  methods: {
    getLoginLogNum(){
      this.$axios.get(api.loginlognum(this.searchValue)).then(res => {
        this.pagination.total = res.data;
      });
    },
    getLoginLogTable() {
      this.pagination.current = this.pageNum;
      console.log("ccc:"+this.pagination.current);
      this.$axios.get(api.loginlogtable(this.searchValue,this.pageNum,10)).then(res => {
        this.loginlog = res.data;
        let start = (this.pageNum - 1) * 10;
        let index = 1;
        this.loginlog.forEach(ele => {
          ele.index = index + start;
          index++;
        });
        
      });
    },
    getLoginLog(){
      this.pageNum = 1;
      this.pagination.current=1;
      this.getLoginLogNum();
      this.getLoginLogTable();
    }
    
  }
};
</script>
<style scoped lang="less">
@import "~@/assets/style/authority.less";
@import "~@/assets/style/authority_modal.less";
</style>
