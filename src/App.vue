<template>
  <div id="app" ref="page" @click.once="mediaControl">
    <a-spin :spinning="false" tip="请稍后" size="large">
      <router-view v-if="isRouter"/>
    </a-spin>
    <audio ref="mediaPlay" src="./assets/sound/4031.mp3" controls :hidden="true"></audio>
    <a-modal
      title="预警坐标"
      :visible="pointModalVisible"
      @cancel="cancelShowWarn"
      centered
      :maskClosable="false"
      :getContainer="() => $refs.page"
      width="10rem"
      :footer="false"
      destroyOnClose
    >
      <fake-warn-point-map v-loading="true" :Info="warnPointData" />
    </a-modal>
  </div>
</template>
<script>
import navList from '@/components/navList'
import event from '@/event'
import api from "@/api";
import { mapActions } from 'vuex';
import FakeWarnPointMap from "./views/manage/FakeWarnPointMap.vue";
export default {
  name: 'App',
  components: {
    FakeWarnPointMap
  },
  provide(){
    return{
      reload:this.reload
    }
  },
  data () {
    return {
      isRouter:true,
      spinning: false,
      autoplay: false,
      mediaPlay: undefined,
      pointModalVisible: false,
      warnPointData: {},
      timeConnect: 0
    }
  },
  created() {
    event.$on("turn-on-universal-spin", ()=>{
      this.spinning = true
    })
    event.$on("turn-off-universal-spin", ()=>{
      this.spinning = false
    })
  },
  watch: {
    '$route' ({ path }) {
      // 获取当前路径
      this.$store.commit('leftNav/setActivePath', path)
      const navIndex = navList.findIndex(item => item.path === path)
      this.$store.commit('leftNav/setNavIndex', navIndex);
      // 检索当前路径
      // this.checkRouterLocal(path);
    }
  },
  mounted() {
    this.mediaPlay = this.$refs.mediaPlay;
    if(process.env.VUE_APP_NET == "GONGAN"){
      this.getUserInfo();
    }
  },
  methods:{
    ...mapActions("dispoal", ["changeWsData", "changeShowWarnSign"]),
    getUserInfo() {
      this.$axios.get(api.getUserInfo()).then((res) => {
        const groupNum = res.data.groupNum
        const cityCode = res.data.cityCode;
        if(groupNum == 1 || groupNum == 2){
          this.connectWebSocket(groupNum, cityCode)
        }
      })
    },
    //webSocket连接
    connectWebSocket(groupNum, cityCode) {
      const websocket = new WebSocket(`ws://${window.location.host}/ws/ws/warn/ly/${groupNum}/${cityCode}`)
      websocket.onopen = () => {
        console.log("ws连接创建成功！");
      };
      websocket.onmessage = ( e => {
        const data = JSON.parse(e.data);
        this.changeWsData(data);
        this.showNotification(data);
      });
      //心跳
      // setInterval(() => {
      //   websocket.send("测试");
      // }, 30000);
      websocket.onerror = () => {
        console.log("出现错误，ws已断开连接！");
        this.reconnectWebSocket(groupNum, cityCode);
      };
      websocket.onclose = () => {
        console.log("ws连接意外关闭");
        this.reconnectWebSocket(groupNum, cityCode);
      };
    },
    //webSocket重连
    reconnectWebSocket(groupNum, cityCode) {
      this.timeConnect ++;
      console.log("ws第" + this.timeConnect + "次重连");
      setTimeout(() => {
        this.connectWebSocket(groupNum, cityCode);
      }, 1000)
    },
    showNotification(data){
      console.log(data);
      this.mediaPlay.play();
      this.changeShowWarnSign(true);
      let warnType = "";
      switch (data.type) {
        case "1":
          warnType = "非法关闭GPS"
          break;
        case "2":
          warnType = "疲劳驾驶"
          break;
        case "3":
          warnType = "超速预警"
          break;
        default:
          break;
      }
      this.$notification.close()
      this.$notification.destroy()
      const h = this.$createElement;
      this.$notification.open({
        message: '预警提醒',
        description: h('div', {}, [
          h('p', '预警类型：' + warnType),
          h('p', '预警时间：' + data.yjsj),
          h('p', '车牌号码：' + data.hphm),
          h('p', '卡口站点：' + data.kkmc),
          h('p', '执法站名称：' + data.zfzmc),
        ]),
        duration: null,
        placement: "bottomRight",
        onClick: () => {
          this.warnPointData = {
            current: null,
            hphm: data.hphm,
            type: "ly_close_gps",
            warn: {
              yjjd: data.yjjd,
              yjsj: data.yjsj,
              yjwd: data.yjwd,
              kkmc: data.kkmc
            },
            zfz: {
              zfzjd: data.zfzjd,
              zfzwd: data.zfzwd,
              zfzmc: data.zfzmc
            }
          }
          this.pointModalVisible = true;
        },
        onClose: () => {
          this.changeShowWarnSign(false);
        }
      });
    },
    cancelShowWarn() {
      this.pointModalVisible = false;
      this.warnPointData = {};
    },
    reload(){
      this.isRouter=false;
      this.$nextTick(function(){
        this.isRouter=true;
      })
    },
    mediaControl() {
      this.mediaPlay.pause();
    },
  }
}
</script>
<style lang="less" scoped>
@import "./assets/style/warn/modal.less";
</style>
<style lang="less" scoped>
body,html,#app{
  height: 100%;
  margin:0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
#app {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
<style>
.ant-notification{
  color: #fff;
}
.ant-notification-notice{
  background: url("./assets/images/warn/large_box.png") no-repeat;
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

.ant-spin-nested-loading{
  height: 100%;
}
.ant-spin-container{
  height: 100%;
}
</style>
