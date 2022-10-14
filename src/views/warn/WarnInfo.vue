<template>
  <div class="car_warn">
    <div class="warn_list road_warn">
      <a-timeline>
        <a-timeline-item v-for="(item,i) in filledWarns" :key="i">
          <div class="warn_date">{{item.date}}</div>
          <div class="item_content">
            <div class="content_top">
              <a-row>
                <a-col :span="12">
                  <div class="warn_level">
                    <span
                      v-bind:class="{
                        red:item.warnLevel==0,
                        orange:item.warnLevel==1,
                        yellow:item.warnLevel==2,
                        green:item.warnLevel==3,
                      }">
                      <a-icon type="warning"/>
                      {{warnLabels[item.warnLevel]}}
                    </span>
                  </div>
                </a-col>
                <a-col :span="12" style="text-align:right">
                  <span class="warn_type">{{item.type}}</span>
                </a-col>
              </a-row>
            </div>
            <p>{{item.content}}</p>
            <a-row class="content_bottom"> 
              <a-col span="18">
                <div  class="unit"><a-icon type="home" theme="filled" />{{item.placeDesc}}</div>
              </a-col>
              <a-col span="6" style="text-align:right">
                <a-button @click="()=>getWarnDetail(item)" class="deal_btn">日常处置</a-button>
                <a-button @click="()=>emengency(item)" class="deal_btn">应急处置</a-button>
              </a-col>
            </a-row>
            
          </div>
        </a-timeline-item>
        
      </a-timeline>
    </div>
  </div>
</template>
<script>
import api from "./../../api/index";
import { mapState,mapActions } from "vuex";
import { plateMappers } from "@/utils/codeMappers.js";
export default {
  name:'WarnInfo',
  data() {
    return {
      warns:[],
      warnColors:["red","orange","yellow","green"],
      warnLabels:["红色预警","橙色预警","黄色预警","绿色预警"]
    }
  },
  computed: {
    ...mapState("constants",["warnModels"]),
    filledWarns(){
      return this.warns.map(warn=>{
        let {tableName} = warn
        const warnModel = this.warnModels.find(w=>w.modelTable==tableName)
        const type = warnModel?warnModel.modelName:""
        return {...warn, type}
      })
    }
  },
  created(){
    // this.fetchWarnModels()
    this.$axios.post(api.getDaibanWarnning()).then((res) => {
      this.warns = res.data.map(warn=>{
        const {plate} = warn;
        const placeDesc = plateMappers(plate?plate.charAt(0)+plate.charAt(1):"")
        return {...warn,placeDesc}
      });
    });
  },
  methods: {
    // ...mapActions("constants",["fetchWarnModels"]),
    ...mapActions("dispoal",["fetchWarnDetail"]),
    getWarnDetail(warn){
      const currentModel = this.warnModels.find(m=>m.modelTable==warn.tableName)
      this.fetchWarnDetail({
        id: warn.id,
        tableName: currentModel.modelTable,
        dataSourceType: currentModel.dataSourceType,
      })
    },
    emengency(warn){
      const currentModel = this.warnModels.find(m=>m.modelTable==warn.tableName)
      this.$axios.get(api.warnDetails(),{
        params: {
          yjId: warn.id,
          tableName: warn.tableName,
          dataSourceType: currentModel.dataSourceType,
        }
      }).then(res=>{
        window.open("JocPlatform://");
        setTimeout(() => {
          this.$axios.post(api.emergency(),{
            warnId:`${warn.id},${currentModel.modelTable},${currentModel.dataSourceType}`,
            warnType: currentModel.modelName,
            warnContent: warn.content,
            source: res.data.yjly,
            level:res.data.yjjb,
            time:res.data.yjsj,
          }).then(res=>{
            if (res.data.code==1) {
              this.$message.success("成功")
            }
          })
        }, 10000);
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import "~@/assets/style/warn/warn_page.less";
</style>