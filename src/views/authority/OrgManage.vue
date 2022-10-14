<template>
  <div class="portal_wrap">
    <Header></Header>
    <div class="portal_content" id="portal">
      <div class="user_manage">
        <a-row style="background: rgba(0, 0, 0, 0.2)">
          <a-col :span="3" class="left_content">
            <left-nav></left-nav>
          </a-col>
          <a-col :span="20" class="right_content" style="margin-left: 20ox">
            <a-row>
              <a-col :span="6" class="org_list">
                <h2>组织列表</h2>
                <a-input-search
                  placeholder="请输入关键字"
                  class="org_search"
                  @search="onSearch"
                />
                <div class="org_tree">
                  <a-tree
                    :checkStrictly="true"
                    v-model="checkedKeys"
                    selectable
                    @select="onSelect"
                    :treeData="orgslist"
                  >
                    <template slot="orgNode" slot-scope="org">
                      <span
                        class="tree_text"
                        :title="org.orgName"
                        v-if="
                          searchValue != '' &&
                          org.orgName.indexOf(searchValue) > -1
                        "
                        style="color: red"
                        >{{ org.orgName }}</span
                      >
                      <span class="tree_text" :title="org.orgName" v-else>{{
                        org.orgName
                      }}</span>
                    </template>
                  </a-tree>
                </div>
              </a-col>
              <a-col :span="16" :offset="1" class="org_detail">
                <div v-if="flag">
                  <h2 :title="orgname">
                    {{
                      orgname.length > 40
                        ? orgname.substring(1, 40) + "..."
                        : orgname
                    }}
                  </h2>
                  <div v-if="visis" class="org_item">
                    <label>组织人数：</label>
                    <span :title="orgcount">{{ orgcount }}</span>
                  </div>
                  <div class="org_item">
                    <label>组织地址：</label>
                    <span :title="orgaddress">{{
                      orgaddress.length > 40
                        ? orgaddress.substring(1, 40) + "..."
                        : orgaddress
                    }}</span>
                  </div>
                  <div class="org_item">
                    <label>组织负责人：</label>
                    <span :title="orgduty">{{
                      orgduty.length > 40
                        ? orgduty.substring(1, 40) + "..."
                        : orgduty
                    }}</span>
                  </div>
                  <button class="add_btn" @click="addPolice"></button>
                  <a-upload
                    name="file"
                    :fileList="fileList"
                    :remove="handleRemove"
                    :customRequest="handleUpload"
                    :action="actions"
                    @click="handleUpload"
                    :headers="headers"
                    :showUploadList="false"
                    @change="handleChange"
                  >
                    <!-- <button class="import_btn"></button> -->
                  </a-upload>
                  <!-- <button v-if="visis" class="export_btn" @click="exportExcel"></button> -->
                  <div v-if="visis" class="org_search" style="margin-top: 5px">
                    <label>姓名：</label>
                    <a-input v-model="cname" class="cname" />
                    <label style="margin-left: 20px">警号：</label>
                    <a-input v-model="cnumber" class="cname" />
                    <button @click="getPolice" type="button" class="sea_btn">
                      <a-icon type="search" />
                    </button>
                  </div>
                  <div v-if="visis" class="table_content">
                    <a-table
                      :columns="columns"
                      :dataSource="polices"
                      :pagination="pagination"
                    >
                      <template v-slot:action="police">
                        <a
                          href="javascript:;"
                          class="detail"
                          @click="goDetail(police)"
                          >查看</a
                        >
                        <a
                          href="javascript:;"
                          class="modify"
                          @click="goEdit(police)"
                          >修改</a
                        >
                        <a
                          href="javascript:;"
                          class="delete"
                          @click="goDelete(police)"
                          >删除</a
                        >
                      </template>
                      <template slot="activate">
                        <a-switch defaultChecked />
                      </template>
                    </a-table>
                  </div>
                  <a-modal
                    v-model="islook"
                    title="查看警力资源"
                    centered
                    :getContainer="
                      () => this.$window.document.getElementById('portal')
                    "
                    width="42.7vw"
                  >
                    <template slot="footer">
                      <br /><br />
                      <div>
                        <a-button
                          key="back"
                          class="cancel_btn"
                          @click="handleLookReset"
                          >关闭</a-button
                        >
                      </div>
                    </template>
                    <a-form
                      :label-col="{ span: 5 }"
                      :wrapper-col="{ span: 12 }"
                    >
                      <a-form-item label="姓名">
                        <a-input v-model="addname" disabled :title="addname" />
                      </a-form-item>
                      <a-form-item label="警号">
                        <a-input
                          v-model="addnumber"
                          disabled
                          :title="addnumber"
                        />
                      </a-form-item>
                      <a-form-item label="性别">
                        <a-select
                          v-model="addsex"
                          disabled
                          placeholder="请选择性别"
                        >
                          <a-select-option value="1"> 男 </a-select-option>
                          <a-select-option value="2"> 女 </a-select-option>
                        </a-select>
                      </a-form-item>
                      <a-form-item label="职务">
                        <a-input v-model="addduty" disabled :title="addduty" />
                      </a-form-item>
                      <a-form-item label="电话">
                        <a-input v-model="addtel" disabled :title="addtel" />
                      </a-form-item>
                      <a-form-item label="备注">
                        <a-input
                          v-model="addremark"
                          disabled
                          :title="addremark"
                        />
                      </a-form-item>
                    </a-form>
                  </a-modal>
                  <a-modal
                    v-model="isadd"
                    title="新增警力资源"
                    centered
                    :getContainer="
                      () => this.$window.document.getElementById('portal')
                    "
                    width="42.7vw"
                  >
                    <template slot="footer">
                      <br /><br />
                      <div>
                        <a-button
                          key="submit"
                          type="primary"
                          class="submit_btn"
                          id="addsubmits"
                          @click="handleAddOk"
                        >
                          提交
                        </a-button>
                        <a-button
                          key="back"
                          class="cancel_btn"
                          @click="handleAddReset"
                          >关闭</a-button
                        >
                      </div>
                    </template>
                    <a-form
                      :label-col="{ span: 5 }"
                      :wrapper-col="{ span: 12 }"
                    >
                      <a-form-item label="姓名">
                        <span class="rule_icon1">*</span>
                        <a-input v-model="addname" :title="addname" />
                      </a-form-item>
                      <a-form-item label="警号">
                        <span class="rule_icon1">*</span>
                        <a-input v-model="addnumber" :title="addnumber" />
                      </a-form-item>
                      <a-form-item label="性别">
                        <a-select v-model="addsex" placeholder="请选择性别">
                          <a-select-option value="1"> 男 </a-select-option>
                          <a-select-option value="2"> 女 </a-select-option>
                        </a-select>
                      </a-form-item>
                      <a-form-item label="职务">
                        <a-input v-model="addduty" :title="addduty" />
                      </a-form-item>
                      <a-form-item label="电话">
                        <a-input v-model="addtel" :title="addtel" />
                      </a-form-item>
                      <a-form-item label="备注">
                        <a-input v-model="addremark" :title="addremark" />
                      </a-form-item>
                    </a-form>
                  </a-modal>
                  <a-modal
                    v-model="isupdate"
                    title="编辑警力资源"
                    centered
                    :getContainer="
                      () => this.$window.document.getElementById('portal')
                    "
                    width="42.7vw"
                  >
                    <template slot="footer">
                      <br /><br />
                      <div>
                        <a-button
                          key="submit"
                          type="primary"
                          class="submit_btn"
                          id="updatesubmits"
                          @click="handleUpdateOk"
                        >
                          提交
                        </a-button>
                        <a-button
                          key="back"
                          class="cancel_btn"
                          @click="handleUpdateReset"
                          >关闭</a-button
                        >
                      </div>
                    </template>
                    <a-form
                      :label-col="{ span: 5 }"
                      :wrapper-col="{ span: 12 }"
                    >
                      <a-form-item label="姓名">
                        <span class="rule_icon1">*</span>
                        <a-input v-model="addname" :title="addname" />
                      </a-form-item>
                      <a-form-item label="警号">
                        <span class="rule_icon1">*</span>
                        <a-input v-model="addnumber" :title="addnumber" />
                      </a-form-item>
                      <a-form-item label="性别">
                        <a-select v-model="addsex" placeholder="请选择性别">
                          <a-select-option value="1"> 男 </a-select-option>
                          <a-select-option value="2"> 女 </a-select-option>
                        </a-select>
                      </a-form-item>
                      <a-form-item label="职务">
                        <a-input v-model="addduty" :title="addduty" />
                      </a-form-item>
                      <a-form-item label="电话">
                        <a-input v-model="addtel" :title="addtel" />
                      </a-form-item>
                      <a-form-item label="备注">
                        <a-input v-model="addremark" :title="addremark" />
                      </a-form-item>
                    </a-form>
                  </a-modal>
                </div>
              </a-col>
            </a-row>
          </a-col>
        </a-row>
        <Footer></Footer>
      </div>
    </div>
  </div>
</template>
<script>
import api from "@/api";
import Header from "../common/Header.vue";
import LeftNav from "./LeftNav.vue";
import Footer from "../common/Footer.vue";
const columns = [
  {
    title: "姓名",
    dataIndex: "name",
  },
  {
    title: "警号",
    dataIndex: "number",
  },
  {
    title: "职务",
    dataIndex: "duty",
  },
  {
    title: "电话",
    key: "tel",
    dataIndex: "tel",
  },
  {
    title: "操作",
    key: "action",
    scopedSlots: { customRender: "action" },
  },
];
export default {
  name: "OrgManage",
  data() {
    return {
      fileList: [],
      headers: {
        authorization: "authorization-text",
      },
      actions: "http://localhost:8081/admin/polices/file/",
      polices: [],
      police: {},
      columns,
      pagination: {
        showSizeChanger: true,
      },
      addVisible: false,
      expandedKeys: [],
      checkedKeys: [],
      selectedKeys: [],
      orgslist: [],
      form: this.$form.createForm(this, { name: "coordinated" }),
      orgName: "",
      orgPerson: "",
      orgAdd: "",
      remark: "",
      updateVisible: false,
      orgNameu: "",
      orgPersonu: "",
      admin: 0,
      orgAddu: "",
      remarku: "",
      superOrg: "",
      orgname: "",
      orgaddress: "",
      orgduty: "",
      flag: false,
      idu: "",
      searchValue: "",
      isSearching: false,
      addname: "",
      addnumber: "",
      addsex: "",
      addduty: "",
      addtel: "",
      orgId: "",
      addremark: "",
      islook: false,
      isadd: false,
      isupdate: false,
      visis: false,
      type: "0",
      cname: "",
      orgcount: 0,
      handleRemove: null,
      cnumber: "",
      selects: [],
      oldselects: [],
    };
  },
  components: {
    Header,
    LeftNav,
    Footer,
  },
  created() {
    this.init();
  },
  watch: {
    checkedKeys(val) {
      if (this.oldselects.length == 0) {
        for (let i = 0; i < val.checked.length; i++) {
          let orgId = val.checked[i];
          this.$axios.get(api.organizations(orgId)).then((res) => {
            let org = res.data;
            this.orgSelectNode(org);
          });
        }
        this.checkedKeys.checked = this.selects;
        this.oldselects = this.selects;
      } else {
        let aa = this.getArrDifference(this.oldselects, val.checked);
        if (this.oldselects.length > val.checked.length) {
          for (let i = 0; i < aa.length; i++) {
            let orgId = aa[i];
            this.$axios.get(api.organizations(orgId)).then((res) => {
              let org = res.data;
              this.orgNoSelectNode(org);
            });
          }
          this.checkedKeys.checked = this.selects;
          this.oldselects = this.selects;
        } else {
          for (let i = 0; i < aa.length; i++) {
            let orgId = aa[i];
            this.$axios.get(api.organizations(orgId)).then((res) => {
              let org = res.data;
              this.orgSelectNode(org);
            });
          }
          this.checkedKeys.checked = this.selects;
          this.oldselects = this.selects;
        }
      }
    },
  },
  methods: {
    init() {
      this.isSearching = true;
      this.$axios.get(api.departments()).then((res) => {
        this.orgslist = res.data;
        // this.orgslist.forEach((org) => {
        //   this.orgToTreeNode(org);
        // });
        this.isSearching = false;
      });
    },
    getArrDifference(arr1, arr2) {
      return arr1.concat(arr2).filter(function (v, i, arr) {
        return arr.indexOf(v) === arr.lastIndexOf(v);
      });
    },
    orgToTreeNode(org) {
      org.key = org.id;
      org.scopedSlots = { title: "orgNode" };
      if (
        this.searchValue.trim() != "" &&
        org.orgName.indexOf(this.searchValue) > -1
      ) {
        this.expandedKeys.push(org.key);
      }
      if (org.organizations == null) {
        return;
      } else {
        org.children = org.organizations;
        org.children.forEach((org) => {
          this.orgToTreeNode(org);
        });
      }
    },
    orgSelectNode(org) {
      this.selects.push(org.id);
      if (org.organizations == null) {
        return;
      } else {
        org.children = org.organizations;
        for (let i = 0; i < org.children.length; i++) {
          let org1 = org.children[i];
          this.orgSelectNode(org1);
        }
      }
    },
    orgNoSelectNode(org) {
      let i = 0;
      for (i = 0; i < this.selects.length; i++) {
        let exp = this.selects[i];
        if (exp == org.id) {
          break;
        }
      }
      this.selects.splice(i, 1);
      if (org.organizations == null) {
        return;
      } else {
        org.children = org.organizations;
        org.children.forEach((org) => {
          this.orgNoSelectNode(org);
        });
      }
    },
    addPolice() {
      this.isadd = true;
    },
    handleUpdateOk() {
      if (this.addname == "") {
        this.$notification.error({
          message: "警员姓名不能为空",
        });
        return;
      }
      if (this.addnumber == "") {
        this.$notification.error({
          message: "警员警号不能为空",
        });
        return;
      }
      if (this.addduty == "") {
        this.$notification.error({
          message: "警员职务不能为空",
        });
        return;
      }

      if (this.addname.length > 100) {
        this.$notification.error({
          message: "警员姓名长度不能大于100",
        });
        return;
      }
      if (this.addnumber.length > 30) {
        this.$notification.error({
          message: "警员警号长度不能大于30",
        });
        return;
      }
      if (this.addduty.length > 30) {
        this.$notification.error({
          message: "警员职务长度不能大于30",
        });
        return;
      }
      if (this.addtel.length > 30) {
        this.$notification.error({
          message: "警员电话长度不能大于30",
        });
        return;
      }
      if (this.addremark.length > 20) {
        this.$notification.error({
          message: "备注长度不能大于20",
        });
        return;
      }

      let updatesubmits = document.getElementById("updatesubmits");
      updatesubmits.setAttribute("disabled", "disabled");

      var id = this.idu;
      this.$axios
        .put(api.police(id), {
          name: this.addname,
          number: this.addnumber,
          sex: this.addsex,
          duty: this.addduty,
          tel: this.addtel,
          remark: this.addremark,
        })
        .then(() => {
          this.addname = "";
          this.addnumber = "";
          this.addsex = "";
          this.addduty = "";
          this.addtel = "";
          this.addremark = "";
          this.isupdate = false;
          this.$notification.success({
            message: "修改警员信息成功！",
          });
          this.getPoliceAll();
        });
    },
    handleAddOk() {
      if (this.addname == "") {
        this.$notification.error({
          message: "警员姓名不能为空",
        });
        return;
      }
      if (this.addnumber == "") {
        this.$notification.error({
          message: "警员警号不能为空",
        });
        return;
      }
      if (this.addduty == "") {
        this.$notification.error({
          message: "警员职务不能为空",
        });
        return;
      }

      if (this.addname.length > 100) {
        this.$notification.error({
          message: "警员姓名长度不能大于100",
        });
        return;
      }
      if (this.addnumber.length > 30) {
        this.$notification.error({
          message: "警员警号长度不能大于30",
        });
        return;
      }
      if (this.addduty.length > 30) {
        this.$notification.error({
          message: "警员职务长度不能大于30",
        });
        return;
      }
      if (this.addtel.length > 30) {
        this.$notification.error({
          message: "警员电话长度不能大于30",
        });
        return;
      }
      if (this.addremark.length > 20) {
        this.$notification.error({
          message: "备注长度不能大于20",
        });
        return;
      }
      let addsubmits = document.getElementById("addsubmits");
      addsubmits.setAttribute("disabled", "disabled");
      this.$axios
        .post(api.police(this.orgId), {
          name: this.addname,
          number: this.addnumber,
          sex: this.addsex,
          duty: this.addduty,
          tel: this.addtel,
          remark: this.addremark,
        })
        .then((res) => {
          this.addname = "";
          this.addnumber = "";
          this.addsex = "";
          this.addduty = "";
          this.addtel = "";
          this.addremark = "";
          this.isadd = false;
          this.$notification.success({
            message: "警员信息添加成功！",
          });
          this.orgId = res.data.orgId;
          this.getPoliceAll();
        });
    },
    handleLookReset() {
      this.addname = "";
      this.addnumber = "";
      this.addsex = "";
      this.addduty = "";
      this.addtel = "";
      this.addremark = "";
      this.islook = false;
    },
    handleAddReset() {
      this.addname = "";
      this.addnumber = "";
      this.addsex = "";
      this.addduty = "";
      this.addtel = "";
      this.addremark = "";
      this.isadd = false;
    },
    handleUpdateReset() {
      this.addname = "";
      this.addnumber = "";
      this.addsex = "";
      this.addduty = "";
      this.addtel = "";
      this.addremark = "";
      this.isupdate = false;
    },
    onCheck(checkedKeys) {
      this.checkedKeys = checkedKeys;
    },
    onSelect(selectedKeys) {
      this.flag = true;
      this.$axios.get(api.organizations()).then((res) => {
        let org = res.data.find(d => d.id == selectedKeys[0]);
        this.orgname = org.orgName;
        this.orgaddress = org.orgAddress;
        this.orgduty = org.orgDuty;
        this.orgcount = org.organizationCount;
        //警力列表
        this.orgId = org.id;
        this.actions = this.actions + "" + this.orgId;
        this.getPoliceAll();
      });
    },
    getPoliceAll() {
      this.cname = "";
      this.cnumber = "";
      this.$axios.get(api.polices(this.orgId, null, null)).then((res) => {
        this.polices = res.data;
        if (this.polices.length == 0) {
          this.visis = false;
        } else {
          this.visis = true;
        }
        for (var i = 0; i < this.polices.length; i++) {
          this.polices[i].key = this.polices[i].id;
          this.polices[i].key = this.polices[i].id;
        }
      });
    },
    getPolice() {
      var name = this.cname;
      var number = this.cnumber;
      if (this.cname.indexOf("&") > -1) {
        this.$notification.error({
          message: "查询框不能含有非法字符&",
        });
        return;
      }

      if (this.cnumber.indexOf("&") > -1) {
        this.$notification.error({
          message: "查询框不能含有非法字符&",
        });
        return;
      }

      this.$axios.get(api.polices(this.orgId, name, number)).then((res) => {
        this.polices = res.data;
        for (var i = 0; i < this.polices.length; i++) {
          this.polices[i].key = this.polices[i].id;
          this.polices[i].key = this.polices[i].id;
        }
      });
    },
    onSearch(value) {
      if (this.isSearching) {
        this.$notification.info({
          message: "系统忙，请稍后再试",
        });
        return;
      }
      this.searchValue = value.trim();
      this.init();
    },
    onTreeChange() {},
    deleteOrg(org) {
      this.$confirm({
        title: "您确定要删除此组织吗？此操作不可恢复！",
        closable: true,
        content: (
          <div>
            <h2 class="del_info">提示信息</h2>
          </div>
        ),
        getContainer: () => document.getElementById("portal"),
        class: "delModal",
        centered: true,
        cancelText: "取消",
        okText: "确认",
        onOk: () => {
          this.$axios.delete(api.organizations(org.id)).then(() => {
            this.deleteorglist(this.orgslist, org);
            this.flag = false;
            this.$notification["success"]({ message: "删除组织成功" });
          });
        },
      });
    },
    deleteorglist(orgslist, org) {
      for (var i = 0; i < orgslist.length; i++) {
        var org1 = orgslist[i];
        if (org1.id == org.id) {
          orgslist.splice(i, 1);
        } else {
          if (org1.organizations != null) {
            this.deleteorglist(org1.organizations, org);
          }
        }
      }
    },
    //新增组织
    addOrgs() {
      this.addVisible = true;
      this.admin = 0;
    },
    //新增组织弹窗 确定
    handleOk() {
      if (this.orgName == "") {
        this.$notification.error({
          message: "组织名称不能为空",
        });
        return;
      }
      if (this.orgAdd == "") {
        this.$notification.error({
          message: "组织地址不能为空",
        });
        return;
      }
      /*
      if(this.orgPerson == ""){
        this.$notification.error({
          message: "组织负责人不能为空"
        });
        return;
      }
      if(this.remark == ""){
        this.$notification.error({
          message: "备注不能为空"
        });
        return;
      }*/
      if (this.orgName.length > 100) {
        this.$notification.error({
          message: "组织名称长度不能大于100",
        });
        return;
      }
      if (this.orgAdd.length > 200) {
        this.$notification.error({
          message: "组织地址长度不能大于200",
        });
        return;
      }
      if (this.orgPerson.length > 100) {
        this.$notification.error({
          message: "组织负责人长度不能大于100",
        });
        return;
      }
      if (this.remark.length > 200) {
        this.$notification.error({
          message: "备注长度不能大于200",
        });
        return;
      }

      var orgsubmit = document.getElementById("orgsubmit");
      orgsubmit.setAttribute("disabled", "disabled");

      this.$axios
        .post(api.organizations(), {
          orgName: this.orgName,
          orgAddress: this.orgAdd,
          orgDuty: this.orgPerson,
          superOrg: this.superOrg,
          remark: this.remark,
          admin: this.admin,
        })
        .then((res) => {
          var org = res.data;
          org.key = org.id;
          org.scopedSlots = { title: "orgNode" };
          this.addorglist(this.orgslist, org);
          this.orgName = "";
          this.orgAdd = "";
          this.orgPerson = "";
          this.remark = "";
          this.admin = 0;
        });
      this.addVisible = false;
    },
    addorglist(orgslist, org) {
      if (org.grade == "1") {
        orgslist.push(org);
        org.children = org.organizations;
      } else {
        for (var i = 0; i < orgslist.length; i++) {
          var org1 = orgslist[i];
          if (org1.id == org.superOrg) {
            if (org1.organizations == null) {
              org1.organizations = [];
              org1.organizations.push(org);
            } else {
              org1.organizations.push(org);
            }
            org1.children = org1.organizations;
            break;
          } else {
            if (org1.organizations == null) {
              continue;
            } else {
              this.addorglist(org1.organizations, org);
            }
          }
        }
      }
    },
    //新增组织弹窗 关闭
    handleCancel() {
      this.orgName = "";
      this.orgAdd = "";
      this.orgPerson = "";
      this.remark = "";
      this.addVisible = false;
    },
    addDownOrgs(org) {
      this.superOrg = org.id;
      this.addVisible = true;
    },
    updateOrg(org) {
      this.$axios.get(api.organizations(org.id)).then((res) => {
        var org = res.data;
        this.idu = org.id;
        this.orgNameu = org.orgName;
        this.orgAddu = org.orgAddress;
        this.orgPersonu = org.orgDuty;
        this.remarku = org.remark;
        this.admin = org.admin;
        this.updateVisible = true;
      });
    },
    updateHandle() {
      if (this.orgNameu == "") {
        this.$notification.error({
          message: "组织名称不能为空",
        });
        return;
      }
      if (this.orgAddu == "") {
        this.$notification.error({
          message: "组织地址不能为空",
        });
        return;
      }
      /*
      if(this.orgPerson == ""){
        this.$notification.error({
          message: "组织负责人不能为空"
        });
        return;
      }
      if(this.remark == ""){
        this.$notification.error({
          message: "备注不能为空"
        });
        return;
      }*/
      if (this.orgNameu.length > 100) {
        this.$notification.error({
          message: "组织名称长度不能大于100",
        });
        return;
      }
      if (this.orgAddu.length > 200) {
        this.$notification.error({
          message: "组织地址长度不能大于200",
        });
        return;
      }
      if (this.orgPersonu.length > 100) {
        this.$notification.error({
          message: "组织负责人长度不能大于100",
        });
        return;
      }
      if (this.remarku.length > 200) {
        this.$notification.error({
          message: "备注长度不能大于200",
        });
        return;
      }
      let updatesubmit = document.getElementById("updatesubmit");
      updatesubmit.setAttribute("disabled", "disabled");
      var id = this.idu;
      this.$axios
        .put(api.organizations(id), {
          orgName: this.orgNameu,
          orgAddress: this.orgAddu,
          orgDuty: this.orgPersonu,
          remark: this.remarku,
          admin: this.admin,
        })
        .then(() => {
          var org = {};
          org.id = this.idu;
          org.orgName = this.orgNameu;
          this.updateorglist(this.orgslist, org);
          this.updateVisible = false;
        });
    },
    updateorglist(orgslist, org) {
      for (var i = 0; i < orgslist.length; i++) {
        var org1 = orgslist[i];
        if (org1.id == org.id) {
          org1.orgName = org.orgName;
          break;
        } else {
          if (org1.organizations == null) {
            continue;
          } else {
            this.updateorglist(org1.organizations, org);
          }
        }
      }
    },
    updateCancel() {
      this.updateVisible = false;
    },
    batchDeleteOrgs() {
      if (this.checkedKeys.length == 0) {
        this.$notification["error"]({ message: "请先选中在批量删除" });
        return;
      }
      this.$confirm({
        title: "您确定要批量删除吗？此操作不可恢复！",
        closable: true,
        content: (
          <div>
            <h2 class="del_info">提示信息</h2>
          </div>
        ),
        getContainer: () => document.getElementById("portal"),
        class: "delModal",
        centered: true,
        cancelText: "取消",
        okText: "确认",
        onOk: () => {
          for (var i = 0; i < this.checkedKeys.checked.length; i++) {
            var id = this.checkedKeys.checked[i];
            this.$axios.delete(api.organizations(id)).then(() => {
              this.flag = false;
            });
          }
          for (var j = 0; j < this.checkedKeys.checked.length; j++) {
            var ids = this.checkedKeys.checked[j];
            var org = {};
            org.id = ids;
            let k = 0;
            for (k = 0; k < this.oldselects.length; k++) {
              let exp = this.oldselects[k];
              if (exp == org.id) {
                break;
              }
            }
            this.oldselects.splice(k, 1);
            this.deleteorglist(this.orgslist, org);
          }
          this.$notification["success"]({ message: "删除组织成功" });
        },
      });
    },
    goDetail(police) {
      this.$axios.get(api.police(police.id)).then((res) => {
        var police = res.data;
        this.addname = police.name;
        this.addnumber = police.number;
        this.addsex = police.sex;
        this.addduty = police.duty;
        this.addtel = police.tel;
        this.addremark = police.remark;
        this.islook = true;
      });
    },
    goDelete(police) {
      this.$confirm({
        title: "您确定要删除此警力吗？此操作不可恢复！",
        closable: true,
        content: (
          <div>
            <h2 class="del_info">提示信息</h2>
          </div>
        ),
        getContainer: () => document.getElementById("portal"),
        class: "delModal",
        centered: true,
        okText: "确认",
        cancelText: "取消",
        onOk: () => {
          this.$axios.delete(api.police(police.id)).then(() => {
            this.$notification["success"]({ message: "删除警力成功" });
            this.getPoliceAll();
          });
        },
      });
    },
    goEdit(police) {
      this.$axios.get(api.police(police.id)).then((res) => {
        var police = res.data;
        this.addname = police.name;
        this.addnumber = police.number;
        this.addsex = police.sex;
        this.addduty = police.duty;
        this.addtel = police.tel;
        this.addremark = police.remark;
        this.isupdate = true;
        this.idu = police.id;
      });
    },
    handleUpload(file) {
      const formData = new FormData();
      formData.append("file", file.file);
      this.$axios.post(api.policei(this.orgId), formData).then((res) => {
        if (res.data == "ok") {
          this.$message.success("导入成功");
          this.getPoliceAll();
        }
        if (res.data == "uploaderror") {
          this.$message.error("导入失败，请查看数据是否正确");
        }
        if (res.data == "typeerror") {
          this.$message.warning("文件格式只能是xlsx/xls");
        }
        if (res.data == "existerror") {
          this.$message.error("账号存在，请检查");
        }
        if (res.data == "nullerror") {
          this.$message.error("存在空值，请检查");
        }
        if (res.data == "nullerror") {
          this.$message.warning("文件名不能为空");
        }
      });
    },
    handleChange() {},
    exportExcel() {
      const querystring = require("querystring");
      var name = this.cname;
      var number = this.cnumber;

      this.$axios
        .post(
          api.policee(this.orgId, name, number),
          querystring.stringify({}),
          {
            responseType: "blob",
          }
        )
        .then((response) => {
          this.downloadFile(response.data);
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
      link.setAttribute("download", "警力信息表.xls");
      document.body.appendChild(link);
      link.click();
    },
  },
};
</script>
<style scoped lang="less">
@import "../../assets/style/authority.less";
@import "../../assets/style/authority_modal.less";
@import "../../assets/style/public.less";
/deep/.ant-modal-body {
  height: 40vh;
}
.table_content {
  height: 300px;
  overflow-y: auto;
  margin-top: 10px;
}
.rule_icon {
  color: red;
  position: absolute;
  left: -70px;
  top: -10px;
  font-size: 140%;
}
.rule_icon1 {
  color: red;
  position: absolute;
  left: -50px;
  top: -10px;
  font-size: 140%;
}
</style>
