<template>
  <div>
    <h1>认证中，请稍后</h1>
  </div>
</template>
<script>
import api from "@/api"
import {getToken} from '@/api/store.js'
export default {
  created(){
    let targetUrl = this.$route.query.url
    let token = getToken()
    // TODO 暂时用这个判断登录状态
    this.$axios.get(api.userApps()).then(()=>{
      targetUrl = decodeURIComponent(targetUrl)
      if(targetUrl.indexOf("?")==-1){
        this.$window.open(`${targetUrl}?token=${token}`,"_self")
      }else{
        this.$window.open(`${targetUrl}&token=${token}`,"_self")
      }

    })
  },
  methods: {
    async isPermitted(targetUrl){
      let urls = await this.$axios.get(api.userAppUrls()).then(res=>res.data)
      return urls.indexOf(targetUrl)>-1
    },
    goHome(){
      this.$router.push("/desktop")
    }
  }
}
</script>
