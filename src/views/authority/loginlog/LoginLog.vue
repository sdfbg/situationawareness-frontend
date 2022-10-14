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
              <div class="search_item">
                <label>用户姓名：</label>
                <a-input v-model="searchValue"/>
                <button @click="search" type="button"><a-icon type="search" /></button>
              </div>
            </div>
            <div class="table_area">
              <LoginLogTable ref="loginLogTable" :searchValue="searchValue"></LoginLogTable>
            </div>
          </a-col>
        </a-row>
        <Footer></Footer>
      </div>
    </div>
  </div>
</template>
<script>
import Header from '@/views/common/Header.vue'
import Footer from '@/views/common/Footer.vue'
import LeftNav from '@/views/authority/LeftNav.vue'
import LoginLogTable from './LoginLogTable.vue'

export default {
  name: 'LoginLog',
  components: {
    Header,
    Footer,
    LeftNav,
    LoginLogTable
  },
  data () {
    return {
      searchValue: ""
    }
  },
  methods:{
    search(){
      this.$refs.loginLogTable.getLoginLog();
    }
  },
  watch:{
    $route(){
        // 获取当前路径
        let path = this.$route.path;
        // 检索当前路径
        this.checkRouterLocal(path);
    }
  }
}
</script>
<style scoped lang="less">
@import "~@/assets/style/public.less";
@import "~@/assets/style/authority.less";
</style>
