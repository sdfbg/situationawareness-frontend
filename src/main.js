import Vue from 'vue'
import App from './LocalApp.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import $axios from "./utils/configured-axios";
// import HevueImgPreview from "hevue-img-preview";
// Vue.use(HevueImgPreview);
Vue.use(VueAwesomeSwiper /* { default options with global component } */)
Vue.config.productionTip = false
Vue.use(Antd)
Vue.config.productionTip = false
import * as echarts from "echarts";
import "echarts-gl";
Vue.prototype.$echarts = echarts;
Vue.prototype.$window = window
import scroll from "vue-seamless-scroll";
Vue.use(scroll);
Vue.prototype.$axios = $axios;
let app = new Vue({
  router,
  store,
  render: h => h(App),
});
app.$mount('#app');
$axios.handleError= response => {
  app.$notification.error({
    message: "错误提示",
    description: response.data.msg
  })
}
Vue.prototype.$notification = new Proxy(Vue.prototype.$notification, {
  currentNotifyKey: 0,
  totalNotifyLoopCount: 5,
  get: function(target, key){
    if(key=="error"||key=="success"||key=="info"||key=="warning"||key=="warn"){
      target.close(this.currentNotifyKey.toString())
      let that=this
      return function(options){
        if(!options.key){
          that.currentNotifyKey++
          if(that.currentNotifyKey>=that.totalNotifyLoopCount) that.currentNotifyKey=that.currentNotifyKey-that.totalNotifyLoopCount
          options.key = that.currentNotifyKey.toString()
        }
        options.type=key
        options.duration=4.5
        return target.open(options)
      }
    }else{
      return target[key]
    }
  }
})
