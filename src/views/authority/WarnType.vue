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
            </div>
            <div class="table_area">
              <warnType-table />
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
import WarnTypeTable from "./WarnTypeTable.vue";
import api from "@/api";
export default {
  name: "WarnType",
  components: {
    Header,
    Footer,
    LeftNav,
    WarnTypeTable
  },
  data() {
    return {
      orgs:[]
    };
  },
  created() {
    this.$axios.get(api.organizations()).then((res) => this.orgs = res.data);
  },
};
</script>
<style scoped lang="less">
@import "../../assets/style/public.less";
@import "../../assets/style/authority.less";
</style>
