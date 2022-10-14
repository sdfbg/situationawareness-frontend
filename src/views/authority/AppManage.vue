<template>
  <div class="portal_wrap">
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
            style="margin-left:0;background:rgba(0, 30, 57, .35);"
          >
            <div class="app_table">
              <app-table></app-table>
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
import AppTable from "./AppTable.vue";
export default {
  name: "AppManage",
  components: {
    Header,
    Footer,
    LeftNav,
    AppTable
  }
};
</script>
<style scoped lang='less'>
@import "../../assets/style/public.less";
@import "../../assets/style/authority.less";
</style>
