<template>
  <div>
    <div class="left_menu disposal_menu" ref="menu">
      <div
        :class="{
          'menu_item': true,
          'active': $route.path==item.path
        }"
        v-for="(item, i) in menus"
        :key="i"
        :title="item.title"
        @click="()=>handleMenuClick(item)"
      >
        <img :src="item.icon" />
        <span>{{ item.title }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { harvestMenus } from "@/router";
const metaMapper = (menu) => {
  const {path, meta:{title, admin, icon}} = menu
  return {path, title, admin, icon} 
} 
let menus = harvestMenus.map(metaMapper)
export default {
  name: "TaskLeftMenu",
  computed: {
    ...mapState("dispoal", ["admin"]),
    menus(){
      return this.admin==1?menus:menus.filter(m=>!m.admin)
    }
  },
  data() {
    return {
      autoplay:false
    }
  },
  watch:{},
  mounted(){},
  methods: {
    handleMenuClick(item) {
      this.$router.push(item.path);  
    },
    showNotification(){
      this.autoplay = true
      // const that = this
      this.$notification.close()
      this.$notification.destroy()
      const h = this.$createElement;
        this.$notification.open({
        message: '预警提醒',
        description: h('div', {}, [
          h('p', '预警内容：XXXXXX'),
          h('p', '预警时间：XXXXX'),
        ]),
        duration:null,
        placement: "bottomRight"
      });
    }
  },
};
</script>
<style lang="less" scoped>
@import "~@/assets/style/warn/home.less";
</style>
<style>
.ant-notification{
  color: #fff;
}
.ant-notification-notice{
  background: url("../../../assets/images/warn/large_box.png") no-repeat;
  background-size: 100% 100%;
  background-color: #0ff;
  width: 3.6rem;
  height: 2.4rem;
  
}
.ant-notification-notice-message{
  color: yellow;
}
.ant-notification-notice-close{
  color: #fff;
}
</style>
