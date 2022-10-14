<template>
  <div ref="warnTypeTable">
    <div class="table_btns">
      <a-modal
        v-model="visible"
        title="用户"
        :maskClosable="false"
        centered
        :getContainer="() => this.$refs.warnTypeTable"
        width="42.7vw"
      >
        <template slot="footer">
          <a-button key="submit" type="primary" class="submit_btn" @click="handleOk">提交</a-button>
          <a-button key="back" class="cancel_btn" @click="()=>visible=false">取消</a-button>
        </template>
        <a-form-model
          :model="current"
          ref="form"
          :rules="rules"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
          class="user_form"
        >
          <a-form-model-item label="表名" prop="modelTable">
            <a-input :value="current.modelTable" />
          </a-form-model-item>
          <a-form-model-item label="名称" prop="modelName">
            <a-input :value="current.modelName" />
          </a-form-model-item>
          <a-form-model-item label="id" prop="modelId">
            <a-input :value="current.modelId" />
          </a-form-model-item>
          <a-form-model-item label="类型" prop="modelType">
            <a-select
              :value="current.modelType"
              style="width: 100%"
              :options="types"
            />
          </a-form-model-item>
          <a-form-model-item label="库" prop="dataSourceType">
            <a-select
              :value="current.dataSourceType"
              style="width: 100%"
              :options="dbs.map(d=>({value:d,label:d}))"
            />
          </a-form-model-item>
          <a-form-model-item label="单位" prop="organizationId">
            <a-select
              v-model="current.organizationId"
              style="width: 100%"
              :options="orgs.map(o=>({value:o.id,label:o.orgName}))"
            />
          </a-form-model-item>
          <a-form-model-item label="预警类别" prop="warnType">
            <a-select v-model="current.warnType" placeholder="请选择预警类别">
              <a-select-option value="0"> 日常处置 </a-select-option>
              <a-select-option value="1"> 战时处置 </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-form-model>
      </a-modal>
    </div>
    <div class="table_content" style="max-height:550px">
      <a-table
        row-key="id"
        :columns="columns"
        :dataSource="warnModels"
        :pagination="pagination"
      >
        <template #warnType="text, record">
          {{ record.warnType | filterWarnType }}
        </template>
        <template slot="action" slot-scope="text, record">
          <a href="javascript:;" class="modify" @click="edit(record.id)">修改</a>
          <a href="javascript:;" class="delete" @click="deleteOne(record.id)">删除</a>
        </template>
      </a-table>
    </div>
  </div>
</template>
<script>
const types=[
  {
    label: "自建",
    value: 0
  },
  {
    label: "接入",
    value: 1
  }
]
const dbs = ["mysql","psql","oracle"]
const columns = [
  {
    title: "表名",
    dataIndex: "modelTable",
    key: "modelTable",
  },
  {
    title: "名称",
    dataIndex: "modelName",
    key: "modelName",
  },
  {
    title: "modelId",
    key: "modelId",
    dataIndex: "modelId",
  },
  {
    title: "类型",
    dataIndex: "modelTypeLabel",
    key: "modelTypeLabel",
  },
  {
    title: "数据库",
    key: "dataSourceType",
    dataIndex: "dataSourceType",
  },
  {
    title: "来源单位",
    key: "orgName",
    dataIndex: "orgName",
  },
  {
    title: "预警类别",
    key: "warnType",
    dataIndex: "warnType",
    scopedSlots: { customRender: "warnType" },
  },
  {
    title: "操作",
    key: "action",
    scopedSlots: { customRender: "action" },
    width: 150
  }
];

import api from "@/api";
export default {
  name: "WarnTypeTable",
  data() {
    return {
      origins: [],
      columns,
      rules: {},
      pagination: {
        showSizeChanger: true,
        showTotal: (total, range) => {
          return `共${total}条,当前为第${range[0]}条至第${range[1]}条`;
        }
      },
      orgs: [],
      current: {},
      visible: false,
      dbs,
      types,
    };
  },
  computed: {
    warnModels(){
      return this.origins.map(o=>{
        const org = this.orgs.find(org=>org.id==o.organizationId)
        return {...o,orgName:org?org.orgName:'',modelTypeLabel:types.find(t=>t.value==o.modelType).label}
      })
    }
  },
  filters: {
    filterWarnType(value) {
      switch (value) {
        case 0:
          return "日常处置";
        case 1:
          return "战时处置";
      }
    },
  },
  created() {
    this.$axios.get(api.organizations()).then((res) => this.orgs = res.data);
    this.fetchData()
  },
  methods: {
    fetchData(){
      this.$axios.get(api.warnModels()).then((res) => this.origins = res.data);
    },
    edit(id){
      this.visible = true
      this.current = {...this.origins.find(o=>o.id==id)}
      this.current.warnType = this.current.warnType == 0 ? "日常处置" : "战时处置";
    },
    handleOk() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$axios.put(api.warnModels(this.current.id), this.current).then(() => {
            this.$message.success("成功");
            console.log(this.current);
            this.fetchData();
            this.visible = false;
          });
        }
      });
    },
  }
};
</script>
<style scoped lang="less">
@import "../../assets/style/authority.less";
@import "../../assets/style/authority_modal.less";
/deep/.ant-modal-close-x {
  display: block;
  width: 56px;
  height: 56px;
  font-size: 16px;
  font-style: normal;
  line-height: 56px;
  text-align: center;
  text-transform: none;
  text-rendering: auto;
  margin-top: 10px;
}
/deep/.ant-select-tree li {
    margin: 8px 0;
    padding: 0;
    white-space: nowrap;
    list-style: none;
    outline: 0;
    text-align: left;
}
</style>
