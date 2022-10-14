<template>
  <div id="roleTable">
    <div class="table_btns">
      <button class="add_btn" @click="goAddRole"></button>
      <a-modal
        v-model="modalVisible"
        :title="modalTitle"
        :maskClosable="false"
        centered
        :getContainer="() => this.$window.document.getElementById('roleTable')"
        width="42.7vw"
        wrapClassName="add_role"
      >
        <template slot="footer">
          <a-button key="submit" type="primary" class="submit_btn" v-show="showButton" @click="submit">提交</a-button>
          <a-button key="back" class="cancel_btn" v-show="showButton" @click="cancel">取消</a-button>
        </template>
        <a-form-model
          :model="role"
          :rules="rules"
          ref="form"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-form-model-item label="角色名称" prop="roleName">
            <a-input v-model="role.roleName" :disabled="this.mode=='show'" />
          </a-form-model-item>
          <a-form-model-item label="备注" prop="remarks">
            <a-input v-model="role.remarks" :disabled="this.mode=='show'"/>
          </a-form-model-item>
          <a-form-model-item label="关联">
            <a-tree
              checkable
              :selectable="false"
              :treeData="role.applications"
              :replaceFields="replaceFields"
              :checkedKeys="checkedNodeKeys"
              :expandedKeys="expandedNodeKeys"
              :autoExpandParent="false"
              :disabled="this.mode=='show'"
              @check="onCheck"
              @expand="onExpand"
              class="role_tree"
            />
          </a-form-model-item>
        </a-form-model>
      </a-modal>
    </div>
    <div class="table_content">
      <a-table :columns="columns" :dataSource="roles" :pagination="pagination">
        <template v-slot:action="role">
          <a href="javascript:;" class="detail" @click="goDetail(role)">查看</a>
          <a href="javascript:;" class="modify" @click="goEdit(role)">修改</a>
          <a href="javascript:;" class="delete" @click="goDelete(role)">删除</a>
        </template>
        <template v-slot:relate="role">
          <a href="javascript:;" @click="goRelate(role)" class="detail">关联权限</a>
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
    key: "index",
    width: 80
  },
  {
    title: "角色名称",
    dataIndex: "roleName",
    width: 180
  },
  {
    title: "备注",
    dataIndex: "remarks",
    width: 180
  },
  {
    title: "关联操作",
    scopedSlots: { customRender: "relate" },
    width: 180
  },
  {
    title: "操作",
    scopedSlots: { customRender: "action" },
    width: 180
  }
];
import {
  validateLen,
} from "@/utils/validator";
export default {
  name: "roleTable",
  data() {
    return {
      roles: [],
      role: {},
      columns,
      pagination: {
        showSizeChanger: true
      },
      modalVisible: false,
      addRole:false,
      rules: {
        roleName: [
          validateLen(60),
          {
            required: true,
            message: "请输入角色名",
            trigger: "blur"
          }
        ],
        remarks: [
           validateLen(100),
          {
            required: false
          }
        ]
      },
      mode: "add",
      modalTitle: "新增角色",
      roleToEdit: {},
      replaceFields: {
        children: "subMenus",
        title: "name",
        key: "id"
      },
      applications: [],
      checkedNodeKeys: [],
      expandedNodeKeys: [],
      showButton:true,
    };
  },
  props: ["searchValue"],
  created() {
    this.getRoles();
    this.getApplications();
  },
  methods: {
    getRoles() {
      this.$axios.get(api.roles()).then(response => {
        this.roles = response.data.filter(
          role => role.roleName.indexOf(this.searchValue) > -1
        );
        this.roles.forEach((role,index) => {
          role.key = role.id;
          role.index = index + 1;
        });
      });
    },
    getApplications() {
      this.$axios.get(api.applicationMenus()).then(response => {
        clearLogoUrl(response.data)
        this.applications = response.data;
        this.role.applications = this.applications;
      });
    },
    goAddRole() {
      this.mode = "add";
      this.modalTitle = "新增角色";
      this.role = {};
      this.modalVisible = true;
      this.applications.forEach(applicatin => checkSubMenus(applicatin, false));
      this.role.applications = this.applications;
      this.checkedNodeKeys = [];
      this.expandedNodeKeys = [];
    },
    submit() {
      if (this.mode == "show") {
        return;
      }
      this.$refs.form.validate(valid => {
        if (valid) {
          this.role.applications.forEach(application =>
            setParentChechStatus(application)
          );
          let type = this.mode == "edit" ? "put" : "post";
          let url =
            this.mode == "edit"
              ? `${api.roles()}/${this.role.id}`
              : api.roles();
          this.$axios[type](url, this.role).then(res => {
            this.$notification.success({
              message: "操作成功",
              description: "操作提示"
            });
            if (this.mode == "add") {
              res.data.key = res.data.id;
              this.roles.push(res.data);
            } else if (this.mode == "edit") {
              this.roleToEdit.id = this.role.id;
              this.roleToEdit.roleName = this.role.roleName;
              this.roleToEdit.remarks = this.role.remarks;
              this.roleToEdit.key = this.role.id;
            }
            this.modalVisible = false;
          });
        }
      });
    },
    cancel() {
      this.modalVisible = false;
    },
    goDetail(role) {
      this.mode = "show";
      this.modalTitle = "查看角色";
      this.$axios.get(api.roles(role.id)).then(res => {
        res.data.key = res.data.id;
        this.role = res.data;
        this.checkedNodeKeys = getCheckedNodes(this.role.applications);
        this.expandedNodeKeys = [...this.checkedNodeKeys];
        this.modalVisible = true;
        this.showButton=false;
      });
    },
    goEdit(role) {
      this.roleToEdit = role;
      this.mode = "edit";
      this.modalTitle = "修改角色";
      this.$axios.get(api.roles(role.id)).then(res => {
        clearLogoUrl(res.data.applications)
        res.data.key = res.data.id;
        this.role = res.data;
        this.checkedNodeKeys = getCheckedNodes(this.role.applications);
        this.expandedNodeKeys = [...this.checkedNodeKeys];
        this.modalVisible = true;
        this.showButton=true;
      });
    },
    goDelete(role) {
      let that = this;
      this.$confirm({
        title: "您确定要删除此角色吗？此操作不可恢复！",
        closable: true,
        content: (
          <div>
            <h2 class="del_info">提示信息</h2>
          </div>
        ),
        getContainer: () => document.getElementById("roleTable"),
        class: "delModal",
        centered: true,
        okText: "确认",
        cancelText: "关闭",
        onOk() {
          that.$axios.delete(api.roles(role.id)).then(() => {
            that.$notification.success({
              message: "删除成功",
              description: "操作提示"
            });
            that.roles.splice(
              that.roles.findIndex(arole => arole == role),
              1
            );
          });
        }
      });
    },
    goRelate(role) {
      this.goEdit(role);
    },
    onCheck(checkedKeys, info) {
      this.checkedNodeKeys = checkedKeys;
      checkSubMenus(info.node.dataRef, info.checked);
    },
    onExpand(expandedKeys) {
      this.expandedNodeKeys = expandedKeys;
    }
  }
};
/**
 * 设置某个节点的子节点checked值与树的checked状态一致
 */
function checkSubMenus(menu, flag) {
  menu.checked = flag;
  if (menu.subMenus) menu.subMenus.forEach(menu => checkSubMenus(menu, flag));
}
/**
 * 设置某个节点的子节点checked值与树的checked状态一致
 */
function clearLogoUrl(apps) {
  if(!apps) return
  apps.forEach(app=>app.logoUrl=undefined)
}
/**
 *
 */
function setParentChechStatus(node) {
  if (!node.subMenus || node.subMenus.length == 0) return node.checked;
  node.checked = node.subMenus.reduce((result, menu) => {
    return setParentChechStatus(menu) || result;
  }, false);
  return node.checked;
}
/**
 * 获取所有应该被check的叶节点（用于初始化树）
 */
function getCheckedNodes(nodes, container = []) {
  nodes.forEach(node => {
    if (!node.subMenus || node.subMenus.length == 0) {
      if (node.checked) {
        container.push(node.id);
      }
    } else {
      getCheckedNodes(node.subMenus, container);
    }
  });
  return container;
}
</script>
<style scoped lang="less">
@import "~@/assets/style/authority.less";
@import "~@/assets/style/authority_modal.less";
</style>
