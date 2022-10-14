<template>
  <div class="portal_wrap">
    <Header></Header>
    <div class="portal_content" style="height:calc(100% - 80px)">
      <div class="user_manage">
        <a-row>
          <a-col :span="3" class="left_content">
            <left-nav></left-nav>
          </a-col>
          <a-col :span="20" class="right_content">
            <div class="search_area">
              <div class="search_item">
                <label>搜索：</label>
               <a-input placeholder="" />
                <button type="button"><a-icon type="search" /></button>
              </div>
            </div>
            <div class="table_area">
              <police-table></police-table>
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
import PoliceTable from "./PoliceTable";
export default {
  name: "PoliceRes",
  components: {
    Header,
    Footer,
    LeftNav,
    PoliceTable
  }
};
</script>
<style scoped lang="less">
@import "../../assets/style/public.less";
@import "../../assets/style/authority.less";
</style>
