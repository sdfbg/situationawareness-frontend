<template>
  <div>
    <h2 class="left_title">权限管理</h2>
    <a-menu style="width: 100%" mode="vertical"
    :selectedKeys="[$route.name]">
      <a-menu-item :key="index" v-for="(item,index) in navList"
       :class="navIndex === index ? 'item_active': ''"
       @click="handleNavClick(item,index)">
        <img
          :src="item.icon"
          class="left_icon"
        />
        <span class="nav_title">{{item.title}}</span>
        <!--
        <img
          src="../../assets/images/right_arrow.png"
          class="right_arrow"
        />
        -->
      </a-menu-item>
    </a-menu>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import navList from '@/components/navList'
export default {
  name: 'LeftNav',
  data () {
    return {
      navList,
    //   current: ['1']
    //   navIndex:0
    }
  },
  computed: {
    ...mapState('leftNav', [
      'activePath',
    ]),
    navIndex: {
      get: function () {
        return this.$store.state.leftNav.navIndex
      },
      set: function () {
      }
    }
  },
  methods: {
    handleNavClick (item,index) {
      this.navIndex = index
      this.$router.push(item.path).catch(err => err)
    //   this.current = [item.id]
    },
    /**
    * 检索当前路径
    */
    checkRouterLocal(path) {
    // 查找当前路由下标高亮
    this.navIndex = this.navList.findIndex(item => item.path === path);
    }
  }
}
</script>
<style scoped lang='less'>
@import "../../assets/style/authority.less";
</style>
