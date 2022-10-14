<template>
  <div class="classification_box" ref="page">
    <!-- <div class="dept_warn">
      <h2>
        <img src="@/assets/images/warn/tongji_icon.png" />
        <span>预警部门统计</span>
      </h2>
      <div class="dept_list">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item, i) in swiperDeptStat" :key="`item${i}`">
            <div
              :class="{
                dept_item: true,
                current: d.id != currentOrg,
                not_current: d.id == currentOrg,
              }"
              @click="() => onOrgClick(d)"
              v-for="(d, j) in item"
              :key="`d${j}`"
            >
              <div class="left_icon">
                <img src="../../assets/images/warn/icon.png" />
              </div>
              <div class="right_info">
                <label>{{ d.orgName }}</label>
                <p>{{ d.sum }}<i>条</i></p>
              </div>
            </div>
          </swiper-slide> -->
          <!-- 分页器 -->
          <!-- <div class="swiper-pagination" slot="pagination"></div> -->
          <!-- 前进后退按钮 -->
          <!-- <img
            src="../../assets/images/warn/right.png"
            class="swiper-next"
            slot="pagination"
          />
          <img
            src="../../assets/images/warn/left.png"
            class="swiper-prev"
            slot="pagination"
          />
        </swiper>
      </div>
    </div> -->
    <div class="classification_bottom">
      <div class="chart_container">
        <h2>
          <a-row>
            <a-col :span="16">
              <img src="@/assets/images/warn/tongji_icon.png" />
              <span>预警类别统计 </span>
              <a-icon
                v-if="warnClass=='0'"
                class="question_icon"
                type="question-circle"
                @click="hanldeIconClick"
              />
            </a-col>
            <a-col :span="8">
              <div class="warnClass_list_search">
                <a-form-model layout="inline">
                  <a-form-model-item>
                    <a-select v-model="warnClass" @change="changeWarnType" placeholder="请选择...">
                      <a-select-option value="0"> 日常处置 </a-select-option>
                      <a-select-option value="1"> 战时处置 </a-select-option>
                    </a-select>
                  </a-form-model-item>
                </a-form-model>
              </div>
            </a-col>
          </a-row>
        </h2>
        <div id="warnType" ref="warnType" style="height:calc(100% - .8rem)"></div>
        <!-- <v-chart
          :option="option"
          ref="chart"
          style="height: calc(100% - 0.45rem)"
          :autoresize="true"
          :loading-options="echartsLoadingOptions"
          @zr:click="onWarnTypeClick"
        /> -->
      </div>
      <div class="warn_list">
        <h2>
          <img src="@/assets/images/warn/liebiao.png" />
          <span>预警列表 ></span>
          <span style="color: yellow">{{ warnModelName }}</span>
        </h2>
        <div class="list_search">
          <a-form-model layout="inline">
            <a-form-model-item label="预警级别">
              <a-select v-model="searchInfo.warnLevel" placeholder="请选择...">
                <a-select-option value="1"> 红色预警 </a-select-option>
                <a-select-option value="2"> 橙色预警 </a-select-option>
                <a-select-option value="3"> 黄色预警 </a-select-option>
                <a-select-option value="4"> 绿色预警 </a-select-option>
              </a-select>
            </a-form-model-item>
            <a-form-model-item label="预警时间">
              <a-range-picker
                v-model="searchInfo.duration"
                :show-time="{ format: 'HH:mm' }"
                format="YYYY-MM-DD HH:mm"
                :placeholder="['开始时间', '结束时间']"
              />
            </a-form-model-item>
            <a-form-model-item>
              <a-button class="reset_btn" @click="reset">重置</a-button>
              <a-button html-type="submit" class="search_btn" @click="search"
                >查询</a-button
              >
            </a-form-model-item>
          </a-form-model>
        </div>
        <a-list
          :grid="{ gutter: 16, column: 3 }"
          :data-source="listData"
          :pagination="pagination"
          :loading="warnLoading"
        >
          <a-list-item slot="renderItem" slot-scope="item, index">
            <a-card>
              <div class="warn_item">
                <div
                  :class="
                    item.level == '1'
                      ? 'warn_level red'
                      : item.level == '2'
                      ? 'warn_level orange'
                      : item.level == '3'
                      ? 'warn_level yellow'
                      : 'warn_level green'
                  "
                >
                  <label>{{ (pagination.current - 1) * 9 + index + 1 }}</label>
                  <a-icon type="warning" />
                  <span>{{
                    item.level == "1"
                      ? "红色预警"
                      : item.level == "2"
                      ? "橙色预警"
                      : item.level == "3"
                      ? "黄色预警"
                      : "绿色预警"
                  }}</span>
                  <div class="date">{{ item.warnDate }}</div>
                </div>
                <div class="warn_info" @click="showWarnPoint(true, item)">
                  <p>预警状态：{{ item.dealStatus | statusFilter }}</p>
                  <p :title="item.content">{{ item.content }}</p>
                </div>
                <div class="warn_btns">
                  <a-button disabled>任务追加</a-button>
                  <a-button disabled>情报追加</a-button>
                  <a-button class="deal_btn" @click="showWarnDetail(true, item)">预警详情</a-button>
                  <a-button
                    v-if="currentWarnType.warnType == 0"
                    class="deal_btn"
                    @click="()=> getWarnDetail(item)"
                    >日常处置</a-button
                  >
                  <a-button
                    v-else
                    class="deal_btn"
                    @click="() => emengency(item)"
                    >应急处置
                  </a-button>
                </div>
              </div>
            </a-card>
          </a-list-item>
        </a-list>
      </div>
    </div>
    <!-- 任务处置弹窗 -->
    <a-modal
      title="任务处置"
      :visible="modalVisible"
      @cancel="() => setModalVisible(false)"
      centered
      :maskClosable="false"
      :getContainer="() => $refs.page"
      width="11.5rem"
      :footer="null"
    >
      <task-flow/>
    </a-modal>
    <!-- 预警详情弹窗 -->
    <a-modal
      v-model="detailVisible"
      @cancel="() => detailVisible = false"
      width="6rem"
      :maskClosable="false"
      :footer="null"
      class="explain_modal"
      :getContainer="() => $refs.page"
    >
      <div class="modal_container">
        <p style="color: #0ff">预警时间：{{ warnDetail.warnDate }}</p>
        <p style="color: #0ff">预警状态：{{ warnDetail.dealStatus | statusFilter }}</p>
        <p style="color: #0ff">预警内容：{{ warnDetail.content }}</p>
        <!-- <template v-if="['ly_jz_yj'].indexOf(warnDetail.tableName)>-1">
          <p style="color: #0ff">号牌颜色：{{ warnDetail.hpys }}</p>
          <p style="color: #0ff">车辆型号：{{ warnDetail.clxh }}</p>
          <p style="color: #0ff">车辆品牌：{{ warnDetail.clpp }}</p>
          <p style="color: #0ff">是否拦截：{{ warnDetail.sflj==1?"是":"否" }}</p>
          <p style="color: #0ff">反馈时间：{{ warnDetail.fksj }}</p>
        </template> -->
        <template v-if="['ly_sd_yj','ly_st_yj','ly_sw_yj','ly_jz_yj'].indexOf(warnDetail.tableName)>-1">
          <p style="color: #0ff">姓名：{{ warnDetail.xm }}</p>
          <p style="color: #0ff">身份证号：{{ warnDetail.idcard }}</p>
          <p style="color: #0ff">联系方式：{{ warnDetail.lxfs }}</p>
          <p style="color: #0ff">户籍所在地：{{ warnDetail.hjszd }}</p>
          <p style="color: #0ff"> 实际住址：{{ warnDetail.sjzz }}</p>
          <p style="color: #0ff">管辖派出所：{{ warnDetail.gxpcs }}</p>
           <p style="color: #0ff">号牌颜色：{{ warnDetail.hpys }}</p>
          <p style="color: #0ff">车辆型号：{{ warnDetail.clxh }}</p>
          <p style="color: #0ff">车辆品牌：{{ warnDetail.clpp }}</p>
          <p style="color: #0ff">是否拦截：{{ warnDetail.sflj==1?"是":"否" }}</p>
          <p style="color: #0ff">反馈时间：{{ warnDetail.fksj }}</p>
        </template>
        <p style="color: #0ff">过车图片：
        <img :width="200" :src="warnDetail.gctp" @click="preview(warnDetail.gctp)"/>
        </p>
      </div>
    </a-modal>
    <!-- 图片弹窗 -->
    <a-modal
      v-model="explainVisible"
      width="6rem"
      :maskClosable="false"
      :footer="null"
      style="position: relative;top:0.02rem"
      class="explain_modal"
      :getContainer="() => $refs.page"
    >
      <template #closeIcon>
        <img src="@/assets/images/portal/three_CLOSE.png" />
      </template>
      <div class="modal_container">
        <h4>1、重点车辆积分预警</h4>
        <p>基于车辆基本信息及车辆状态数据，构建积分体系。模型包含机动车基础信息、机动车状态信息两个大类指标，每个大类指标细化成多个小类指标。车辆积分实行加分制及一票否决制，其计算频率为按日更新，每天00:00进行积分刷新计算。
        若车辆不包含一票否决行为，则车辆得分=机动车基础信息分数+机动车状态信息分数；反之，则车辆得分=60+一票否决分数；同时根据积分值，进行等级划分，包含红色（≥60）、橙（50-60）、黄（40-50）、绿（＜40）四个等级。</p>
        <h4>2、重点驾驶人积分预警</h4>
        <p>
        基于驾驶人基本信息以及违法、事故等数据，形成驾驶人专题数据。
        通过驾驶人基本属性、违法属性、事故属性等维度，依据权重为驾驶人构建积分体系，形成车辆积分模型。
        模型包含驾驶人基础信息、驾驶人状态信息、驾驶人违法信息、驾驶人事故信息四个大类指标。
        同时根据积分值，进行等级划分，包含红色（≥80）、橙（60-80）、黄（40-60）、绿（＜40）四个等级。
        </p>
        <h4>3、重点企业积分预警</h4>
        <p>
        基于企业名下驾驶人及车辆关联事故、违法等数据，形成企业专项积分评价模型，根据吉林省不同企业类型，并根据积分值，进行等级划分，包含高风险（红）、中风险（黄）、低风险（绿）三个等级，不同类型企业等级分数划分如下：
        等级 分数段
        危化品运输企业 客运 货运
        高风险 X≤79 X≤81 X≤80.5
        中风险 79＜X≤92.5 81＜X≤94.5 80.5＜X≤93
        低风险 92.5＜X≤100 94.5＜X≤100 93＜X≤100
        </p>
      </div>
    </a-modal>
    <a-modal
      @cancel="() => imageVisible = false"
      :maskClosable="false"
      :footer="null"
      centered
      width="12rem"
      class="explain_modal2"
      :getContainer="() => $refs.page"
      destroyOnClose
    >
      <img
        ref="image"
        :width="1300"
        :src="warnDetail.gctp"
      />
    </a-modal>
    <!-- 预警坐标弹窗 -->
    <a-modal
      title="预警坐标"
      :visible="pointModalVisible"
      @cancel="cancelShowPoint"
      centered
      :maskClosable="false"
      :getContainer="() => $refs.page"
      width="10rem"
      :footer="false"
      destroyOnClose
    >
      <fake-warn-point-map :Info="warnPointData" />
    </a-modal>
  </div>
</template>
<script>
import "swiper/css/swiper.css";
import api from "@/api";
import moment from "moment";
import FakeWarnPointMap from "../manage/FakeWarnPointMap.vue";
import * as echarts from "echarts";
import { mapState, mapActions, mapMutations } from "vuex";
import TaskFlow from "../disposal/TaskFlow.vue";
export default {
  name: "WarnClassification",
  inject: ["echartsLoadingOptions"],
  components: {
    FakeWarnPointMap,
    TaskFlow,
  },
  data() {
    return {
      explainVisible:false,
      imageVisible:false,
      pointModalVisible: false,
      detailVisible: false,
      swiperOption: {
        loop: true, // 开启循环模式选项
        // 如果需要分页器
        pagination: {
          el: ".swiper-pagination",
          clickable: true, //点分页时可以切换
        },
        // 如果需要前进后退按钮
        navigation: {
          nextEl: ".swiper-next",
          prevEl: ".swiper-prev",
        },
      },
      // deptStat: [],
      warnClass: "1",
      searchInfo: {
        warnLevel: undefined,
        duration: [undefined, undefined],
      },
      listData: [],
      pagination: {
        current: 1,
        total: 0,
        pageSize: 9,
        showQuickJumper: true,
        showTotal: (total) => `总共 ${total} 条记录`,
        onChange: (pageNum) => {
          this.pagination.current = pageNum;
          this.search(true);
        },
      },
      // currentOrg: undefined,
      currentWarnType: undefined,
      orgStat: [],
      warnPointData: {},
      warn: [],
      cl1: "#1B5AFA",
      cl2: "#36CFEA",
      // warns:[],
      chartState: false,
      echartsIndex: 0,
      gridPoint: [],
      warnModelName: "",
      warnLoading: false,
      chart: undefined,
      warnDetail: {},
      img: undefined,
      params: {
        scale: 1,
        disY: 0,
        disX: 0,
        isDown: false,
      },
      flag: true
    };
  },
  watch: {
    wsData() {
      if ((this.currentWarnType.modelName == "非法关闭gps" && this.wsData.type == "1") ||
        (this.currentWarnType.modelName == "超速预警" && this.wsData.type == "2") || 
        (this.currentWarnType.modelName == "疲劳驾驶" && this.wsData.type == "3")
      ) {
        this.search();
      }
    }
  },
  computed: {
    ...mapState("constants", ["warnModels"]),
    ...mapState("dispoal", ["wsData", "modalVisible"]),
    //过滤预警类别
    orgStatType() {
      return this.orgStat.filter((o) => o.warnType == this.warnClass);
    },
  },
  mounted() {
    this.chart = this.$echarts.init(this.$refs.warnType);
    this.fetchDeptStat();
  },
  filters: {
    statusFilter(status) {
      return ["未处置", "已处置", "已忽略"][status];
    },
  },
  methods: {
    //战时处置
    ...mapMutations("dispoal", ["setModalVisible"]),
    ...mapActions("dispoal", ["fetchWarnDetail"]),
    getWarnDetail(warn) {
      this.fetchWarnDetail({
        id: warn.yjId,
        tableName: warn.tableName,
        dataSourceType: warn.dataSourceType,
      });
      this.modalVisible = true;
    },
    //战时处置
    emengency(warn) {
      this.$axios
        .get(api.warnDetails(), {
          params: {
            yjId: warn.yjId,
            tableName: warn.tableName,
            dataSourceType: warn.dataSourceType,
          },
        })
        .then((res) => {
          window.open("JocPlatform://");
          setTimeout(() => {
            this.$axios
              .post(api.emergency(), {
                warnId: `${warn.yjId},${warn.tableName},${warn.dataSourceType}`,
                warnType: warn.modelName,
                warnContent: warn.content,
                source: res.data.yjly,
                level: res.data.yjjb,
                time: res.data.yjsj,
                point: warn.point
              })
              .then((res) => {
                if (res.data.code == 1) {
                  this.$message.success("成功");
                }
              });
          }, 10000);
        });
    },
    init() {
      const _this = this;
      const yAxisData = this.orgStat
        .filter((o) => o.warnType == this.warnClass)
        .map((d) => d.modelName);
      const barData = this.orgStat
        .filter((o) => o.warnType == this.warnClass)
        .map((d) => d.count);
      let option = {
        tooltip: {
          show: false,
        },
        grid: { left: 10, top: 0, bottom: 0, right: 20, containLabel: true },
        xAxis: {
          type: "value",
          boundaryGap: false,
          axisLine: { show: false, lineStyle: { color: "#ccc" } },
          axisTick: { show: false },
          axisLabel: { show: false },
          splitLine: { show: false },
        },
        yAxis: [
          {
            type: "category",
            data: yAxisData,
            axisLine: { show: false, lineStyle: { color: "#ccc" } },
            axisTick: { show: false },
            axisLabel: { 
              fontSize: 14, 
              color: function(params, index) {
                if (index == _this.echartsIndex) {
                  return "#0ff";
                } else {
                  return "#fff";
                }
              }, 
              margin: 16, 
              padding: 0 
            },
            inverse: true,
            triggerEvent: true,
          },
          {
            type: "category",
            inverse: true,
            axisTick: "none",
            axisLine: "none",
            show: true,
            triggerEvent: true,
            axisLabel: {
              fontSize: "12",
              color: function(params, index) {
                if (index == _this.echartsIndex) {
                  return "#0ff";
                } else {
                  return "#fff";
                }
              }, 
              formatter: function (value) {
                return value;
              },
            },
            data: barData,
          },
        ],
        series: [
          {
            name: "数量",
            type: "bar",
            showBackground: true,
            backgroundStyle: { color: "rgba(82, 168, 255, 0.1)" },
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color: "#1B5AFA" },
                { offset: 1, color: "#36CFEA" },
              ])
            },
            barWidth: 26,
            label: {
              show: false,
              position: "right",
              offset: [0, 2],
              color: "#fff",
            },
            data: barData,
          },
        ],
      }
      setTimeout(() => {
        this.chart.off('click');
        this.chart.on('click',(param)=>{
          console.log(param);
          this.echartsIndex = param.dataIndex;
          this.chart.setOption(option,true);
          const { offsetX, offsetY } = param.event;
          this.gridPoint = this.chart.convertFromPixel(
            { yAxisIndex: 0, xAxisIndex: 0 },
            [ offsetX, offsetY ]
          );
          const warnType = this.orgStatType[this.gridPoint[1]];
          if (warnType) {
            this.currentWarnType = warnType;
            this.search();
          }
        })
        this.chart.setOption(option);
      })
    },
    changeWarnType() {
      this.echartsIndex = 0;
      this.init();
      this.currentWarnType = this.orgStatType[0] == null ? this.currentWarnType : this.orgStatType[0];
      this.search();
    },
    //预警坐标显示
    showWarnPoint(isShow, item) {
      // if (item.hphm == null) {
      //   alert("当前数据不支持定位查询");
      //   return;
      // }
      if (item.hphm == null) {
        item.hphm = item.content.slice(0, 7);
      }
      const reg = /^[\u4e00-\u9fa5]{0,}$/;
      if (item.hphm.indexOf("吉") > -1 || !reg.test(item.hphm)) {
        if(['ly_sd_yj','ly_st_yj','ly_sw_yj','ly_jz_yj','ly_vio_tried','ly_vio_speed','ly_close_gps','ly_other_province'].indexOf(item.tableName)>-1){
          this.$axios.post(api.getWarnPointCloseGps(),{
            yjId:item.yjId,
            tableName:item.tableName
          }).then(res => {
            this.$set(res.data.data,"type",item.tableName)
            this.warnPointData = res.data.data
            this.pointModalVisible = isShow;
          })
        }else{
        this.$axios
          .post(api.getWarnPoint(), {
            hphm:
              item.hphm.length == 7 && !reg.test(item.hphm)
                ? item.hphm.slice(1)
                : item.hphm,
            startDate: moment().format("YYYY-MM-DD"),
            endDate: moment().format("YYYY-MM-DD"),
            // hphm: "BB4513",
            // startDate: "2022-06-09",
            // endDate: "2022-06-09"
          })
          .then((res) => {
            if (res.data.data == null) {
              // this.$notification.error({
              //   message: "该预警暂无坐标数据",
              // });
              alert("该预警暂无坐标数据！");
              this.cancelShowPoint();
            }
            const data = res.data.data;
            const point = data.lonlat.split(",");
            this.warnPointData = {
              warnPoint: {
                clon: parseFloat(point[0]),
                clat: parseFloat(point[1]),
              },
              carPlate: data.num,
              time: data.timeStr,
              address: data.address,
              road: data.roads[0],
            };
            this.pointModalVisible = isShow;
          });
        }
      } else {
        alert("当前数据不支持定位查询！");
      }
    },
    hanldeIconClick(){
      this.explainVisible = true;
    },
    cancelShowPoint() {
      this.pointModalVisible = false;
      this.warnPointData = {};
    },
    //预警详情显示
    showWarnDetail(isShow, item) {
      this.warnDetail = item;
      this.detailVisible = isShow;
    },
    imageClick(){
      this.imageVisible = true;
      this.$nextTick(() => {
        this.img = this.$refs.image;
      })
    },
    //图片详情预览
    preview(img) {
      this.$hevueImgPreview(img);
    },
    onWarnTypeClick(params) {
      const { offsetX, offsetY } = params.event;
      this.gridPoint = this.$refs.warnType.convertFromPixel(
        { yAxisIndex: 0, xAxisIndex: 0 },
        [ offsetX, offsetY ]
      );
      const warnType = this.orgStatType[this.gridPoint[1]];
      if (warnType) {
        this.currentWarnType = warnType;
        this.search();
      }
    },
    fetchDeptStat() {
      // this.$axios.post(api.warnStat()).then((res) => {
      //   this.deptStat = res.data;
      //   this.deptStat.sort((d1, d2) => d2.sum - d1.sum);
      //   this.currentOrg = this.deptStat[0].id;
      this.fetchCountByOrgId();
      // });
    },
    fetchCountByOrgId() {
      this.$axios
        .post(api.warnCountByOrgId())
        .then((res) => {
          this.orgStat = res.data.sort((d1, d2) => d2.count - d1.count);
          const orgStatType = this.orgStat.filter(
            (o) => o.warnType == this.warnClass
          )
          orgStatType.sort((o1, o2) => o2.count - o1.count);
          this.currentWarnType = orgStatType[0];
          this.search();
          this.init();
        });
    },
    // onOrgClick({ id, sum }) {
    //   if (sum == 0) return;
    //   this.currentOrg = id;
    //   this.fetchCountByOrgId();
    // },
    reset() {
      this.searchInfo = {
        warnLevel: undefined,
        duration: [undefined, undefined],
      };
    },
    search(page) {
      this.warnLoading = true;
      this.chart.showLoading({
        textColor: "rgba(255, 255, 255, 0)",
        color: "rgba(255, 255, 255, 0)",
        maskColor: "transparent",
      });
      if (!page) {
        this.pagination.current = 1;
      }
      const pageNum = this.pagination.current;
      const pageSize = this.pagination.pageSize;
      const {
        warnLevel,
        duration: [start, end],
      } = this.searchInfo;
      const { dataSourceType, modelTable, modelName } = this.currentWarnType;
      this.$axios
        .post(api.warnListOrgId(), {
          warnLevel,
          start: start ? start.format("YYYYMMDDHHmmss") : undefined,
          end: end ? end.format("YYYYMMDDHHmmss") : undefined,
          pageNum,
          pageSize,
          dataSourceType,
          tableName: modelTable,
          warnName: modelName,
        })
        .then((res) => {
          this.pagination.total = res.data.count;
          this.listData = res.data.data.map((d) => ({
            ...d,
            level: 1,
            warnDate: moment(d.warnDate, "YYYYMMDDHHmmss").format(
              "YYYY-MM-DD HH:mm"
            ),
            warnType: this.currentWarnType.warnType,
          }));
          this.warnLoading = false;
          this.warnModelName = this.currentWarnType.modelName;
          this.chart.hideLoading();
        });
    },
  },
};
</script>
<style lang="less" scoped>
@import "../../assets/style/warn/warn.less";
@import "../../assets/style/warn/modal.less";
.modal_container {
  h4{
  color: #fff;
  }
  p{
  color: #fff;
  font-size: .1rem;
  line-height: .2rem;
  text-align: left;
  }
}
.question_icon{
  position: relative;
  top:0.02rem
}
.msg{
  position: relative;
  top:-40px;
}
.explain_modal2 {
  padding-top: 0.3rem;
  position: relative;
  img{
    width: 10.5rem;
    position: relative;
    left: 0.5rem;
    top: 0.5rem;
  }
  .ant-modal-content {
    max-height: none;
    min-height: fit-content;

  }
}
</style>