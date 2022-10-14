<template>
  <div class="top">
    <h1>
      <img src="@/assets/images/warn/logo.png" />
      <span>预警处置平台</span>
    </h1>
    <div class="left_info">
      <a-row>
        <a-col :span="12">
          <img src="@/assets/images/warn/company_icon.png" />
          <span>{{ userInfo.realName }}</span>
        </a-col>
        <a-col :span="12">
          <img src="@/assets/images/warn/user_icon.png" />
          <span>{{ userInfo.username }}</span>
        </a-col>
      </a-row>
    </div>
    <div class="right_info">
      <a-row>
        <a-col span="12">
          <div class="current_date">{{ now }}</div>
        </a-col>
        <a-col span="2">
          <img src="../../assets/images/warn/warn.gif" style="width: 150%" v-show="showWarnSign"/>
        </a-col>
        <a-col span="10">
          <div class="icon_groups">
            <img
              src="@/assets/images/warn/set_icon.png"
              title="系统管理"
              @click="toSystem"
            />
            <a-dropdown>
              <a-menu slot="overlay" class="loginOutCss">
                <!-- <a-menu-item key="1">
                  <a-icon type="user" />1st menu item
                </a-menu-item> -->
                <a-menu-item key="1" @click="logOut">
                  <span class="loginOutFrontCss">
                    <!-- <img src="../assets/images/login_out.png" /> -->
                    退出
                  </span>
                </a-menu-item>
              </a-menu>
              <img src="@/assets/images/warn/logout_icon.png" />
            </a-dropdown>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script>
import api from "@/api";
import moment from "moment";
import { mapActions, mapState } from 'vuex';
export default {
  name: "Header",
  data() {
    return {
      now: moment().format("YYYY-MM-DD HH:mm:ss"),
    };
  },
  mounted() {
    this.getUserInfo();
    setInterval(() => {
      this.now = moment().format("YYYY-MM-DD HH:mm:ss");
    }, 1000);
  },
  computed: {
    ...mapState("userInfo", ["userInfo"]),
    ...mapState("dispoal", ["wsData", "showWarnSign"])
  },
  methods: {
    ...mapActions("userInfo", ["getUserInfo"]),
    toSystem() {},
    logOut() {
      this.$axios.post(api.logOut()).then(() => {
        this.$router.push("/login");
      })
    },
    // loginOut() {
    //   try {
    //     if (joc) {
    //       joc.reset();
    //     }
    //   } catch (e) {
    //     this.$axios.get(api.loginOut()).then(() => {
    //       window.open(process.env.VUE_APP_PORTAL_LOGIN_URL, "_self");
    //     })
    //   }    
    // },
  },
};
</script>
<style lang="less" scoped>
@import "~@/assets/style/warn/home.less";
.loginOutCss {
  background-color: rgb(5, 26, 90);
}
.loginOutFrontCss {
  color: rgb(102, 142, 230);
}
</style>
