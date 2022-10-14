<template>
  <div id="userTable">
    <div class="table_btns">
      <button class="add_app" @click="goAdd">添加应用</button>
      <a-modal
        v-model="addVisible"
        :title="this.mode=='add'?'添加应用':'修改应用'"
        centered
        :getContainer="() => this.$window.document.getElementById('userTable')"
        width="42.7vw"
      >
        <template slot="footer">
          <a-button key="submit" @click="submit" type="primary" class="submit_btn">提交</a-button>
          <a-button key="back" @click="addVisible=false" class="cancel_btn">取消</a-button>
        </template>
        <a-form-model ref="form" :model="addedApp" :rules="rules" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-form-model-item label="应用名称">
            <a-input v-model="addedApp.name" />
          </a-form-model-item>
          <a-form-model-item label="应用图标">
            <a-upload
              class="exclude-ant-upload-icons"
              accept=".png"
              listType="picture-card"
              :fileList="fileList"
              @change="handleChange"
              :beforeUpload="()=>false"
              :remove="()=>false"
              :preview="()=>false"
            >
              <div>
                <a-icon type="plus" />
                <div class="ant-upload-text">Upload</div>
              </div>
            </a-upload>
          </a-form-model-item>
          <a-form-model-item label="URL">
            <a-input v-model="addedApp.linkUrl" />
          </a-form-model-item>
        </a-form-model>
      </a-modal>
      <button @click="batchDelete" class="del_btn">批量删除</button>
    </div>
    <div class="table_content" style="max-height: 75vh;">
      <a-table :columns="columns" :dataSource="apps" :pagination="pagination" :rowSelection="rowSelection">
        <template v-slot:logoUrl="a">
          <img :src="a|toImgSrc" height="30" />
        </template>
        <template v-slot:enable="app">
            <a-switch :checked="app.enable==1" @change="changeEnable(app)"/>
        </template>
        <template v-slot:action="app">
          <a @click="goEdit(app)" href="javascript:;" :style="{color:app.type==1?'gray':'white'}" class="modify">修改</a>
          <a @click="goDelete(app)" href="javascript:;" :style="{color:app.type==1?'gray':'white'}" class="delete">删除</a>
        </template>
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
    width:"5%"
  },
  {
    title: "应用名称",
    dataIndex: "name",
    ellipsis: true,
    width:"10%"
  },
  {
    title: "应用图标",
    scopedSlots: { customRender: "logoUrl" },
    width:"5%"
  },
  {
    title: "应用编号",
    dataIndex: "code",
    width:"20%"
  },
  {
    title: "应用来源",
    customRender: customRender,
    width:"8%"
  },
  {
    title: "URL",
    dataIndex: "linkUrl",
    ellipsis: true,
    width:"20%"
  },
  {
    title: "是否启用",
    scopedSlots: { customRender: 'enable' },
    width:"8%"
  },
  {
    title: "操作",
    scopedSlots: { customRender: "action" },
    width:"8%"
  }
];
function customRender(app){
  switch (app.type) {
    case 0:
      return "原生"
    case 1:
      return "生成"
    default:
      return "其他"
  }
}
function validImageType(file, errorCallback){
  const valid = file.name.endsWith(".png")
  if(!valid){
    errorCallback()
  }
  return valid

}
const preprocessing = apps => {
  apps.forEach((app, index) => {
    app.key = app.id;
    app.index = index + 1;
  });
};
export default {
  name: "AppTable",
  data() {
    return {
      apps: [],
      columns,
      addVisible: false,
      rowSelection: {
        type: "checkbox",
        selectedRowKeys: [],
        selectedRows: [],
        onChange: function(selectedRowKeys, selectedRows) {
          this.selectedRowKeys = selectedRowKeys;
          this.selectedRows = selectedRows;
        }
      },
      pagination: {
        showSizeChanger: true,
        total:0,
        showTotal: (total, range)=>{
          return `共${total}条,当前为第${range[0]}条至第${range[1]}条`
        }
      },
      previewVisible: false,
      previewImage: "",
      fileList: [],
      addedApp: {
        name: "",
        linkUrl: ""
      },
      mode: "add",
      edittingApp: {},
      rules: {
        name: [
          {
            required: true,
            message: "请输入应用名称",
            trigger: "blur"
          }
        ],
        linkUrl: [
          {
            required: true,
            message: "请输入URL",
            trigger: "blur"
          }
        ]
      }
    };
  },
  filters:{
    toImgSrc(app){
      return api.applicationLogo(app.id)
    }
  },
  created() {
    this.$axios.get(api.applications()).then(res => {
      let apps = res.data
      this.apps = apps
      this.setPaginationTotal()
      preprocessing(this.apps)
    });
  },
  methods: {
    handleChange({ fileList }) {
      this.fileList = [fileList.pop()];
      validImageType(this.fileList[0],()=>{
        this.$notification.error({
          message: "应用图标只能是png格式",
          description: "错误提示"
        })
      })
    },
    goAdd() {
      this.addedApp = {
        name: "",
        linkUrl: ""
      }
      this.mode = "add";
      this.addVisible = true;
      this.fileList = [];
    },
    goEdit(app) {
      if(app.type==1) return
      this.mode = "edit";
      this.addVisible = true;
      this.addedApp = {
        name: app.name,
        linkUrl: app.linkUrl
      };
      this.fileList = [
        {
          uid: "1",
          name: "default.png",
          status: "done",
          response: "200",
          url: api.applicationLogo(app.id)
        }
      ];
      this.edittingApp = app;
    },
    remove() {
      return false;
    },
    submit() {
      const validImage = validImageType(this.fileList[0],()=>{
        this.$notification.error({
          message: "应用图标只能是png格式",
          description: "错误提示"
        })
      })
      if(!validImage){
        return
      }
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.fileList.length == 0) {
            this.$notification.error({
              message: "请选择图标",
              description: "错误提示"
            });
            return;
          }
          if (this.mode == "add") {
            const reader = new FileReader();
            reader.readAsDataURL(this.fileList[0].originFileObj);
            reader.onload = () => {
              this.$axios
                .post(api.applications(), {
                  ...this.addedApp,
                  logoUrl: reader.result
                })
                .then(res => {
                  this.apps.push(res.data);
                  preprocessing(this.apps);
                  this.addVisible = false;
                  this.setPaginationTotal()
                });
            };
          } else {
            let logoDataPromise;
            if (this.fileList[0].originFileObj) {
              const reader = new FileReader();
              reader.readAsDataURL(this.fileList[0].originFileObj);
              logoDataPromise = new Promise(resolve => {
                reader.onload = () => {
                  resolve(reader.result);
                };
              });
            } else {
              logoDataPromise = new Promise(resolve => {
                this.$axios.get(api.applicationLogo(this.edittingApp.id),{responseType:"arraybuffer"}).then(res=>{
                  resolve('data:image/png;base64,' + new Buffer(res.data, 'binary').toString('base64'));
                })
              });
            }
            logoDataPromise.then(logoUrl => {
              this.$axios
                .put(api.applications(this.edittingApp.id), {
                  ...this.addedApp,
                  logoUrl
                })
                .then(() => {
                  this.edittingApp.name = this.addedApp.name;
                  this.edittingApp.linkUrl = this.addedApp.linkUrl;
                  this.edittingApp.logoUrl = logoUrl;
                  this.addVisible = false;
                  this.setPaginationTotal()
                });
            });
          }
        }
      });
    },
    goDelete(app) {
      if(app.type==1) return
      let that = this;
      this.$confirm({
        title: "您确定要删除此应用吗？此操作不可恢复！",
        closable: true,
        content: (
          <div>
            <h2 class="del_info">提示信息</h2>
          </div>
        ),
        getContainer: () => document.getElementById("userTable"),
        class: "delModal",
        centered: true,
        okText: "确认",
        cancelText: "关闭",
        onOk() {
          that.$axios.delete(api.applications(app.id)).then(() => {
            that.$notification.success({
              message: "删除成功",
              description: "操作提示"
            });
            that.apps.splice(app.index - 1, 1);
            preprocessing(that.apps);
            this.setPaginationTotal()
          });
        }
      });
    },
    batchDelete() {
      if (this.rowSelection.selectedRowKeys.length==0) {
        this.$notification.error({
              message: "提示请至少勾选一项进行批量删除",
              description: "操作提示"
            });
        return
      }
      const ids = this.rowSelection.selectedRowKeys.reduce((prev, cur) => `${prev},${cur}`);
      const onOk = () => {
        this.$axios
          .delete(api.applicationsBatch(), {
            params: {
              ids: ids
            }
          })
          .then(() => {
            this.$notification.success({
              message: "删除成功",
              description: "操作提示"
            });
            this.apps = this.apps.filter(app => this.rowSelection.selectedRowKeys.find(id => id == app.id) == undefined);
            this.setPaginationTotal()
          });
      };
      this.$confirm({
        title: "您确定要删除此应用吗？此操作不可恢复！",
        closable: true,
        content: (
          <div>
            <h2 class="del_info">提示信息</h2>
          </div>
        ),
        getContainer: () => document.getElementById("userTable"),
        class: "delModal",
        centered: true,
        okText: "确认",
        cancelText: "关闭",
        onOk
      });
    },
    changeEnable(app) {
      this.$axios.put(`${api.applications(app.id)}/enable?enable=${1-app.enable}`).then(()=>{
        app.enable = 1-app.enable
      })
    },
    setPaginationTotal(){
      this.pagination.total=this.apps.length
    }
  }
};
</script>
<style scoped lang='less'>
@import "../../assets/style/authority.less";
@import "../../assets/style/authority_modal.less";
</style>
<style>
.exclude-ant-upload-icons .ant-upload-list-item-actions{
  display: none;
}
</style>
