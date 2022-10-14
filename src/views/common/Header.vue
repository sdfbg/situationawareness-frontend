<template>
  <div class="portal_header" id="portalHeader">
    <a-row>
      <a-col :span="16" class="header_title">
        <img src="../../assets/images/header_titleNew.png" />
      </a-col>
      <a-col :span="8" class="header_tab">
        <a-row>
          <a-col :span="5">
            <router-link to="/demo">
              <img src="../../assets/images/ys.png" />
              <span>演示模式</span>
            </router-link>
          </a-col>
          <a-col :span="5">
            <router-link to="/desktop">
              <img src="../../assets/images/desk_icon.png" />
              <span>桌面模式</span>
            </router-link>
          </a-col>
          <a-col :span="6">
            <router-link to="/user">
              <img src="../../assets/images/settings.png" />
              <span>系统设置</span>
            </router-link>
          </a-col>
          <a-col :span="6">
            <!-- <span>欢迎您,admin</span> -->
            <a-dropdown
              :trigger="['click']"
              :getPopupContainer="() => this.$window.document.getElementById('portalHeader')"
            >
              <a class="ant-dropdown-link user_info" @click="e => e.preventDefault()">
                欢迎您,{{adminName}}
                <a-icon type="caret-down" />
              </a>
              <a-menu slot="overlay">
                <a-menu-item key="0" @click="userInfo">
                  <span>
                    <img src="../../assets/images/user.png" />
                    用户信息
                  </span>
                </a-menu-item>
                <a-menu-item key="1" @click="loginOut">
                  <span>
                    <img src="../../assets/images/login_out.png" />
                    退出
                  </span>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
            <!-- 用户信息弹窗 -->
            <a-modal
              title="用户信息"
              :visible="visible"
              centered
              :getContainer="() => this.$window.document.getElementById('portalHeader')"
              width="38.4vw"
            >
              <template slot="closeIcon">
                <span @click="handleCancel">X</span>
              </template>
              <template slot="footer">
                <a-button
                  class="confirm_btn"
                  type="primary"
                  @click="handleModify"
                  v-show="isEditModify"
                >修改</a-button>
                <!-- :disabled="isModify" -->
                <a-button
                  v-show="isModify"
                  class="confirm_btn"
                  type="primary"
                  @click="handleSubmit"
                >保存</a-button>
                <a-button class="cancel_btn" @click="handleCancel">关闭</a-button>
              </template>
              <div class="user_form">
                <a-form-model
                  :model="form"
                  :rules="rules"
                  ref="form"
                  :label-col="{ span: 5 }"
                  :wrapper-col="{ span: 12 }"
                >
                  <a-form-model-item label="用户ID" prop="accountNumber">
                    <a-input v-model="form.accountNumber" disabled />
                  </a-form-model-item>
                  <a-form-model-item label="姓名" prop="realName">
                    <a-input v-model="form.realName" type="text" :disabled="!isModify" />
                  </a-form-model-item>
                  <a-form-model-item label="昵称">
                    <a-input v-model="form.nickName" type="text" :disabled="!isModify" />
                  </a-form-model-item>
                  <a-form-model-item label="密码" prop="password">
                    <a-input
                      v-model="form.password"
                      type="password"
                      :disabled="!isModify"
                      @change="pwdChange"
                    />
                  </a-form-model-item>
                  <a-form-model-item label="确认密码" v-show="isModify" prop="password">
                    <a-input
                      :defaultValue="affirmpassword"
                      ref="rePwd"
                      type="password"
                      @change="affirmPwdChange"
                    />
                  </a-form-model-item>
                  <a-form-model-item label="手机号" prop="phoneNumber">
                    <a-input v-model="form.phoneNumber" type="text" :disabled="!isModify" />
                  </a-form-model-item>
                  <a-form-model-item label="邮箱" prop="email">
                    <a-input v-model="form.email" type="text" :disabled="!isModify" />
                  </a-form-model-item>
                  <a-form-model-item label="警号" prop="policeId">
                    <a-input v-model="form.policeId" type="text" :disabled="!isModify" />
                  </a-form-model-item>
                  <a-form-model-item label="职务">
                    <a-input v-model="form.duty" type="text" :disabled="!isModify" />
                  </a-form-model-item>
                  <a-form-model-item label="所属部门" prop="departmentId">
                    <a-tree-select
                      v-model="form.departmentId"
                      style="width: 100%"
                      :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                      :tree-data="departments"
                      placeholder="请选择部门"
                      :disabled="!isModify"
                    ></a-tree-select>
                  </a-form-model-item>
                  <a-form-model-item label="角色" prop="roleId">
                    <a-select v-model="form.roleId" :disabled="!isModify" placeholder="请选择角色">
                      <a-select-option
                        v-for="item in roles"
                        :key="item.id"
                        :value="item.id"
                      >{{item.roleName}}</a-select-option>
                    </a-select>
                  </a-form-model-item>
                </a-form-model>
              </div>
            </a-modal>
          </a-col>
        </a-row>
      </a-col>
      <!-- <a-col :span="1"   >
        <a-icon type="left-circle" @click="toperson" style="color: #2ecbda "/>
      </a-col> -->
    </a-row>
  </div>
</template>
<script>
import api from "@/api";
import bcrypt from "bcryptjs";
import {
  validatePhoneTwo,
  validateEMail,
  validatePsdReg,
  validateCode,
  validatePolceCode
} from "@/utils/validator";
export default {
  name: "Header",
  data() {
    return {
      visible: false,
      varText: "修改",
      form: {},
      isModify: false,
      isEditModify: true,
      departments: "",
      roles: "",
      adminName: "",
      userInfos: {},
      rules: {
        accountNumber: [{ validator: validateCode, trigger: "blur" }],
        realName: [{ message: "请输入姓名" }],
        nickName: [{ message: "请输入昵称" }],
        phoneNumber: [
          { message: "请输入手机号" },
          { validator: validatePhoneTwo, trigger: "blur" }
        ],
        email: [
          { message: "请输入邮箱" },
          { validator: validateEMail, trigger: "blur" }
        ],
        policeId: [{ validator: validatePolceCode, trigger: "blur" }],
        departmentId: [{ message: "请选择部门" }],
        duty: [{ message: "请输入职务" }],
        roleId: [{ message: "请选择角色" }],
        password: [
          { message: "请输入密码" },
          { validator: validatePsdReg, trigger: "blur" }
        ]
      },
      passwordata: "",
      affirmpassword: ""
    };
  },
  created() {
    this.getDepartment();
    this.getRole();
  },
  mounted() {
    this.getUserMessage();
  },
  watch: {},
  methods: {
    toperson(){
      this.$router.push("/manage");
    },
    //退出
    loginOut() {
      this.$axios.post(api.logOut()).then(() => {
        this.$router.push("/login");
      })
    },
    pwdChange() {
      this.$refs.rePwd.value = "";
      this.affirmpassword = "";
    },
    affirmPwdChange(e) {
      this.passwordata = e.target.value;
    },
    //用户信息
    getUserMessage() {
      var id = JSON.parse(window.localStorage.getItem("userInfo")).id;
      this.$axios.get(api.user(id)).then(res => {
        this.form = res.data;
        this.adminName = this.form.realName;
        this.affirmpassword = this.form.password;
      });
    },
    userInfo() {
      this.visible = true;
      this.isEditModify = true;
    },
    handleModify() {
      this.isModify = true;
      this.isEditModify = false;
    },
    handleCancel() {
      this.isModify = false;
      this.visible = false;
    },
    handleSubmit() {
      var id = JSON.parse(window.localStorage.getItem("userInfo")).id;
      this.$refs.form.validate(valid => {
        if (valid) {
          var salt = bcrypt.genSaltSync(12);
          var password = bcrypt.hashSync(this.form.password, salt);
          if (this.$refs.rePwd.defaultValue == this.form.password) {
            this.$axios.put(api.user(id), this.form).then(res => {
              if (res.data == "ok") {
                this.adminName = this.form.realName;
                this.$message.success("修改成功");
                this.isModify = false;
                this.visible = false;
              }
            });
          } else if (bcrypt.compareSync(this.passwordata, password)) {
            this.form.password = password;
            this.$axios.put(api.user(id), this.form).then(res => {
              if (res.data == "ok") {
                this.adminName = this.form.realName;
                alert("修改成功,密码已更改，请重新登录");
                this.isModify = false;
                this.visible = false;
                this.$router.push("/login");
              }
            });
          } else {
            this.$message.error("密码和确认密码不一致");
          }
        }
      });
    },
    // 获取部门
    getDepartment() {
      this.$axios.get(api.departments()).then(response => {
        this.departments = response.data;
      });
    },
    // 获取角色
    getRole() {
      this.$axios.get(api.roless()).then(response => {
        this.roles = response.data;
      });
    }
  }
};
</script>
<style scoped lang='less'>
@import "../../assets/style/public.less";
/deep/.ant-col-1 {
    /* width: 36px; */
    padding-top: 27px;
    padding-left: 10px;
    display: block;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 4.16666667%;
}
</style>
