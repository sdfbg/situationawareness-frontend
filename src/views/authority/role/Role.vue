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
                <label>角色名称：</label>
                <a-input v-model="searchValue"/>
                <button @click="search" type="button"><a-icon type="search" /></button>
              </div>
            </div>
            <div class="table_area">
              <role-table ref="roleTable" :searchValue="searchValue"></role-table>
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
import RoleTable from './RoleTable.vue'

export default {
  name: 'Role',
  components: {
    Header,
    Footer,
    LeftNav,
    RoleTable
  },
  data () {
    return {
      searchValue: ""
    }
  },
  methods:{
    search(){
      this.$refs.roleTable.getRoles();
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
