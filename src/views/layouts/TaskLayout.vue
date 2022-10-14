<template>
  <div class="home_wrap home_other" ref="page">
    <Header v-if="!noHeader"/>
    <left-menu />
    <div class="content_other">
      <a-modal
          title="任务处置"
          :visible="modalVisible"
          @cancel="()=>setModalVisible(false)"
          centered
          :maskClosable="false"
          :getContainer="() => $refs.page"
          width="12rem"
          :footer="null"
        >
        <task-flow/>
      </a-modal>
      <div class="crumbs_nav">
        <a-breadcrumb>
          <a-breadcrumb-item>{{currentPage}}</a-breadcrumb-item>
        </a-breadcrumb>
      </div>
      <warn-page/>
    </div>
  </div>
</template>
<script>
import LeftMenu from "../disposal/LeftMenu";
import Header from '../disposal/Header.vue';
import TaskFlow from "../disposal/TaskFlow.vue";
import { mapState, mapMutations } from "vuex";
export default {
  name:'TaskLayout',
  components:{
    LeftMenu,
    Header,
    TaskFlow,
  },
  data() {
    return {
      noHeader:false
    }
  },
  computed: {
    ...mapState("dispoal", ["modalVisible"]),
    currentPage(){
      return this.$route.meta.title
    }
  },
  created(){
    if(this.$route.query.noHeader=="true"){
      this.noHeader=true
    }
    this.setAdmin(JSON.parse(localStorage.getItem("userInfo")).admin)
  },
  methods:{
    ...mapMutations("dispoal", ["setModalVisible","setAdmin"]),
  }
}
</script>
<style lang="less" scoped>
@import "../../assets/style/warn/home.less";
@import "../../assets/style/warn/modal.less";
@import "../../assets/style/disposal/disposal.less";
</style>