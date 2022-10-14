<template>
  <div>
    <h4>任务下发</h4>
    <hr class="line" />
    <div class="warn_item">
      <a-row>
        <a-col :span="24">
          <label>流转单位：</label>
          <template v-if="editable">
            <div style="height:400px;overflow:scroll">
                <div class="org_tree">
                  <a-tree
                    :checkStrictly="true"
                    v-model="value"
                    selectable
                    checkable
                    :treeData="orgs"
                    @check="changeOrg"
                  >
                  </a-tree>
                </div>
            </div>

            <!-- <span v-for="(orgs, i) in orgArr" v-show="orgs.length>0" :key="i">
              <div :style="{ borderBottom: '1px solid #E9E9E9'}">
                <div>
                  <a-checkbox  :checked="checkedArr[i]" @change="e=>onChange(i,e.target.checked)">
                    全选
                  </a-checkbox>
                </div>
              <a-checkbox-group
                @change="ids=>onOrgChange(ids,i)"
                :value="task.orgIds"
                :options="orgs"/>
              </div>
            </span>
           -->
          </template>
          <span v-else>
            {{orgs.filter(o=>task.orgIds.findIndex(t=>t==o.id)>-1).map(o=>o.orgName).join(",")}}
          </span>

        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <label>任务截止日期：</label>
          <a-date-picker
            v-if="editable"
            v-model="task.deadline"
            style="width: 30%; margin-top: 10px"
            />
          <span v-else>{{task.deadline | timeFilter}}</span>
        </a-col>
      </a-row>
      <a-row>
        <a-col>
          <a-col :span="24">
            <label>超时提醒时间：</label>
            <a-date-picker
              v-if="editable"
              v-model="task.remind"
              style="width: 30%; margin-top: 10px"
             />
            <span v-else>{{task.remind | timeFilter}}</span>
          </a-col>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <label>任务处置意见：</label>
          <a-input v-if="editable" v-model="task.suggest" style="width: 80%; margin-top: 10px" />
          <span v-else>{{task.suggest}}</span>
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script>
export default {
  name: "WarnTaskBasic",
  props: {
    editable: Boolean,
    task: Object,
    orgs: Array,
  },
  data(){
    return {
      value:[],
      checkedArr: [false,false,false],
    }
  },
  computed: {
    orgArr(){
      const userInfo = this.$store.state.userInfo.userInfo
      const orgOptions = this.orgs.map(o=>({label:o.orgName,value:o.id,groupNum:o.groupNum,cityCode:o.cityCode}))
      const allOrgs =  Array.from({length:3}).map((v,i)=>orgOptions.filter(o=>o.groupNum==i))
      if (!userInfo.cityCode) {
       return allOrgs 
      }
      return allOrgs.map(orgs=>orgs.filter(o=>o.cityCode&&(o.cityCode.substring(0,4)==userInfo.cityCode.substring(0,4))))
    }
  },
  filters: {
    timeFilter(value){
      if(!value) return ""
      return value.format("YYYY MM DD")
    }
  },
  methods:{
    changeOrg(i){
      this.task.orgIds=i.checked
    },
    onChange(i, checked){
      this.checkedArr[i] = checked
      const otherOrgIds = this.task.orgIds.filter(o=>this.orgArr[i].findIndex(org=>org.value==o)==-1)
      this.task.orgIds = checked?[...otherOrgIds,...this.orgArr[i].map(o=>o.value)]:[...otherOrgIds]
    },
    onOrgChange(ids, i){
      const otherOrgIds = this.task.orgIds.filter(o=>this.orgArr[i].findIndex(org=>org.value==o)==-1)
      this.task.orgIds = [...otherOrgIds,...ids]
      this.checkedArr[i] = ids.length==this.orgArr[i].length
    },
  }
};
</script>
<style lang="less" scoped>
@import "../../assets/style/warn/modal.less";
</style>
