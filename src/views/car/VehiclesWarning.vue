<template>
  <div class="car_warn">
    <div class="select_box">
      <a-select style="width:100%" v-model="special">
        <a-select-option value="0">
          全部专题
        </a-select-option>
        <a-select-option value="1">
          疲劳驾驶预警
        </a-select-option>
        <a-select-option value="2">
          异地运营预警
        </a-select-option>
        <a-select-option value="3">
          油罐车运单预警
        </a-select-option>
      </a-select>
    </div>
    <div class="warn_list">
      <a-timeline>
        
        <a-timeline-item v-for="(item,i) in warnList" :key="i">
          <div class="date">{{item.warnData}}</div>
          <div class="item_content">
            <div class="content_top">
              <a-row>
                <a-col :span="12">
                  <span class="car_num">{{item.carNum}}</span>
                </a-col>
                <a-col :span="12" style="text-align:right">
                  <span class="warn_type">{{item.warnType}}</span>
                </a-col>
              </a-row>
            </div>
            <p v-if="item.warnType=='疲劳驾驶'">{{item.warnContent}}</p>
            <p v-else>{{item.warnContent}}</p>
          </div>
        </a-timeline-item>
        
      </a-timeline>
    </div>
  </div>
</template>
<script>
import api from "./../../api/index"
export default {
  name:'VehiclesWarning',
  data() {
    return {
      special:'0',
      warnList:[]
    }
  },
  watch:{
    special(){
      console.log(this.special)
      let data = {
        op:this.special
      }
      this.$axios.post(api.getCarWarn(),data).then(res=>{
        console.log(res)
        this.warnList = res.data.data
        this.warnList.forEach(element => {
          if(element.warnType=="疲劳驾驶"){
            element.warnContent=element.carNum+"，在"+element.warnData+"驾车超过四小时，有疲劳驾驶危险"
          }
          if(element.warnType=="异地运营"){
            element.warnContent=element.carNum+"所属种类为"+element.warnContent+"，在"+element.warnData+"疑似异地运营"
          }
        });
      })
    }
  },
  mounted(){
    let data = {
        op:this.special
      }
      this.$axios.post(api.getCarWarn(),data).then(res=>{
        console.log(res)
        this.warnList = res.data.data
        this.warnList.forEach(element => {
          if(element.warnType=="疲劳驾驶"){
            element.warnContent=element.carNum+"，在"+element.warnData+"驾车超过四小时，有疲劳驾驶危险"
          }
          if(element.warnType=="异地运营"){
            element.warnContent=element.carNum+"所属种类为"+element.warnContent+"，在"+element.warnData+"疑似异地运营"
          }
        });
      })
  }
}
</script>
<style lang="less" scoped>
@import "~@/assets/style/car.less";
</style>