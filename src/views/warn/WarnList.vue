<template>
  <div class="home_wrap home_other" id="page" ref="page">
    <Header></Header>
    <left-menu />
    <div class="content_other">
      <div class="crumbs_nav">
        <a-breadcrumb>
          <a-breadcrumb-item>预警中心</a-breadcrumb-item>
        </a-breadcrumb>
      </div>
      <!-- <div class="page_tab">
        <a-radio-group v-model="presentation" button-style="solid">
          <a-radio-button value="a">
            分类
          </a-radio-button>
          <a-radio-button value="b">
            列表
          </a-radio-button>
        </a-radio-group>
      </div> -->
      <template v-if="presentation=='a'">
        <WarnClassification></WarnClassification>
      </template>
      <template v-if="presentation=='b'">
        <pop-notification ref="popNotification"/>
        <div class="search_container">
          <a-form-model layout="inline" :model="form">
            <a-form-model-item label="预警名称">
              <a-select v-model="form.warntype" placeholder="请选择预警名称">
                <a-select-option
                  v-for="item in modelNameList"
                  :value="item.modelTable"
                  :key="item.modelTable"
                >
                  {{ item.modelName }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
            <a-form-model-item>
              <a-button @click="getModelInfo" class="search_btn"> 查询 </a-button>
              <a-button @click="reset" class="reset_btn"> 重置 </a-button>
            </a-form-model-item>
          </a-form-model>
        </div>
        <div class="list_container">
          <a-table
            :columns="columns"
            :loading="loading"
            :data-source="warns"
            :pagination="pagination"
            :rowClassName="rowClassName"
            :scroll="{x:scrollX, y:520 }"
            rowKey="yj_id"
            bordered
          >
            <template #action>
              <a-button disabled class="table_action">任务追加</a-button><br/>
              <a-button disabled class="table_action">情报追加</a-button><br/>
              <a-button disabled class="table_action">请求服务</a-button>
            </template>
          </a-table>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
const columnsMap = {
  illegal_operation_res: [
    "hphm",
    "hpzl",
    "cllx",
    "xzqhmc",
    "hdzk",
    "syxz",
    "clpp1",
    "csys",
    "gcts",
    "dwbh_cnt",
    "kkbh",
  ],
  ly_jttzdcldb: ["hphm", "jttyyzt", "jttsyxz", "zdsyxz", "qymc"],
  ly_zdclyjcl: ["hphm", "yjsj", "fxwz", "ysyy", "hpzlms"],
  ly_zdclydyy: ["hphm", "clzl", "clzcd", "ssgs", "zhyccxsj", "xssc"],
  ly_jxrywfjsgxx: [
    "jxmc",
    "jxdm",
    "jxdz",
    "lxdh",
    "lxr",
    "fzjg",
    "rs",
    "wfsl",
    "fzjg",
    "jysgs",
    "jysgl",
    "sgs",
    "sgl",
  ],
  yhl_pljsyj: [
    "plate_number",
    "plate_type",
    "belong_area_pid",
    "warning_start_time",
    "warning_end_time",
    "kkid",
  ],
  ly_gps: ["hphm", "hpzlms", "xzqh", "syr", "cllxms", "clzlms"],
  
  month_yhl_warn_person: ["person_name", "person_id", "integral_int","alarm_level","create_time"],
  
  month_yhl_warn_car: ["plate_number", "integral_int", "alerm_level", "create_time"],
  month_yhl_warn_company: ["company_name", "integral_int", "alerm_level", "create_time"]
};
import LeftMenu from "../disposal/LeftMenu";
import Header from "./Header.vue";
import moment from "moment";
import api from "./../../api/index";
import PopNotification from "@/components/PopNotification.vue";
import WarnClassification from "./WarnClassification.vue";
export default {
  name: "Warn",
  data() {
    return {
      form: {
        warntype: "",
      },
      listData: [],
      columns: [],
      pagination: {
        current: 1,
        total: 0,
        pageSize: 10,
        showQuickJumper: true,
        showTotal: (total) => `总共 ${total} 条记录`,
        onChange: (pageNum) => {
          this.pagination.current = pageNum;
          this.getModelInfo(true)
        },
      },
      now: moment().format("YYYY-MM-DD HH:mm:ss"),
      modelNameList: [],
      steps: [
        {
          title: "交安委流转",
        },
        {
          title: "相关单位任务接收",
        },
        {
          title: "相关单位处置反馈",
        },
        {
          title: "交安委审核",
        },
        {
          title: "归档",
        },
      ],
      sendForm: {
        date1: undefined,
        date2: undefined,
        date3: undefined,
        desc: "",
        object: "1",
        unit: undefined,
      },
      columnsList: [],
      rowClassName: (record, index) => {
        if (index % 2 === 0) {
          return "dark_row";
        } else {
          return "light_row";
        }
      },
      IllegalOperationCodes:[],
      cities:[],
      scrollX:'100%',
      latestModel:undefined,
      presentation:'a',
      loading:false
    };
  },
  computed: {
    warns(){
      if(!this.latestModel) return []
      if(this.latestModel.dataSourceType=='mysql'&&this.latestModel.modelTable=="illegal_operation_res"){
        const types = new Set()
        this.IllegalOperationCodes.forEach(c=>types.add(c.type))
        return this.listData.map(d=>{
          const names = {}
          types.forEach(t=>{
            const code = d[t]
            const nameValue = this.IllegalOperationCodes.find(vn=>vn.code==code&&vn.type==t)
            names[t] = nameValue?nameValue.name:code
          })
          return {...d,...names}
        })
      }
      if(this.latestModel.dataSourceType=='psql'&&this.latestModel.modelTable=="ly_zdclydyy"){
        return this.listData.map(d=>{
          const {clzcd} = d
          const city = this.cities.find(c=>c.code==clzcd)
          return {...d,clzcd:city?city.name:clzcd}
        })
      }
      if(this.latestModel.dataSourceType=='psql'&&this.latestModel.modelTable=="ly_gps"){
        return this.listData.map(d=>{
          const {xzqh} = d
          const city = this.cities.find(c=>c.code==xzqh)
          return {...d,xzqh:city?city.name:xzqh}
        })
      }

      return this.listData;
    }
  },
  components: {
    LeftMenu,
    Header,
    PopNotification,
    WarnClassification
  },
  mounted() {
    // this.getModelName();
    this.form.warntype = "illegal_operation_res";
    setInterval(() => {
      this.now = moment().format("YYYY-MM-DD HH:mm:ss");
    }, 1000);
  },
  created(){
    // this.$axios.get(api.options("ilegal_operation_codes")).then((res) => {
    //   this.IllegalOperationCodes = res.data;
    // });
    // this.$axios.get(api.options("cities")).then((res) => {
    //   this.cities = res.data;
    // });
  },
  methods: {
    getModelName() {
      this.$axios.post(api.getModelName()).then((res) => {
        this.modelNameList = res.data;
        this.form.warntype = this.modelNameList[0].modelTable
        this.getModelInfo()
      });
      // this.modelNameList = [{"modelTable":"illegal_operation_res","modelName":"非法运营车辆预警"},{"modelTable":"ly1","modelName":"危化品运输"},{"modelTable":"ly2","modelName":"驾校"},{"modelTable":"ly3","modelName":"运单"},{"modelTable":"ly4","modelName":"非法"}]
    },
    getModelInfo(page) {
      if(!page) this.pagination.pageNum=1
      const pageNum = this.pagination.current
      const pageSize = this.pagination.pageSize
      let warnModel = {
        modelTable: this.form.warntype,
        dataSourceType : this.modelNameList.find(m=>m.modelTable==this.form.warntype).dataSourceType,
        pageNum,
        pageSize,
      };
      this.loading=true
      this.listData = []
      this.$axios.post(api.getModelList(), warnModel).then((res) => {
        this.latestModel = warnModel
        const {data} = res
        this.pagination.total = data.count
        var columns = [];
        data.comment.forEach((element) => {
          columns.push({
            title: element.comment,
            dataIndex: element.name,
            align: "center",
          });
        });
        this.columnsList = [];
        for (let i = 0; i < columns.length; i++) {
          this.columnsList.push(columns[i].dataIndex);
        }

        const currentColumns = columnsMap[this.form.warntype];
        this.columns = currentColumns.map((c) =>
          columns.find((co) => co.dataIndex == c)
        );
        this.columns.unshift({
          title: "序号",
          dataIndex: "index",
          align: "center",
          width: "80px",
        },);
        this.columns.push({
          title: "处置状态",
          dataIndex: "czzt",
          scopedSlots: { customRender: "czzt" },
          align: "center",
          width: "10%",
        });
        this.columns.push({
          title: "操作",
          dataIndex: "action",
          scopedSlots: { customRender: "action" },
          fixed: "right",
          align: "center", 
          width: "0",
        });
        this.listData = data.tableInfo;
        for (let i = 0; i < this.listData.length; i++) {
          this.listData[i].index = i + 1;
        }
      }).finally(()=>this.loading=false);
      
      this.scrollX = this.columns.length>6?this.columns.length*200:"100%"
    },
    reset() {
      this.form.warntype = "";
    },
    emergency(){
      this.$refs.popNotification.showConfirm()
    }
  },
};
</script>
<style lang="less" scoped>
@import "../../assets/style/warn/home.less";
@import "../../assets/style/warn/warn.less";
@import "../../assets/style/warn/modal.less";
.home_wrap .search_container {
  width: calc(100% - 140px);
  margin: 0 114px;
  margin-top: 33px;
  height: 100px;
  background: url(data:image/png;base64,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)
    no-repeat;
  background-size: 100% 100%;
  padding: 20px;
  line-height: 60px;
}
/deep/.content_other .crumbs_nav {
  color: #0697e9;
  padding-left: 114px;
  margin-top: 10px;
  font-size: 16px;
}
/deep/.ant-modal-body {
    padding: 24px;
    padding-top: 52px;
    font-size: 14px;
    line-height: 2;
    word-wrap: break-word;
}
</style>
