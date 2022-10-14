<template>
  <a-config-provider :locale="locale" :getPopupContainer="getPopupContainer">
    <App />
  </a-config-provider>
</template>
<script>
import App from "@/App.vue"
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
export default {
  data() {
    return {
      locale: zhCN
    }
  },
  provide: {
    echartsLoadingOptions:{
      text: "正在加载...",
      textColor: "#fff",
      color: "#fff",
      maskColor: "transparent",
      X: "center",
      y: "center",
      effect: "spin"
    }
  },
  components:{App},
  methods: {
    getPopupContainer(el, dialogContext) {
      if (dialogContext) {
        return dialogContext.getDialogWrap();
      } else {
        return document.body;
      }
    },
  },
};
</script>
