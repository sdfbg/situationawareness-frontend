<template>
  <div class="tab_table">
    <div class="tab_btns">
      <a-button @click="batchRemove()" class="multi_remove">批量移除</a-button>
      <a-button @click="goRelateApplications" class="add_app">添加应用</a-button>
    </div>
    <div class="group_table">
      <a-table
        :columns="columns"
        :dataSource="applications"
        :pagination="relatedPagination"
        :rowSelection="relatedRowSelection"
      >
        <template v-slot:logoUrl="application">
          <img :src="application.logoUrl" height="30" />
        </template>
        <template v-slot:action="application">
          <a href="javascript:;" @click="remove([application])" class="remove">移除</a>
        </template>
      </a-table>
    </div>
    <a-modal
      v-model="relateAppVisible"
      title="关联应用"
      :destroyOnClose="true"
      centered
      :getContainer="() => this.$window.document.getElementById('appGroup')"
      width="45vw"
     >
      <template slot="footer">
        <a-button key="submit" @click="batchRelate" type="primary" class="submit_btn">批量关联</a-button>
      </template>
      <a-input-search v-model="searchValue" placeholder="请输入关键字" enterButton @search="onSearch" class="app_search" style="width: 90%;margin: 0 auto;margin-left: 5%;"></a-input-search>
      <a-table
        :columns="columns"
        :dataSource="notRalatedApplications"
        :pagination="notRelatedPagination"
        :rowSelection="unRelatedRowSelection"
        class="app_table"
        style="width: 90%;margin: 0 auto;margin-top: 20px;height:500px;overflow-y:auto;"
      >
        <template v-slot:logoUrl="application">
          <img :src="application.logoUrl" height="30" />
        </template>
        <template v-slot:action="application">
          <a href="javascript:;" @click="relate([application])" class="detail">关联</a>
        </template>
      </a-table>
    </a-modal>
  </div>
</template>
<script>
import api from "@/api";
const columns = [
  {
    title: "序号",
    dataIndex: "index"
  },
  {
    title: "应用名称",
    dataIndex: "name"
  },
  {
    title: "应用图标",
    scopedSlots: { customRender: "logoUrl" }
  },
  {
    title: "操作",
    scopedSlots: { customRender: "action" }
  }
];
export default {
  name: "GroupTable",
  data() {
    return {
      columns,
      unRelatedRowSelection: {
        type: "checkbox",
        selectedRowKeys: [],
        selectedRows: [],
        onChange: function(selectedRowKeys, selectedRows) {
          this.selectedRowKeys = selectedRowKeys;
          this.selectedRows = selectedRows;
        }
      },
      relatedRowSelection: {
        type: "checkbox",
        selectedRowKeys: [],
        selectedRows: [],
        onChange: function(selectedRowKeys, selectedRows) {
          this.selectedRowKeys = selectedRowKeys;
          this.selectedRows = selectedRows;
        }
      },
      relatedPagination: {
        showSizeChanger: true,
        total:0,
        showTotal: (total, range)=>{
          return `共${total}条,当前为第${range[0]}条至第${range[1]}条`
        }
      },
      notRelatedPagination: {
        showSizeChanger: true,
        total:0,
        showTotal: (total, range)=>{
          return `共${total}条,当前为第${range[0]}条至第${range[1]}条`
        }
      },
      relateAppVisible: false,
      allApplications: [],
      initPromise: null,
      notRalatedApplications: [],
      searchValue: "",
      applications: []
    };
  },
  props: {
    relatedApplications: {
      type: Array,
      required: false,
      default: function() {
        return [];
      }
    },
    group: {
      type: Object,
      required: false,
      default: function() {
        return {};
      }
    }
  },
  created() {
    this.computeRalatedApplications();
    this.initPromise = this.$axios.get(api.applications()).then(res => {
      this.allApplications = res.data;
      this.computeNotRalatedApplications();
    });
  },
  watch: {
    relatedApplications: function() {
      this.computeRalatedApplications();
      this.initPromise.then(() => {
        this.computeNotRalatedApplications();
        this.setPaginationTotal()
      });
    }
  },
  methods: {
    goRelateApplications() {
      this.relateAppVisible = true;
      this.searchValue = ''
      this.computeNotRalatedApplications()
      this.setPaginationTotal()
    },
    computeRalatedApplications() {
      this.applications = this.relatedApplications.map((application, index) => {
        return { ...application, key: application.id, index: index + 1 };
      });
    },
    computeNotRalatedApplications() {
      this.notRalatedApplications = this.allApplications
        .filter(
          application =>
            this.relatedApplications.find(
              relatedApplication => relatedApplication.id == application.id
            ) == undefined && application.name.indexOf(this.searchValue) > -1
        )
        .map((application, index) => {
          return { ...application, key: application.id, index: index + 1 };
        });
    },
    onSearch() {
      this.computeNotRalatedApplications();
      this.setPaginationTotal();
    },
    relate(addedApplications) {
      let applicationIds = [...addedApplications, ...this.applications].map(
        application => application.id
      );
      this.$axios.put(api.groupRelateApplications(this.group.id), { applicationIds }).then(() => {
        this.$emit(
          "update:relatedApplications",
          [...this.applications, ...addedApplications].map(application => {
            const origiApplication = (({ id, name, logoUrl, linkUrl }) => ({
              id,
              name,
              logoUrl,
              linkUrl
            }))(application);
            return origiApplication;
          })
        );
      });
    },
    remove(removedApplications) {
      let remainedApplications = this.applications.filter(
        application =>
          removedApplications.find(removeApplication => removeApplication.id == application.id) ==
          undefined
      );
      let applicationIds = remainedApplications.map(application => application.id);
      this.$axios.put(api.groupRelateApplications(this.group.id), { applicationIds }).then(() => {
        this.$emit(
          "update:relatedApplications",
          remainedApplications.map(application => {
            const origiApplication = (({ id, name, logoUrl, linkUrl }) => ({
              id,
              name,
              logoUrl,
              linkUrl
            }))(application);
            return origiApplication;
          })
        );
      });
    },
    batchRelate() {
      if (this.unRelatedRowSelection.selectedRows.length == 0) {
        this.$notification.error({
          message: "错误提示",
          description: "至少勾选一项进行批量关联"
        })
        return
      }
      this.relate(this.unRelatedRowSelection.selectedRows)
    },
    batchRemove() {
      if (this.relatedRowSelection.selectedRows.length == 0) {
        this.$notification.error({
          message: "错误提示",
          description: "至少勾选一项进行批量移除"
        })
        return
      }
      this.remove(this.relatedRowSelection.selectedRows)
    },
    setPaginationTotal(){
      this.notRelatedPagination.total=this.notRalatedApplications.length
      this.relatedPagination.total=this.applications.length
    }
  }
};
</script>
<style scoped lang='less'>
@import "../../assets/style/authority.less";
</style>
