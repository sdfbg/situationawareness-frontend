<template>
  <div class="portal_wrap">
    <Header></Header>
    <div class="portal_content" style="height:calc(100% - 8vh)">
      <div class="user_manage">
        <a-row>
          <a-col :span="3" class="left_content">
            <left-nav></left-nav>
          </a-col>
          <a-col :span="20" class="right_content">
            <div class="search_area">
              <a-form layout="inline" :model="formInline">
                <div class="search_item">
                  <a-form-item>
                    <label>搜索：</label>
                  </a-form-item>
                  <a-form-item>
                    <!-- <a-select class="org_select" placeholder="组织" v-model="formInline.orgId">
                      <a-select-option
                        v-for="item in departments"
                        :key="item.id"
                        :value="item.id"
                      >{{item.orgName}}</a-select-option>
                    </a-select> -->
               <a-tree-select
              class="org_select"
              v-model="formInline.orgId"
              :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
              :tree-data="departments"
              placeholder="组织"

            ></a-tree-select>
                  </a-form-item>
                  <a-form-item>
                    <a-select class="org_select" placeholder="角色" v-model="formInline.roleId">
                      <a-select-option
                        v-for="item in roles"
                        :key="item.id"
                        :value="item.id"
                      >{{item.roleName}}</a-select-option>
                    </a-select>
                  </a-form-item>
                  <a-form-item>
                    <a-input placeholder v-model="formInline.message" />
                  </a-form-item>
                  <a-form-item>
                    <button type="button" @click="onSubmit">
                      <a-icon type="search" />
                    </button>
                  </a-form-item>
                </div>
              </a-form>
            </div>
            <div class="table_area">
              <user-table :message="formData" :status="status"></user-table>
            </div>
          </a-col>
        </a-row>
        <Footer></Footer>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "../common/Header.vue";
import Footer from "../common/Footer.vue";
import LeftNav from "./LeftNav.vue";
import UserTable from "./UserTable.vue";
import api from "@/api";
export default {
  name: "User",
  components: {
    Header,
    Footer,
    LeftNav,
    UserTable
  },
  data() {
    return {
      departments: [],
      roles: [],
      formInline: {},
      formData: {},
      status: false
    };
  },
  created() {
    this.getDepartment();
    this.getRole();
  },
  methods: {
    onSubmit() {
      this.formData = this.formInline;
      this.status = !this.status;
      // this.$refs.UserTable.getUserPage();
    },
    // 获取部门
    getDepartment() {
      var allDepartments = {
        key: "alldepartments",
        title: "查看全部",
        value:"alldepartments",

      };
      this.$axios.get(api.departments()).then(response => {
        this.departments = response.data;
        this.departments.splice(0, 0, allDepartments);
      });
    },
    // 获取角色
    getRole() {
      var allroles = {
        createTime: "",
        id: "allroles",
        remarks: "查看全部",
        roleName: "查看全部",
        updateTime: ""
      };
      this.$axios.get(api.roless()).then(response => {
        this.roles = response.data;
        this.roles.splice(0, 0, allroles);
      });
    }
  },
  watch: {
    $route() {
      // 获取当前路径
      let path = this.$route.path;
      // 检索当前路径
      this.checkRouterLocal(path);
    }
  }
};
</script>
<style scoped lang="less">
@import "../../assets/style/public.less";
@import "../../assets/style/authority.less";
</style>
