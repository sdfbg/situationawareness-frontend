<template>
  <div id="userTable">
    <div class="table_btns">
      <button class="mulit_del" @click="deleteList">批量删除</button>
      <button class="add_btn" @click="addUser"></button>
      <a-modal
        v-model="addVisible"
        title="新增用户"
        :maskClosable="false"
        centered
        :getContainer="() => this.$window.document.getElementById('userTable')"
        width="42.7vw"
      >
        <template slot="footer">
          <a-button key="submit" type="primary" class="submit_btn" @click="handleAddOk">提交</a-button>
          <a-button key="back" class="cancel_btn" @click="handleAddCancel">取消</a-button>
        </template>
        <a-form-model
          :model="form"
          ref="form"
          :rules="rules"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
          class="user_form"
        >
          <a-form-model-item label="用户ID" prop="accountNumber">
            <a-input v-model="form.accountNumber" />
          </a-form-model-item>
          <a-form-model-item label="姓名" prop="realName">
            <a-input v-model="form.realName" />
          </a-form-model-item>
          <a-form-model-item label="昵称" prop="nickName">
            <a-input v-model="form.nickName" />
          </a-form-model-item>
          <a-form-model-item label="密码" prop="password">
            <a-input v-model="form.password" />
          </a-form-model-item>
          <a-form-model-item label="手机号" prop="phoneNumber">
            <a-input v-model="form.phoneNumber" />
          </a-form-model-item>
          <a-form-model-item label="邮箱" prop="email">
            <a-input v-model="form.email" />
          </a-form-model-item>
          <a-form-model-item label="警号" prop="policeId">
            <a-input v-model="form.policeId" />
          </a-form-model-item>
          <a-form-model-item label="职务" prop="duty">
            <a-input v-model="form.duty" />
          </a-form-model-item>
          <a-form-model-item label="所属部门" prop="departmentId">
            <a-select
              v-model="form.departmentId"
              style="width: 100%"
              :options="departments"
              placeholder="请选择部门"

            ></a-select>
          </a-form-model-item>
          <a-form-model-item label="角色" prop="roleId">
            <a-select v-model="form.roleId" placeholder="请选择角色">
              <a-select-option
                v-for="item in roles"
                :key="item.id"
                :value="item.id"
              >{{item.roleName}}</a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="是否管理员">
            <a-switch v-model="form.activateStatus" />
          </a-form-model-item>
        </a-form-model>
      </a-modal>

      <a-upload
        name="file"
        :fileList="fileList"
        :remove="handleRemove"
        :customRequest="handleUpload"
        action="http://localhost:8080/user/filess"
        @click="handleUpload"
        :headers="headers"
        @change="handleChange"
      >
        <!--  :beforeUpload="beforeUpload" -->
        <button class="import_btn"></button>
      </a-upload>
      <button class="export_btn" @click="exportExcel"></button>
    </div>
    <div class="table_content" style="max-height:550px">
      <a-table
        row-key="id"
        :columns="columns"
        :dataSource="data"
        :pagination="pagination"
        :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      >
        <template slot="action" slot-scope="text, record">
          <a href="javascript:;" class="modify" @click="EditOne(record.id)">修改</a>
          <a href="javascript:;" class="delete" @click="deleteOne(record.id)">删除</a>
        </template>
        <template slot="activate" slot-scope="text, record">
          <a-switch
            checked:true
            v-model="record.activateStatus"
            @change="onChanges(record.activateStatus,record.id)"
          />
        </template>
      </a-table>
    </div>
    <a-modal
      v-model="editVisible"
      title="修改用户"
      centered
      :maskClosable="false"
      :getContainer="() => this.$window.document.getElementById('userTable')"
      width="42.7vw"
    >
      <template slot="footer">
        <a-button key="submit" type="primary" class="submit_btn" @click="handleEditOk">提交</a-button>
        <a-button key="back" class="cancel_btn" @click="handleEditCancel">取消</a-button>
      </template>
      <a-form-model
        :model="formInline"
        ref="form"
        :rules="rules"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 12 }"
      >
        <a-form-model-item label="用户ID" prop="accountNumber">
          <a-input v-model="formInline.accountNumber" />
        </a-form-model-item>
        <a-form-model-item label="姓名" prop="realName">
          <a-input v-model="formInline.realName" />
        </a-form-model-item>
        <a-form-model-item label="昵称" prop="nickName">
          <a-input v-model="formInline.nickName" />
        </a-form-model-item>
        <a-form-model-item label="手机号" prop="phoneNumber">
          <a-input v-model="formInline.phoneNumber" />
        </a-form-model-item>
        <a-form-model-item label="邮箱" prop="email">
          <a-input v-model="formInline.email" />
        </a-form-model-item>
        <a-form-model-item label="警号" prop="policeId">
          <a-input v-model="formInline.policeId" />
        </a-form-model-item>
        <a-form-model-item label="职务" prop="duty">
          <a-input v-model="formInline.duty" />
        </a-form-model-item>
        <a-form-model-item label="所属部门" prop="departmentId">
            <a-select
              v-model="formInline.departmentId"
               style="width: 100%"
              :options="departments"
              placeholder="请选择部门"

            ></a-select>
        </a-form-model-item>
        <a-form-model-item label="角色" prop="roleId">
          <a-select v-model="formInline.roleId" placeholder="请选择角色">
            <a-select-option v-for="item in roles" :key="item.id" :value="item.id">{{item.roleName}}</a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="是否管理员">
          <a-switch v-model="formInline.activateStatus" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
    <!--   checked:true -->
  </div>
</template>
<script>
const columns = [
  {
    title: "序号",
    dataIndex: "index",
    key: "index",
    width: 80
  },
  {
    title: "用户ID",
    dataIndex: "accountNumber",
    key: "accountNumber",
    width: 180
  },
  {
    title: "姓名",
    dataIndex: "realName",
    key: "realName",
    width: 180
  },
  {
    title: "邮箱",
    key: "email",
    dataIndex: "email",
    width: 190
    // scopedSlots: { customRender: 'tags' }
  },
  {
    title: "所属部门",
    key: "orgName",
    dataIndex: "orgName",
    width: 180
  },
  {
    title: "添加时间",
    key: "addTime",
    dataIndex: "addTime",
    width: 180
  },
  {
    title: "最后登录",
    key: "loginTime",
    dataIndex: "loginTime",
    width: 180
  },
  {
    title: "操作",
    key: "action",
    scopedSlots: { customRender: "action" },
    width: 150
  }
];

import api from "@/api";
import {
  validatePhoneTwo,
  validateEMail,
  validatePsdReg,
  validateCode,
  validatePolceCode
} from "@/utils/validator";
export default {
  name: "UserTable",
  data() {
    return {
      fileList: [],
      data: [],
      columns,
      rowSelection: {
        type: "checkbox"
      },
      addVisible: false,
      editVisible: false,
      // form: this.$form.createForm(this, { name: "coordinated" }),
      form: {
        activateStatus: true
      },
      formInline: {},
      departments: [],
      roles: [],
      checkeds: "",
      selectedRowKeys: [],
      selectedRows: [],
      headers: {
        authorization: "authorization-text"
      },
      file: "",
      rules: {
        accountNumber: [
          { required: true, validator: validateCode, trigger: "blur" }
        ],
        realName: [{ required: true, message: "请输入姓名" }],
        nickName: [{ required: true, message: "请输入昵称" }],
        password: [
          { required: true, message: "请输入密码" },
          { validator: validatePsdReg, trigger: "blur" }
        ],
        phoneNumber: [
          { required: true, message: "请输入手机号" },
          { validator: validatePhoneTwo, trigger: "blur" }
        ],
        email: [
          { message: "请输入邮箱" },
          { validator: validateEMail, trigger: "blur" }
        ],
        policeId: [
          { required: true, validator: validatePolceCode, trigger: "blur" }
        ],
        duty: [{ required: true, message: "请输入职务" }],
        departmentId: [{ required: true, message: "请选择部门" }],
        roleId: [{ required: true, message: "请选择角色" }]
      },
      user: {},
      pagination: {
        showSizeChanger: true,
        total: 0,
        showTotal: (total, range) => {
          return `共${total}条,当前为第${range[0]}条至第${range[1]}条`;
        }
      },
      orgDatas: [],
      orgData: {
        value: "",
        label: "",
        children: []
      }
    };
  },

  created() {
    this.getUserPage();
    this.getDepartment();
    this.getRole();
  },
  props: {
    message: {},
    status: Boolean
  },
  watch: {
    status: function() {
      this.getUserPage();
    }
  },
  methods: {
    // 修改激活状态
    onChanges(checked, id) {
      var formData = {
        id: "",
        activateStatus: ""
      };
      if (checked) {
        formData.activateStatus = "1";
      } else {
        formData.activateStatus = "0";
      }
      formData.id = id;
      this.$axios.put(api.userStatus(), formData).then(() => {
      });
    },
    handleUpload(file) {
      const formData = new FormData();
      formData.append("file", file.file);
      this.$axios.post(api.importExcel(), formData).then(res => {
        if (res.data == "ok") {
          this.$message.success("导入成功");
          this.getUserPage();
          this.setPaginationTotal();
        }
      });
    },
    // 删除文件
    handleRemove(file) {
      const index = this.fileList.indexOf(file);
      const newFileList = this.fileList.slice();
      newFileList.splice(index, 1);
      this.fileList = newFileList;
    },
    // 删除
    deleteOne(id) {
      let that = this;
      this.$confirm({
        title: "您确定要删除此记录吗？此操作不可恢复！",
        closable: true,
        content: (
          <div>
            <h2 class="del_info">提示信息</h2>
          </div>
        ),
        getContainer: () => document.getElementById("userTable"),
        class: "delModal",
        centered: true,
        cancelText: "关闭",
        okText: "确认",
        onOk() {
          that.$axios
            .delete(api.user(id))
            .then(res => {
              if (res.data == "success") {
                that.$message.success("删除成功");
                that.getUserPage();
                that.setPaginationTotal();
              } else {
                that.$message.error("删除失败");
              }
            });
        }
      });
    },
    EditOne(id) {
      this.$axios.get(api.user(id)).then(res => {
        this.formInline = res.data;
        if (this.formInline.activateStatus == "1") {
          this.formInline.activateStatus = true;
        }
        if (this.formInline.activateStatus == "0") {
          this.formInline.activateStatus = false;
        }
        this.formInline.id = id;
        this.editVisible = true;
      });
    },

    // 文件导出
    exportExcel() {
      // const querystring = require("querystring");
      const that = this;
      this.$axios
        .post(api.exportExcel(), this.message, {
          responseType: "blob"
        })
        .then(response => {
          that.downloadFile(response.data);
        });
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
      link.setAttribute("download", "用户信息表.xls");
      document.body.appendChild(link);
      link.click();
    },
    handleChange() {
    },
    // 批量删除
    deleteList() {
      let that = this;
      var ids = [];
      this.selectedRows.forEach(element => {
        ids.push(element.id);
      });
      if (ids.length == 0) {
        this.$message.warning("请勾选删除项");
      } else {
        this.$confirm({
          title: "您确定要批量删除记录吗？此操作不可恢复！",
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
            that.$axios.post(api.batchDelete(), ids).then(response => {
              if (response.data == "success") {
                that.getUserPage();
                that.setPaginationTotal();
                that.$message.success("删除成功");
              } else {
                that.$message.error("删除失败");
              }
            });
          }
        });
      }
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys;
      this.selectedRows = selectedRows;
    },
    // 获取部门
    getDepartment() {
      this.$axios.get(api.organizations()).then(response => {
        this.departments = response.data.filter(g=>g.groupNum!=3).map(d=>({key:d.id,value:d.id,label:d.orgName}));
      });
    },
    // 获取角色
    getRole() {
      this.$axios.get(api.roless()).then(response => {
        this.roles = response.data;
      });
    },

    onChange(checked) {
      //  if(!checked){

      this.form.activateStatus = checked;
    },

    getUserPage() {
      var orgid;
      var roleid;
      var message;
      if (
        this.message.roleId == undefined &&
        this.message.orgId == undefined &&
        this.message.message == undefined
      ) {
        orgid = "";
        roleid = "";
        message = "";
      } else {
        orgid = this.message.orgId;
        roleid = this.message.roleId;
        message = this.message.message;

        if (orgid == undefined || orgid == "alldepartments") {
          orgid = "";
        }
        if (roleid == undefined || roleid == "allroles") {
          roleid = "";
        }
        if (message == undefined) {
          message = "";
        }
      }
      this.$axios
        .get(api.users(), { params: { orgid, roleid, message } })
        .then(response => {
          this.data = response.data;

          this.data.forEach((element, index) => {
            if (element.activateStatus == "1") {
              element.activateStatus = Boolean(true);
            }
            if (element.activateStatus == "0") {
              element.activateStatus = Boolean(false);
            }
            element.index = index + 1;
          });
        });
    },
    addUser() {
      this.addVisible = true;
      this.form.activateStatus = false;
    },
    handleAddOk() {
      this.$refs.form.validate(valid => {
        if (valid) {
          var form = {};
          form = this.form;
          if (this.form.activateStatus) {
            form.activateStatus = "1";
          } else {
            form.activateStatus = "0";
          }
          this.$axios.post(api.user(), form).then(res => {
            if (res.data == "ok") {
              this.$message.success("添加成功");
              this.getUserPage();
              this.setPaginationTotal();
              this.$refs.form.resetFields();
              this.form.activateStatus == true;
              this.addVisible = false;
            }
          });
        }
      });
    },
    handleEditOk() {
      //  var that=this;
      this.$refs.form.validate(valid => {
        if (valid) {
          var form = {};
          form = this.formInline;
          if (this.formInline.activateStatus) {
            form.activateStatus = "1";
          } else {
            form.activateStatus = "0";
          }
          this.$axios.put(api.user(form.id), form).then(res => {
            if (res.data == "ok") {
              this.$message.success("修改成功");
              this.getUserPage();
              this.editVisible = false;
            }
          });
        }
      });
    },
    handleAddCancel() {
      this.$refs.form.resetFields();
      this.addVisible = false;
    },
    handleEditCancel() {
      this.editVisible = false;
    },
    setPaginationTotal() {
      this.pagination.total = this.data.length;
    }
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
