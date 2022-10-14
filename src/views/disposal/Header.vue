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
          <img src="../../assets/images/warn/warn.gif" style="width: 80%;"/>
        </a-col>
        <a-col span="10">
          <div class="icon_groups">
            <!-- <div class="header_db" @click.stop="handleShowList">
              <img src="@/assets/images/warn/header_db.png"/>
              <i v-if="remindTasks.length>0">{{remindTasks.length>99?'99+':remindTasks.length}}</i>
            </div> -->
            <img
              src="@/assets/images/warn/set_icon.png"
              title="系统管理"
              @click="toSystem"
            />
            <!-- <img class="mini_icon" src="../assets/images/warn/minu_icon.png" /> -->
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
      <!-- 待办任务 -->
      <div class="todo_list" v-if="showList" @click.stop>
        <h3>
          <img src="../../assets/images/warn/title-left.png"/>
          <span>超时提醒</span>
          <img src="../../assets/images/warn/title-right.png"/>
        </h3>
        <div class="list_container">
           <a-list item-layout="horizontal" :data-source="remindTasks">
             <a-list-item slot="renderItem" slot-scope="item">
               <div class="list_item">
                 <img src="../../assets/images/warn/message_icon.png"/>
                  <a-tooltip placement="top" @click="()=>goDetail(item)">
                    <template slot="title">
                      <span v-html="title"></span>
                    </template>
                   <div class="todo_content" v-html="title"></div>
                  </a-tooltip>
               </div>
             </a-list-item>
           </a-list>
        </div>
        <div class="page">共{{this.remindTasks.length}}条</div>
      </div>
    </div>
    
  </div>
</template>
<script>
import api from "@/api";
import moment from "moment";
import { mapState, mapActions, mapMutations, } from "vuex";
export default {
  name: "Header",
  data() {
    return {
      now: moment().format("YYYY-MM-DD HH:mm:ss"),
      title:'您收到一条<span style="color:red">超时预警</span>消息，请及时处理',
      showList:false
    };
  },
  computed: {
    ...mapState("dispoal",["remindTasks","admin"]),
    ...mapState("userInfo", ["userInfo"]),
  },
  watch: {
    showList(val) {
      if(val) {
        document.body.addEventListener('click', () => {
            this.showList = false;
        })
      } else {
        document.body.removeEventListener('click', () => {});
      }
    }
  },
  mounted() {
    this.getUserInfo();
    this.setAdmin(JSON.parse(localStorage.getItem("userInfo")).admin);
    if(this.admin!=1){
      this.fetchReminds()
    }
    setInterval(() => {
      this.now = moment().format("YYYY-MM-DD HH:mm:ss");
    }, 1000);
    document.addEventListener('click', (e)=> {
        if (e.target.className != 'todo_list'&&e.target.className != 'header_db') {
            this.showList= false;
        }
    })
    
  },
  methods: {
    ...mapActions("userInfo", ["getUserInfo"]),
    ...mapActions("dispoal", ["fetchReminds"]),
    ...mapMutations("dispoal", ["setAdmin"]),
    toSystem() {
      
    },
    logOut() {
      this.$axios.post(api.logOut()).then(() => {
        this.$router.push("/login");
      })
    },
    handleShowList(){
      this.showList = !this.showList;
    },
    //   loginOut() {
      
    //     try {
    //       if (joc) {
    //         joc.reset();
    //       }
    //     } catch (e) {
    //       this.$axios.get(api.loginOut()).then(() => {
    //         window.open(process.env.VUE_APP_PORTAL_LOGIN_URL, "_self");
    //       })
          
    //     }    
    // },
    goDetail(){
      // this.$router.push({path:"all",params:{taskId:task.id}})
    }
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
