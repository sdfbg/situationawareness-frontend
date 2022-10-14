<template>
  <div class="left_menu disposal_menu">
    <div :class="$store.state.dispoal.active==i?'menu_item active':'menu_item'" v-for="(item,i) in list" :key='i' :title="item.text" @click="handleMenuClick(item,i)">
      <img :src="item.icon" />
      <span>{{item.text}}</span>
      <!-- <span v-if="$store.state.leftNav.showText">{{item.text}}</span> -->
    </div>
  </div>
</template>
<script>
export default {
  name:'LeftMenu',

  data() {
    return {
      list:[
        {
          id:'0',
          text:'预警中心',
          icon:require('@/assets/images/menu/yjly.png'),
          path:'warnlist',
        },
        {
          id:'1',
          text:'实时预警',
          icon:require('@/assets/images/menu/hgts.png'),
          path:'/page',
        },
        {
          id:'2',
          text:'任务中心',
          icon:require('@/assets/images/menu/yjly.png'),
          path:'all',
        },
        {
          id:'3',
          text:'待办任务',
          icon:require('@/assets/images/menu/yjzt.png'),
          path:'tosend',
        },
        // {
        //   id:'4',
        //   text:'待归档任务',
        //   icon:require('@/assets/images/menu/qsfx.png'),
        //   path:'/home',
        // },
        // {
        //   id:'5',
        //   text:'未完成任务',
        //   icon:require('@/assets/images/menu/qwjd.png'),
        //   path:'/serviceSupervision',
        // },
        // {
        //   id:'6',
        //   text:'已完结任务',
        //   icon:require('@/assets/images/menu/yapg.png'),
        //   path:'/plansAssessment',
        // }
      ]
    }
  },
  methods: {
    handleMenuClick(item,index){
      this.$store.commit('dispoal/setActiveIndex',(index))
      this.$router.push(item.path)
    }
  },
}
</script>
<style lang="less" scoped>
@import '~@/assets/style/warn/home.less';
</style>
