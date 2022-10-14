<template>
 <div class="home_wrap home_other" id="page">
    <Header></Header>
    <LeftMenu></LeftMenu>
    <div class="content_other">
      <div class="crumbs_nav">
          当前位置：
          <a-breadcrumb>
            <a-breadcrumb-item>预警列表</a-breadcrumb-item>
          </a-breadcrumb>
      </div>
      <div class="search_container">
        <a-form-model layout="inline" :model="form">
            <a-form-model-item label="车牌号码">
              <a-input v-model="form.cphm" placeholder="请输入车牌号码" />
            </a-form-model-item>
            <a-form-model-item label="车辆类型">
              <a-select v-model="form.cllx" placeholder="请选择车辆类型">
                <a-select-option value="1">
                  小型汽车
                </a-select-option>
                <a-select-option value="2">
                  货车
                </a-select-option>
              </a-select>
            </a-form-model-item>
            <a-form-model-item >
              <a-button  class="search_btn">
                查询
              </a-button>
              <a-button  class="reset_btn">
                重置
              </a-button>
            
            </a-form-model-item>
        </a-form-model>
      </div>
      <div class="list_container">
          <a-list  :grid="{ gutter: 32, xs: 1, sm: 2, md: 4, lg: 4, xl: 4, xxl: 4 }" :data-source="listData"  :pagination="pagination" >
            <a-list-item slot="renderItem" slot-scope="item" style="cursor: none">
              <div class="list_item">
              
                  <a-row span="24">
                    <a-col>
                      <span class="name">{{item.cphm}}</span>
                      <span class="level">{{item.dj}}</span>
                      <span class="tag" v-for="(tag,i) in item.ztflList" :key="`tag${i}`">{{tag}}</span>
                    </a-col>
                  </a-row>
                  <a-row>
                    <p>
                      <a-col span='12'><label>车辆类型：</label>{{item.cllx}}</a-col>
                      <a-col span='12'><label>车身颜色：</label>{{item.csys}}</a-col>
                    </p>
                  </a-row>
                  <a-row>
                      <p>
                      <a-col span='12'><label>车主证姓名：</label>{{item.czxm
                      }}</a-col>
                    
                      </p>
                  </a-row>
                  <a-row>
                    <p>
                      <a-col span='24'><label>车主证件号：</label>{{item.sfzhm
                      }}</a-col>
                    </p>
                  </a-row>
                  <a-row>
                    <p>
                      <a-col span='24'><label>预警时间：</label>{{item.yjsj}}</a-col>
                    </p>
                  </a-row>
                  <a-row>
                    <p>
                      <a-col span='24' class="xian_style" :title="item.ffdd"><label>预警地点：</label>{{item.yjdd}}</a-col>
                    </p>
                  </a-row>
                  <a-row>
                    <p>
                      <a-col span='24'>
                        <span class="plus_item">
                          <label>预警原因：{{item.yjyy}}</label>
                        </span>
                      </a-col>
                    </p>
                  </a-row>
              </div>
            </a-list-item>
          </a-list>
        </div>
    </div>
 </div>
</template>
<script>
const listData = [
  {
    yjyy:'测试',
    cphm:'吉A12345',
    dj:'2',
    ztflList:['治安'],
    cllx:'小型汽车',
    csys:'黑',
    czxm:'张三',
    sfzhm:'210108198807096543',
    yjsj:'的骄傲好的',
    yjdd:'吉林市XXXX',
  },
  {
    yjyy:'测试',
    cphm:'吉A12345',
    dj:'2',
    ztflList:['治安'],
    cllx:'小型汽车',
    csys:'黑',
    czxm:'张三',
    sfzhm:'210108198807096543',
    yjsj:'的骄傲好的',
    yjdd:'吉林市XXXX',
  },
  {
    yjyy:'测试',
    cphm:'吉A12345',
    dj:'2',
    ztflList:['治安'],
    cllx:'小型汽车',
    csys:'黑',
    czxm:'张三',
    sfzhm:'210108198807096543',
    yjsj:'的骄傲好的',
    yjdd:'吉林市XXXX',
  },
  {
    yjyy:'测试',
    cphm:'吉A12345',
    dj:'2',
    ztflList:['治安'],
    cllx:'小型汽车',
    csys:'黑',
    czxm:'张三',
    sfzhm:'210108198807096543',
    yjsj:'的骄傲好的',
    yjdd:'吉林市XXXX',
  },
  {
    yjyy:'测试',
    cphm:'吉A12345',
    dj:'2',
    ztflList:['治安'],
    cllx:'小型汽车',
    csys:'黑',
    czxm:'张三',
    sfzhm:'210108198807096543',
    yjsj:'的骄傲好的',
    yjdd:'吉林市XXXX',
  },
  {
    yjyy:'测试',
    cphm:'吉A12345',
    dj:'2',
    ztflList:['治安'],
    cllx:'小型汽车',
    csys:'黑',
    czxm:'张三',
    sfzhm:'210108198807096543',
    yjsj:'的骄傲好的',
    yjdd:'吉林市XXXX',
  },
  {
    yjyy:'测试',
    cphm:'吉A12345',
    dj:'2',
    ztflList:['治安'],
    cllx:'小型汽车',
    csys:'黑',
    czxm:'张三',
    sfzhm:'210108198807096543',
    yjsj:'的骄傲好的',
    yjdd:'吉林市XXXX',
  },
  {
    yjyy:'测试',
    cphm:'吉A12345',
    dj:'2',
    ztflList:['治安'],
    cllx:'小型汽车',
    csys:'黑',
    czxm:'张三',
    sfzhm:'210108198807096543',
    yjsj:'的骄傲好的',
    yjdd:'吉林市XXXX',
  },
  {
    yjyy:'测试',
    cphm:'吉A12345',
    dj:'2',
    ztflList:['治安'],
    cllx:'小型汽车',
    csys:'黑',
    czxm:'张三',
    sfzhm:'210108198807096543',
    yjsj:'的骄傲好的',
    yjdd:'吉林市XXXX',
  },
  {
    yjyy:'测试',
    cphm:'吉A12345',
    dj:'2',
    ztflList:['治安'],
    cllx:'小型汽车',
    csys:'黑',
    czxm:'张三',
    sfzhm:'210108198807096543',
    yjsj:'的骄傲好的',
    yjdd:'吉林市XXXX',
  },
  {
    yjyy:'测试',
    cphm:'吉A12345',
    dj:'2',
    ztflList:['治安'],
    cllx:'小型汽车',
    csys:'黑',
    czxm:'张三',
    sfzhm:'210108198807096543',
    yjsj:'的骄傲好的',
    yjdd:'吉林市XXXX',
  },
  {
    yjyy:'测试',
    cphm:'吉A12345',
    dj:'2',
    ztflList:['治安'],
    cllx:'小型汽车',
    csys:'黑',
    czxm:'张三',
    sfzhm:'210108198807096543',
    yjsj:'的骄傲好的',
    yjdd:'吉林市XXXX',
  },
  {
    yjyy:'测试',
    cphm:'吉A12345',
    dj:'2',
    ztflList:['治安'],
    cllx:'小型汽车',
    csys:'黑',
    czxm:'张三',
    sfzhm:'210108198807096543',
    yjsj:'的骄傲好的',
    yjdd:'吉林市XXXX',
  },
  {
    yjyy:'测试',
    cphm:'吉A12345',
    dj:'2',
    ztflList:['治安'],
    cllx:'小型汽车',
    csys:'黑',
    czxm:'张三',
    sfzhm:'210108198807096543',
    yjsj:'的骄傲好的',
    yjdd:'吉林市XXXX',
  },
  {
    yjyy:'测试',
    cphm:'吉A12345',
    dj:'2',
    ztflList:['治安'],
    cllx:'小型汽车',
    csys:'黑',
    czxm:'张三',
    sfzhm:'210108198807096543',
    yjsj:'的骄傲好的',
    yjdd:'吉林市XXXX',
  },
  {
    yjyy:'测试',
    cphm:'吉A12345',
    dj:'2',
    ztflList:['治安'],
    cllx:'小型汽车',
    csys:'黑',
    czxm:'张三',
    sfzhm:'210108198807096543',
    yjsj:'的骄傲好的',
    yjdd:'吉林市XXXX',
  },
  {
    yjyy:'测试',
    cphm:'吉A12345',
    dj:'2',
    ztflList:['治安'],
    cllx:'小型汽车',
    csys:'黑',
    czxm:'张三',
    sfzhm:'210108198807096543',
    yjsj:'的骄傲好的',
    yjdd:'吉林市XXXX',
  },
  {
    yjyy:'测试',
    cphm:'吉A12345',
    dj:'2',
    ztflList:['治安'],
    cllx:'小型汽车',
    csys:'黑',
    czxm:'张三',
    sfzhm:'210108198807096543',
    yjsj:'的骄傲好的',
    yjdd:'吉林市XXXX',
  },
  {
    yjyy:'测试',
    cphm:'吉A12345',
    dj:'2',
    ztflList:['治安'],
    cllx:'小型汽车',
    csys:'黑',
    czxm:'张三',
    sfzhm:'210108198807096543',
    yjsj:'的骄傲好的',
    yjdd:'吉林市XXXX',
  },
  {
    yjyy:'测试',
    cphm:'吉A12345',
    dj:'2',
    ztflList:['治安'],
    cllx:'小型汽车',
    csys:'黑',
    czxm:'张三',
    sfzhm:'210108198807096543',
    yjsj:'的骄傲好的',
    yjdd:'吉林市XXXX',
  },
]
import LeftMenu from "./LeftMenu";
import Header from './Header.vue';
import moment from "moment";
export default {
  name:'Warn',
  data(){
    return{
      form:{
        cphm:'',
        cllx:undefined
      },
      listData,
       pagination:{
         pageSize: 8,
         showQuickJumper:true,
         showTotal:total => `总共 ${total} 条记录`,
         onChange:(pageNum)=>{
           this.pageNum = pageNum;
         }
      },
       now : moment().format('YYYY-MM-DD HH:mm:ss'),
    }
  },
  components:{
    LeftMenu,
    Header
  },
  mounted(){
    setInterval(() => {
      this.now = moment().format('YYYY-MM-DD HH:mm:ss')
    }, 1000);
  }
}
</script>
<style lang="less" scoped>
@import "../../assets/style/warn/home.less";
@import "../../assets/style/warn/warn.less";
</style>