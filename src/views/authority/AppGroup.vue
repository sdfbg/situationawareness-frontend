<template>
  <div class="portal_wrap" id="appGroup">
    <Header></Header>
    <div class="portal_content" style="height:calc(100% - 80px)">
      <div class="user_manage">
        <a-row>
          <a-col :span="3" class="left_content">
            <left-nav></left-nav>
          </a-col>
          <a-col
            :span="21"
            class="right_content"
            style="margin-left:0;background:rgba(0, 30, 57, .5);"
          >
            <a-row>
              <a-col :span="22" style="padding-left:30px">
                <a-tabs
                  :activeKey="selectedGroup.id"
                  :tabPosition="mode"
                  :style="{ height: 'calc(100% - 8.7vh)'}"
                  class="group_tab"
                  @change="onTabPaneClick"
                >
                  <div class="add_group" slot="tabBarExtraContent">
                    <a-button @click="goAddGroup">
                      <a-icon type="plus" />新增应用组
                    </a-button>
                  </div>
                  <a-tab-pane :key="item.id" v-for="(item,index) in groups">
                    <div slot="tab">
                      <p class="tab_title" :title="item.name">{{item.name|groupNameFilter}}</p>
                      <div class="tabExtra">
                        <img src="../../assets/images/edit.png" @click="handleTabEdit(item,index)" />
                        <img src="../../assets/images/del.png" @click="handleTabDel(item,index)" />
                      </div>
                    </div>
                    {{index}}
                    <group-table
                      :relatedApplications.sync="selectedGroup.applications"
                      :group="selectedGroup"
                    ></group-table>
                  </a-tab-pane>
                </a-tabs>
              </a-col>
            </a-row>
          </a-col>
        </a-row>
        <Footer></Footer>
        <GroupAdd
          :modalVisible.sync="groupAddModalVisible"
          containerId="appGroup"
          :mode="option"
          :form="groupToEdit"
          @add-group-success="onAddGroupSuccess"
          @edit-group-success="onEditGroupSuccess"
        ></GroupAdd>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "../common/Header.vue";
import LeftNav from "./LeftNav.vue";
import Footer from "../common/Footer.vue";
import GroupTable from "./GroupTable.vue";
import GroupAdd from "./groups/GroupAdd.vue";

import api from "@/api";

export default {
  name: "AppGroup",
  data() {
    return {
      mode: "left",
      groups: [],
      groupToEdit: {},
      groupAddModalVisible: false,
      option: "add",
      selectedGroup: {}
    };
  },
  components: {
    Header,
    LeftNav,
    Footer,
    GroupTable,
    GroupAdd
  },
  created() {
    this.$axios.get(api.groupApplications()).then(res => {
      this.groups = res.data;
      if (this.groups.length > 0) this.selectedGroup = this.groups[0];
    });
  },
  methods: {
    handleTabEdit(group) {
      this.groupToEdit = group;
      this.option = "edit";
      this.groupAddModalVisible = true;
    },
    handleTabDel(group, index) {
      let that = this;
      this.$confirm({
        title: "您确定要删除此记录吗？此操作不可恢复！",
        closable: true,
        content: (
          <div>
            <h2 class="del_info">提示信息</h2>
          </div>
        ),
        getContainer: () => document.getElementById("appGroup"),
        class: "delModal",
        centered: true,
        okText: "确认",
        cancelText: "关闭",
        onOk() {
          that.$axios.delete(api.applicationGroups(group.id)).then(() => {
            that.$notification.success({
              message: "删除成功",
              description: "操作提示"
            });
            that.groups.splice(index, 1);
          });
        }
      });
    },
    onAddGroupSuccess(group) {
      this.groups.push(group);
    },
    onEditGroupSuccess(group) {
      this.groupToEdit.name = group.name;
    },
    goAddGroup() {
      this.groupAddModalVisible = true;
      this.option = "add";
      this.groupToEdit = {};
    },
    onTabPaneClick(groupId) {
      this.selectedGroup = this.groups.find(group => group.id == groupId);
    }
  },
  filters: {
    groupNameFilter(name){
      if(name.length>=8){
        name = name.substring(0,8)
      }
      return name
    }
  }
};
</script>
<style scoped lang="less">
@import "../../assets/style/public.less";
@import "../../assets/style/authority.less";
@import "../../assets/style/authority_modal.less";
/deep/.ant-tabs-nav {
    padding-top: 37%;
}
</style>
