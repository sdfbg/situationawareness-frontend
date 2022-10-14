<template>
  <div class="layout">
    <div class="top">
    <div class="header">
      <h1>
        <img src="../../assets/images/title_jinghui.png"/>
      </h1>
      <div class="current_time">2022-09-09 12:12:12</div>
      <div class="user_info">
        <span>
          <img src="../../assets/images/user_icon.png"/>
          <b>{{ userInfo.realName }}</b>
          <a-icon type="caret-down" />
        </span>
        <span>
          <img src="../../assets/images/logout.png"/>
          <b>退出</b>
        </span>
      </div>
    </div>
    <div class="menu">
      <a-menu  mode="horizontal" :selectedKeys="selectedKeys">
        <a-menu-item @click="handleItemClick(item)" :key="item.path" v-for="item in menu"> {{item.title}} </a-menu-item>
      </a-menu>
      <div class="gateway_btn" @click="tomenhu">
        <img src="../../assets/images/home_icon.png"/>
        <span>统一门户</span>
      </div>
    </div>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import {chartMenus} from "@/router"
import { mapActions, mapState } from 'vuex'
const menu = chartMenus.filter(c=>!c.meta.hidden).map(c=>({title:c.meta.name,name:c.name,path:c.path}))
export default {
  name:'Layout',
  data(){
    return {
      menu,
    }
  },
  computed: {
    ...mapState("userInfo", ["userInfo"]),
    selectedKeys(){
      if (this.$route.path=='/accident'||this.$route.path=='/illegal') {
        return ['/accident']
      }else {
        return [this.$route.path]
      }
    }
  },
  mounted() {
    this.getUserInfo();
  },
  methods:{
    ...mapActions("userInfo", ["getUserInfo"]),
    handleItemClick(item){
      this.$router.push(item.path)
      this.$store.commit("menu/setSelectedKey", [item.path]);
    },
    tomenhu(){
      this.$router.push("/desktop");
    },
  }
}
</script>
<style lang="less" scoped>
@import "../../assets/style/layout.less";
</style>