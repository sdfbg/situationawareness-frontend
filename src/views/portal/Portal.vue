<template>
  <div class="portal_wrap" id="page" ref="page">
    <div class="header">
      <h1><img src="@/assets/images/portal/title1.png" /></h1>
    </div>
    <div class="portal_content">
      <div class="side_box">
        <div class="chart_box" style="bottom: 0.3em;">
          <h2>交通事故</h2>
          <div class="describe">
            <span>当日：<b>{{ accidentDataSum[0] }}</b>起</span>
            <span>全年累计：<b>{{ accidentDataSum[1] }}</b>起</span><br />
            <span>同比：<a-icon type="arrow-down" class="green" /><b>{{ Math.abs(accidentDataSum[2]) + "%" }}</b></span>
          </div>
          <a-table :columns="accidentColumns" 
            :data-source="accidentData" :rowClassName="rowClassName" :pagination="false">
            <template #today="text,record,index">
              {{record.today}} {{index==0?'起':index==1 || index == 2?'人':'元'}}
            </template>
            <template #year="text,record,index">
              {{record.year}}{{index==0?'起':index==1 || index == 2?'人':'元'}}
            </template>
            <template #compared="text,record">
              <span v-if="record.compared < 0">
                <a-icon type="arrow-down" class="green" />{{Math.abs(record.compared) + "%"}}
              </span>
              <span v-else-if="record.compared > 0">
                <a-icon type="arrow-up" class="red" />{{Math.abs(record.compared) + "%"}}
              </span>
              <span v-else-if="record.compared=='0'" ><i class="blue">--</i></span>
            </template>
            </a-table>
        </div>
        <div class="chart_box" style="bottom: 1.0em">
          <h2>
            交通流量
          </h2>
          <div class="box_tab">
            <a-radio-group
              default-value="0"
              button-style="solid"
              v-model="roadType"
              @change="changeRoadFlowData(roadType)"
            > 
              <a-radio-button value="GD">国道</a-radio-button>
              <a-radio-button value="SD">省道</a-radio-button><i class="ri-vuejs-fill"></i>
              <a-radio-button value="XD">县乡道</a-radio-button>
              <a-radio-button value="GS">高速</a-radio-button>
            </a-radio-group>
          </div>
          <div class="describe mt">
            <span>昨日{{ roadType | changeRoadType }}总流量：<b>{{ Math.trunc(roadFlowData) }}</b>辆</span>
            <span>同比：<a-icon type="arrow-down" class="green" /><b>5.21%</b></span>
          </div>
          <TrafficRoadFlow :roadType="roadType" v-on:receiveRoadInfo="receiveRoadInfo"></TrafficRoadFlow>
        </div>
      </div>
      <div class="middle_part">
        <div class="middle_box">
        <div class="center">
          <div class="center_bg">
            <img src="@/assets/images/portal/center_bg.png" />
          </div>
          <div class="circle_box">
            <div
              class="circle_item"
              v-for="(item, i) in centerMenu"
              :key="i"
              :class="`circle circle${i}`"
            >
              <div
                class="center_menu"
                v-if="item.path == 'tsgz'"
                @click="toManage"
              >
                <img :src="item.img" />
              </div>

              <div
                class="center_menu"
                v-else-if="item.path == 'yjxx'"
                @click="toWarnlist"
              >
                <img :src="item.img" />
              </div>
              <div @click="() => toOther(item)" class="center_menu" v-else>
                <img :src="item.img" />
              </div>
              <p>
                <img :src="item.name" />
              </p>
            </div>
            <!-- <img src="@/assets/images/portal/m_bg2.png" class="circle circle5"/> -->
          </div>
          <!-- <div class="app_icon" @click="toDesk">
            <div class="app_img">
              <img src="../../assets/images/portal/yyzx.png" />
            </div>
          </div> -->
        </div>
      </div>
      <div class="bottom_menu">
        <div class="menu_box">
          <a-button
            class="menu_item"
            v-for="(item, i) in bottomMenu"
            @click="tochangjia(item)"
            :key="`bottom${i}`"
          >
            <p>{{ item.name }}</p>
          </a-button>
        </div>
        <div class="bottom_title">相关功能入口</div>
      </div>
      </div>
      <div class="side_box">
        <div class="chart_box posr">
          <h2>交通违法查处</h2>
          <div class="describe">
            <span>当日：<b>{{ illegalDataSum[0] }}</b>起</span>
            <span>全年累计：<b>{{ illegalDataSum[1] }}</b>起</span><br />
            <span>同比：<a-icon type="arrow-down" class="green" /><b>{{ Math.abs(illegalDataSum[2]) + "%" }}</b></span>
          </div>
          <a-table :columns="illegalColumns" 
          :data-source="illegalData" :rowClassName="rowClassName" :pagination="false" class="illegal_table" :scroll="{ y:240 }">
            <template #compared="text,record">
              <span v-if="record.compared < 0">
                <a-icon type="arrow-down" class="green" />{{Math.abs(record.compared) + "%"}}
              </span>
              <span v-if="record.compared > 0">
                <a-icon type="arrow-up" class="red" />{{Math.abs(record.compared) + "%"}}
              </span>
              <span v-if="record.compared=='0'" ><i class="blue">--</i></span>
            </template>
          </a-table>
        </div>
        <div class="chart_box posr">
          <h2>交通警情</h2>
          <div class="describe">
            <span>全省当日：<b>{{ policeData.todayPoliceCount }}</b>起</span>
            <span>全年累计：<b>{{ policeData.lastYearPoliceCount }}</b>起</span><br />
            <span>同比：<a-icon type="arrow-down" class="green" />
              <b>{{Math.abs(((policeData.toYearPoliceCount - policeData.lastYearPoliceCount) / policeData.lastYearPoliceCount).toFixed(2) * 100) + "%"}}</b>
            </span>
          </div>
          <TrafficAlert @recivePoliceData="recivePoliceData"></TrafficAlert>
        </div>
        <div>
          <a-modal
            title="应急处置"
            v-model="detailVisible"
            width="12rem"
            centered
            :maskClosable="false"
            :footer="null"
            :getContainer="() => $refs.page"
          >
            <task-flow />
          </a-modal>
        </div>
        <div class="threeRukou">
          <a-modal
            v-model="threeRukou"
            class="thmodal"
            width="10rem"
            centered
            :maskClosable="false"
            :footer="null"
            :getContainer="() => $refs.page"
          >
            <template #closeIcon>
              <img src="../../assets/images/portal/three_CLOSE.png" />
            </template>
            <div class="container_box">
              <div class="box">
                <div class="chuangkou" @click="toManageList">
                  <img src="../../assets/images/portal/three_yaosu.png" />
                </div>
                <p>要素感知</p>
              </div>
              <div class="box">
                <div class="chuangkou" @click="toLuKuang">
                  <img src="../../assets/images/portal/three_lukuang.png" />
                </div>
                <p>路况感知</p>
              </div>
              <div class="box">
                <div class="chuangkou" @click="toFengxian">
                  <img src="../../assets/images/portal/three_fengxian.png" />
                </div>
                <p>风险评估</p>
              </div>
            </div>
          </a-modal>
          <!-- <a-modal
            v-model="lianQingLianDongVisible"
            class="thmodal"
            width="10rem"
            centered
            :maskClosable="false"
            :footer="null"
            :getContainer="() => $refs.page"
          >
            <template #closeIcon>
              <img src="../../assets/images/portal/three_CLOSE.png" />
            </template>
            <div class="container_box">
              <div class="box">
                <div class="chuangkou" @click="goRiChangChuZhi">
                  <img src="../../assets/images/portal/rccz.png" />
                </div>
                <p>日常处置</p>
              </div>
              <div class="box">
                <div class="chuangkou1" @click="goZhanShiZhiHui">
                  <img src="../../assets/images/portal/zszh.png" />
                </div>
                <p>战时指挥</p>
              </div>
            </div>
          </a-modal> -->
          <a-modal
            v-model="jianduVisible"
            class="thmodal"
            width="10rem"
            centered
            :maskClosable="false"
            :footer="null"
            :getContainer="() => $refs.page"
          >
            <template #closeIcon>
              <img src="../../assets/images/portal/three_CLOSE.png" />
            </template>
            <div class="container_box">
              <div class="box">
                <div class="chuangkou" @click="toQinwu">
                  <img src="../../assets/images/portal/qwjd.png" />
                </div>
                <p>勤务管理</p>
              </div>
              <div class="box">
                <div class="chuangkou" @click="toJianduGuanLi">
                  <img src="../../assets/images/portal/jdgl.png" />
                </div>
                <p>处置监督</p>
              </div>
              <div class="box">
                <div class="chuangkou" @click="toYuan">
                  <img src="../../assets/images/portal/glyh.png" />
                </div>
                <p>预案信息</p>
              <!-- <div class="box">
                <div class="chuangkou" @click="toGonglu">
                  <img src="../../assets/images/portal/glyh.png" />
                </div>
                <p>公路隐患</p> -->
              </div>
            </div>
          </a-modal>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const centerMenu = [
  // {
  //   title: "预案信息",
  //   name: require("@/assets/images/portal/center/ya_title.png"),
  //   path: "yaxx",
  //   img: require("@/assets/images/portal/center/yaxx.png"),
  // },
  {
    title: "宣传服务",
    name: require("@/assets/images/portal/center/xc_title.png"),
    path: "xcfw",
    img: require("@/assets/images/portal/center/xcfw.png"),
  },
  {
    title: "态势感知",
    name: require("@/assets/images/portal/center/ts_title.png"),
    path: "tsgz",
    img: require("@/assets/images/portal/center/tsgz.png"),
  },
  {
    title: "风险研判",
    name: require("@/assets/images/portal/center/fxyp_title.png"),
    path: "yjxx",
    img: require("@/assets/images/portal/center/yjxx.png"),
  },
  {
    title: "指挥调度",
    name: require("@/assets/images/portal/center/zh_title.png"),
    path: "zhdd",
    img: require("@/assets/images/portal/center/zhdd.png"),
  },
  {
    title: "监督管理",
    name: require("@/assets/images/portal/center/jd_title.png"),
    path: "jdgl",
    img: require("@/assets/images/portal/center/jdgl.png"),
  },
];
const bottomMenu = [
  {
    name: "人车路企全息档案",
    path: "/yhl",
    img: require("@/assets/images/portal/yjzx.png"),
  },
  {
    name: "“减量控大”研判分析",
    path: "http://10.106.69.26:8081/chengdao/Logintest.html",
    img: require("@/assets/images/portal/czzx_icon.png"),
  },
  {
    name: "公路安全隐患排查",
    path: "http://10.106.69.26:8081/portal/#/auth?url=http%3A%2F%2F32.183.102.137%3A50087%2Fsgfx%2F%23%2Frisk%2FriskOverView",
    img: require("@/assets/images/portal/db_icon.png"),
  },

  {
    name: "道路交通安全管理责任制",
    path: "http://32.183.102.111:8081/jl_manage_platform/#/statisticsKanban",
    img: require("@/assets/images/portal/tsgz_b.png"),
  },
  // {
  //   name: "12123服务热线",
  //   path: "http://10.106.69.25:8080/TrafficSafety/publicize/home/home.html",
  //   img: require("@/assets/images/portal/tjpt.png"),
  // },
  // {
  //   name: "智慧交通",
  //   path: "",
  //   img: require("@/assets/images/portal/zhjt.png"),
  // },
];
const accidentColumns =[
  {
    title: '',
    dataIndex: 'title',
    key: 'title',
    align:'center',
    class:'title',
    ellipsis: true
  },
  {
    title: '当日',
    dataIndex: 'today',
    key: 'today',
    align:'center',
    scopedSlots: { customRender: 'today' },
  },
  {
    title: '全年累计',
    dataIndex: 'year',
    key: 'year',
    align:'center',
    scopedSlots: { customRender: 'year' },
  },
  {
    title: '同比',
    dataIndex: 'compared',
    key: 'compared',
    align:'center',
    scopedSlots: { customRender: 'compared' },
  },
]
const illegalColumns =[
  {
    title: '',
    dataIndex: 'title',
    key: 'title',
    align:'center',
    class:'title',
    width:'32%',
    ellipsis: true
  },
  {
    title: '当日',
    dataIndex: 'today',
    key: 'today',
    align:'center',
  },
  {
    title: '全年累计',
    dataIndex: 'year',
    key: 'year',
    align:'center',
    width: "25%"
  },
  {
    title: '同比',
    dataIndex: 'compared',
    key: 'compared',
    align:'center',
    scopedSlots: { customRender: 'compared' },
  },
]
import api from "./../../api/index";
import TaskFlow from "../disposal/TaskFlow.vue";
import TrafficRoadFlow from "./chart/TrafficRoadFlow.vue";
import TrafficAlert from "./chart/TrafficAlert.vue";
import { mapMutations } from "vuex";
export default {
  name: "Portal",
  data() {
    return {
      centerMenu,
      bottomMenu,
      warn: {},
      detailVisible: false,
      current: -1,
      steps: [
        {
          title: "交安办下发",
        },
        {
          title: "相关单位任务接收",
        },
        {
          title: "处置进展跟踪",
        },
        {
          title: "交安委审核",
        },
        {
          title: "任务完结反馈",
        },
        {
          title: "交安委审核",
        },
        {
          title: "归档",
        },
      ],
      sendForm: {
        date1: undefined,
        date2: undefined,
        date3: undefined,
        desc: "",
        object: "1",
        unit: undefined,
      },
      task: {},
      zuoShangType: "0",
      roadType: "GD",
      threeRukou: false,
      jianduVisible: false,
      accidentColumns,
      accidentData: [],
      accidentDataSum: [],
      illegalColumns,
      illegalData: [],
      illegalDataSum: [],
      rowClassName: (record, index) => {
        if (index % 2 === 0) {
          return "dark_row";
        } else {
          return "light_row";
        }
      },
      accidentCount: {},
      policeData: {},
      roadFlow: {
        GD: 0, SD: 0, XD: 0, GS: 0,
      },
      roadFlowData: 0,
      lianQingLianDongVisible: false
    };
  },
  components: {
    TaskFlow,
    TrafficRoadFlow,
    TrafficAlert
  },
  mounted() {
    this.getHomeAccidentCount();
    this.getHomeIllegalCount();
  },
  filters: {
    changeRoadType(value) {
      if (value == "GD") {
        return "国道";
      }
      if (value == "SD") {
        return "省道";
      }
      if (value == "XD") {
        return "县乡道";
      }
      if (value == "GS") {
        return "高速";
      }
    },
  },
  methods: {
    ...mapMutations("dispoal", ["setTask", "setWarnStatus"]),
    //交通警情数据
    recivePoliceData(data) {
      this.policeData = data;
    },
    //交通流量数据
    receiveRoadInfo(data) {
      for (const prop in data) {
        data[prop].forEach(d => {
          this.roadFlow[prop] = this.roadFlow[prop] + d.avgFlow;
        });
      }
      this.roadFlowData = this.roadFlow.GD;
    },
    changeRoadFlowData(type) {
      this.roadFlowData = this.roadFlow[type];
    },
    //交通事故
    getHomeAccidentCount() {
      this.$axios.post(api.getHomeAccidentCount()).then((res) => {
        let data = res.data;
        this.accidentData.push(
          {title: '亡人事故', today: data.dr_swsgs,  year: data.jn_swsgs,  compared: data.tb_swsgs_bj == "下降" ? -data.tb_swsgs : data.tb_swsgs},
          {title: '死亡人数', today: data.dr_swrs,  year: data.jn_swrs,  compared: data.tb_swrs_bj == "下降" ? -data.tb_swrs : data.tb_swrs},
          {title: '受伤人数', today: data.dr_ssrs,  year: data.jn_ssrs,  compared: data.tb_ssrs_bj == "下降" ? -data.tb_ssrs : data.tb_ssrs},
          {title: '财产损失', today: data.dr_zjccss,  year: data.jn_zjccss,  compared: data.tb_zjccss_bj == "下降" ? -data.tb_zjccss : data.tb_zjccss},
        );
        this.accidentDataSum.push(data.dr_sgs, data.jn_sgs, data.tb_sgs_bj == "下降" ? -data.tb_sgs : data.tb_sgs)
      })
    },
    //交通违法
    getHomeIllegalCount() {
      this.$axios.post(api.getHomeIllegalCount()).then((res) => {
        let data = res.data;
        this.illegalData.push(
          {title: '醉酒驾驶', today: data.dr_zjjs_wfs,  year: data.zjjs_qnlj,  compared: data.zjjs_tbbj == "下降" ? -data.zjjs_tb : data.zjjs_tb},
          {title: '饮酒驾驶', today: data.dr_yjjs_wfs,  year: data.yjjs_qnlj,  compared: data.yjjs_tbbj == "下降" ? -data.yjjs_tb : data.yjjs_tb},
          {title: '未挂、遮挡、无损、不按规定安装号牌', today: data.dr_zdhp_wfs,  year: data.zdhp_qnlj,  compared: data.zdhp_tbbj == "下降" ? -data.zdhp_tb : data.zdhp_tb},
          {title: '(使用)伪造变造号牌', today: data.dr_wzbz_wfs,  year: data.wzhp_qnlj,  compared: data.wzbz_tbbj == "下降" ? -data.wzbz_tb : data.wzbz_tb},
          {title: '未戴头盔', today: data.dr_wdtk_wfs,  year: data.wdtk_qnlj,  compared: data.wdtk_tbbj == "下降" ? -data.wdtk_tb : data.wdtk_tb},
          {title: '驾驶拼装报废机动车', today: data.dr_jspz_wfs,  year: data.jspz_qnlj,  compared: data.jspz_tbbj == "下降" ? -data.jspz_tb : data.jspz_tb},
          {title: '无效驾驶资格', today: data.dr_wxjs_wfs,  year: data.wxjs_qnlj,  compared: data.wxjs_tbbj == "下降" ? -data.wxjs_tb : data.wxjs_tb},
          {title: '超员', today: data.dr_cy_wfs,  year: data.cy_qnlj,  compared: data.cy_tbbj == "下降" ? -data.cy_tb : data.cy_tb},
          {title: '超载', today: data.dr_cz_wfs,  year: data.cz_qnlj,  compared: data.cz_tbbj == "下降" ? -data.cz_tb : data.cz_tb},
        );
        this.illegalDataSum.push(data.dr_wfs, data.wf_qnlj, data.tbbj == "下降" ? -data.tb : data.tb);
      })
    },
    toDesk() {
      let route = this.$router.resolve({
        path: "/desktop",
      });
      window.open(route.href, "_blank");
    },
    toManage() {
      this.threeRukou = true;
    },
    toJiandu() {
      this.jianduVisible = true;
    },
    toZhihui() {
      window.open("JocPlatform://");
    },
    toWarnlist() {
      let route = this.$router.resolve({
        path: "/desktop",
      });
      window.open(route.href, "_blank");
      // let routeObject = this.$router.resolve({
      //   path: "/page",
      // });
      // window.open(routeObject.href, "_blank");
    },
    // tochangjia1() {
    //   window.open("http://10.106.69.87:8080/bayonet/index.html");
    // },
    tochangjia(item) {
      //if (item.name != "12123服务热线") {
      window.open(item.path);
      //}
    },
    toPubliciseService() {
      window.open(
        "http://10.106.55.7:8080/PublicitySystem/publicize/home/home.html"
      );
    },
    tochangjia2() {
      window.open("http://10.106.69.26:8081/chengdao/Logintest.html");
    },
    tochangjia3() {
      window.open("http://32.183.103.211:8080/EHL_CAS/portal/v2/atms.jsp");
    },
    tochangjia4() {
      window.open(
        "http://32.183.102.132:9903/#/auth/login?redirect=%2Fdashboard"
      );
    },
    toLuKuang() {
      window.open("http://10.106.69.87:8080/bayonet/index.html");
    },
    toManageList() {
      let routeObject = this.$router.resolve({
        path: "/person",
      });
      window.open(routeObject.href, "_blank");
    },
    toFengxian() {
      window.open("http://10.106.69.26:8081/baicheng/index.html");
    },
    toYuan() {
      window.open("http://10.106.55.7:8989/JocPlatform?apiCode=JAW001&account=admin");
    },
    toOther(item) {
      if (item.path == "jdgl") {
        this.toJiandu();
      } else if (item.path == "zhdd") {
        this.goRiChangChuZhi();
      } else if (item.path == "xcfw") {
        this.toPubliciseService();
      }
    },
    //  <div class="chuangkou" @click="toQinwu">
    //    <img src="../../assets/images/portal/qwjd.png"/>
    //    <p>勤务监督</p>
    //  </div>
    //  <div class="chuangkou" @click="toJianduGuanLi">
    //    <img src="../../assets/images/portal/jdgl.png"/>
    //    <p>监督管理</p>
    //  </div>
    //  <div class="chuangkou"  @click="toGonglu">
    //   <img src="../../assets/images/portal/glyh.png"/>
    //    <p>公路隐患</p>
    toQinwu() {
      window.open(
        "http://32.183.102.111:8081/jl_manage_platform/#/statisticsKanban"
      );
    },
    toJianduGuanLi() {
      window.open(
        "http://10.106.55.7:8989/SupervisionGuarantee/publicize/home/home.html"
      );
    },
    toGonglu() {
      window.open(
        "http://10.106.69.26:8081/portal/#/auth?url=http%3A%2F%2F32.183.102.137%3A50087%2Fsgfx%2F%23%2Frisk%2FriskOverView"
      );
    },
    warnDetail(warn) {
      const dbTypes = [
        {
          id: 1,
          modelTable: "illegal_operation_res",
          modelName: "非法运营车辆预警",
          modelId: "m10001",
          modelType: 1,
          createTime: "2022-06-04 11:18:47",
          dataSourceType: "mysql",
        },
        {
          id: 5,
          modelTable: "ly_zdclyjcl",
          modelName: "油罐车运单预警",
          modelId: "m10005",
          modelType: 1,
          createTime: "2022-06-04 11:21:23",
          dataSourceType: "psql",
        },
        {
          id: 4,
          modelTable: "ly_zdclydyy",
          modelName: "疑似异地运营",
          modelId: "m10004",
          modelType: 1,
          createTime: "2022-06-04 11:21:21",
          dataSourceType: "psql",
        },
        {
          id: 3,
          modelTable: "ly_jxrywfjsgxx",
          modelName: "驾校重点人预警",
          modelId: "m10003",
          modelType: 1,
          createTime: "2022-06-04 11:21:18",
          dataSourceType: "psql",
        },
        {
          id: 6,
          modelTable: "yhl_pljsyj",
          modelName: "疲劳驾驶预警",
          modelId: "m10006",
          modelType: 1,
          createTime: "2022-06-07 08:51:24",
          dataSourceType: "psql",
        },
        {
          id: 7,
          modelTable: "ly_gps",
          modelName: "GPS非法关闭预警",
          modelId: "m10007",
          modelType: 1,
          createTime: "2022-06-07 08:52:29",
          dataSourceType: "psql",
        },
        {
          id: 2,
          modelTable: "ly_jttzdcldb",
          modelName: "登记使用性质预警",
          modelId: "m10002",
          modelType: 1,
          createTime: "2022-06-04 11:21:14",
          dataSourceType: "psql",
        },
      ];
      const dataSourceType = dbTypes.find(
        (d) => d.modelTable == warn.tableName
      ).dataSourceType;
      this.$axios
        .get(api.warnDetails(), {
          params: {
            yjId: warn.id,
            tableName: warn.tableName,
            dataSourceType: dataSourceType,
          },
        })
        .then((res) => {
          this.detailVisible = true;
          this.setWarnStatus(0);
          this.setTask({
            orgId: [],
            orgId0: [],
            orgId1: [],
            orgId2: [],
            status: -2,
            warnContent: res.data.yjxx,
            source: res.data.yjly,
            level: res.data.yjjb,
            time: res.data.yjsj,
            taskType: 0,
          });
        });
    },
    goRiChangChuZhi(){
      let route = this.$router.resolve({
        path: "/warnList"
      });
      window.open(route.href, "_blank");
    },
    goZhanShiZhiHui(){
      window.open("JocPlatform://");
    }
  },
};
</script>
<style lang="less" scoped>
@import "../../assets/style/portal.less";
@import "../../assets/style/warn/modal.less";

.center_bg {
  position: absolute;
  left: 50%;
  top: 2%;
  // animation: fadenum 100s infinite linear;
  transform-origin: 555px 484px;
  margin-left: -5.34rem;
  margin-top: -1.55rem;
  z-index: 0
}
.circle_box {
  width: 6.8rem;
  height: 6.8rem;
  margin: 0 auto;
  top: 6%;
  left: 0;
  // background: url("../../assets/images/portal/circle_bg.png") no-repeat;
  // background-size: 100% 100%;
  position: relative;
  padding: 1rem;
}
/* /deep/.ant-modal-body {
      padding: 24px;
      padding-top: 130px;
      font-size: 14px;
      line-height: 2;
      word-wrap: break-word;
  } */
.circle {
  position: absolute;
  transform-origin: 2rem 2rem;
  cursor: pointer;
  /* animation: twinkling 2s infinite ease-in-out  */
}

@keyframes fadenum {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
h2 {
  text-align: left;
}
</style>
