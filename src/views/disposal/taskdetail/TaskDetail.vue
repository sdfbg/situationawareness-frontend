<template>
  <div class="task_wrap">
    <div class="detail_bradecrumb">
      <a-row>
        <a-col span="12">
          <span>当前位置：</span>
          <a-breadcrumb separator=">">
            <a-breadcrumb-item>任务中心</a-breadcrumb-item>
            <a-breadcrumb-item> 任务详情 </a-breadcrumb-item>
          </a-breadcrumb>
        </a-col>
        <a-col span="12" class="bread_right">
          <a-button>指派</a-button>
          <a-button>反馈</a-button>
        </a-col>
      </a-row>
    </div>
    <div class="task_flow" style="margin-top: 0.1rem">
      <div class="steps_wrap">
        <div
          :class="
            item.status == 'finished'
              ? 'step_item finished'
              : item.status == 'processing'
              ? 'step_item processing'
              : item.status == 'undo'
              ? 'step_item undo'
              : ''
          "
          v-for="(item, i) in steps"
          :key="i"
        >
          <div class="step_title">
            <span class="title_item">{{ item.title }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="task_box task_basic">
      <div class="top_left">
        <img src="@/assets/images/warn/taskdetail/top1.png" />
      </div>
      <div class="top_right">
        <img src="@/assets/images/warn/taskdetail/top2.png" />
      </div>
      <div class="bottom_left">
        <img src="@/assets/images/warn/taskdetail/bottom1.png" />
      </div>
      <div class="bottom_right">
        <img src="@/assets/images/warn/taskdetail/bottom2.png" />
      </div>
      <h2>
        <img src="@/assets/images/warn/taskdetail/rwjc_icon.png" />
        任务基础信息
      </h2>
      <table>
        <tr>
          <td class="info_title">任务标题</td>
          <td class="info_content" colspan="3">
            <span class="level">绿</span>
            春耕秋收季节性农村交通安全专项治理
          </td>
          <td class="info_title">任务状态</td>
          <td class="info_content">
            <a-tag color="#f50"> 待处置 </a-tag>
          </td>
        </tr>
        <tr>
          <td class="info_title">数据来源</td>
          <td class="info_content">人工创建</td>
          <td class="info_title">任务来源</td>
          <td class="info_content">省级</td>
          <td class="info_title">任务类型</td>
          <td class="info_content">日常处置</td>
        </tr>
        <tr>
          <td class="info_title">关联任务</td>
          <td class="info_content" colspan="3">
            <span class="level">绿</span>
            <a>这是超链接，点击后打开新签页：关联任务的任务详情</a>
          </td>
          <td class="info_title">截止时间</td>
          <td class="info_content">2022-09-08 12:32:12</td>
        </tr>
        <tr>
          <td class="info_title">交办单位</td>
          <td class="info_content">吉林省交安委</td>
          <td class="info_title">交办人</td>
          <td class="info_content"></td>
          <td class="info_title">交办时间</td>
          <td class="info_content">2022-09-03 12:32:12</td>
        </tr>
      </table>
    </div>
    <div class="task_box">
      <div class="top_left">
        <img src="@/assets/images/warn/taskdetail/top1.png" />
      </div>
      <div class="top_right">
        <img src="@/assets/images/warn/taskdetail/top2.png" />
      </div>
      <div class="bottom_left">
        <img src="@/assets/images/warn/taskdetail/bottom1.png" />
      </div>
      <div class="bottom_right">
        <img src="@/assets/images/warn/taskdetail/bottom2.png" />
      </div>
      <h2>
        <a-row>
          <a-col span="12">
            <img src="@/assets/images/warn/taskdetail/rwgl_icon.png" />
            任务关联情况
          </a-col>
          <a-col span="12" class="relation_right">
            <a-radio-group v-model="relationTab" button-style="solid">
              <a-radio-button value="all"> 全部 </a-radio-button>
              <a-radio-button value="0"> 人 </a-radio-button>
              <a-radio-button value="1"> 车 </a-radio-button>
              <a-radio-button value="2"> 路 </a-radio-button>
              <a-radio-button value="3"> 企 </a-radio-button>
            </a-radio-group>
          </a-col>
        </a-row>
      </h2>
      <div class="relate_title">
        <span>
          <label>预警等级：</label>
          <i class="level">绿</i>
        </span>
        <span>
          <label>预警来源：</label>
          <i class="source">疑似异地运营</i>
        </span>
        <span>
          <label>预警信息：</label>
          <i>疑似异地运营</i>
        </span>
        <span>
          <label>预警时间：</label>
          <i>2022-09-08 12:32:32</i>
        </span>
      </div>
      <a-list :grid="{ gutter: 16, column: 4 }" :data-source="relationData">
        <a-list-item slot="renderItem" slot-scope="item">
          <div class="list_item">
            <template v-if="item.type == 'person'">
              <img :src="item.img" />
              <div class="item_info">
                <a-row>
                  <a-col span="12">
                    <h3>{{ item.title }}</h3></a-col
                  >
                  <a-col span="12" class="info_right">
                    <img src="@/assets/images/warn/taskdetail/phone_icon.png" />
                    {{ item.phone }}
                  </a-col>
                </a-row>
                <p><label>身份证号：</label>{{ item.idcard }}</p>
                <p><label>现住址：</label>{{ item.address }}</p>
                <p><label>驾照注册地址：</label>{{ item.licenseAddress }}</p>
              </div>
            </template>
            <template v-if="item.type == 'car'">
              <img :src="item.img" />
              <div class="item_info">
                <h3>{{ item.title }}</h3>
                <p><label>车辆类型：</label>{{ item.carType }}</p>
                <p><label>其他信息：</label>{{ item.other }}</p>
                <p><label>车辆注册地址：</label>{{ item.licenseAddress }}</p>
              </div>
            </template>
          </div>
        </a-list-item>
      </a-list>
    </div>
    <div class="task_box">
      <div class="top_left">
        <img src="@/assets/images/warn/taskdetail/top1.png" />
      </div>
      <div class="top_right">
        <img src="@/assets/images/warn/taskdetail/top2.png" />
      </div>
      <div class="bottom_left">
        <img src="@/assets/images/warn/taskdetail/bottom1.png" />
      </div>
      <div class="bottom_right">
        <img src="@/assets/images/warn/taskdetail/bottom2.png" />
      </div>
      <h2>
        <img src="@/assets/images/warn/taskdetail/zhiling_icon.png" />
        任务指令详情
      </h2>
      <table>
        <tr>
          <td class="info_title">任务内容</td>
          <td class="info_content" colspan="2">
            1、结合往年交通事故数据、流量数据分析研判春秋期间需要重点管辖的区域、路段、时段和违法行为，击劝导各类违法行为。<br />
            2、在春耕秋收集中出行的特殊路段、时段，由公安、交通、农业农村部门组联合农业农村、交通运输部门根据研判报告，针对“一早一晚”时段，组成工作组，明确勤务部署，勤务部署情况录入一体化平台，开展联合执法，路段管理公成联合执组，实施交通管制，保障务工集中出行和农业生产车辆安全通行。
          </td>
        </tr>
        <tr>
          <td class="info_title">附件</td>
          <td class="info_content" style="vertical-align: top">
            <div class="info_img">
              <img
                v-for="(item, index) in 3"
                :key="index"
                src="@/assets/images/warn/taskdetail/test_img.png"
              />
            </div>
            <div class="info_file">
              <p>
                <label>附件名称：</label>
                <a>关于二级预警时的应对措施.xls</a>
                <a-icon type="download" />
              </p>
            </div>
          </td>
          <td class="info_content" style="width: 500px">
            <img src="@/assets/images/warn/taskdetail/map_img.png" />
          </td>
        </tr>
      </table>
    </div>
    <div class="task_box">
      <div class="top_left">
        <img src="@/assets/images/warn/taskdetail/top1.png" />
      </div>
      <div class="top_right">
        <img src="@/assets/images/warn/taskdetail/top2.png" />
      </div>
      <div class="bottom_left">
        <img src="@/assets/images/warn/taskdetail/bottom1.png" />
      </div>
      <div class="bottom_right">
        <img src="@/assets/images/warn/taskdetail/bottom2.png" />
      </div>
      <h2>
        <img src="@/assets/images/warn/taskdetail/jsdw_icon.png" />接收单位
      </h2>
      <a-list :grid="{ gutter: 16, column: 4 }" :data-source="receiveData">
        <a-list-item slot="renderItem" slot-scope="item">
          <div class="list_item unit_list">
            <div class="item_title">
              <a-row>
                <a-col span="12">
                  <h3>{{ item.unit }}</h3>
                </a-col>
                <a-col span="12" style="text-align: right">
                  <a-tag color="#d8762c" v-if="item.status == 0">
                    未反馈
                  </a-tag>
                  <a-tag color="#009943" v-if="item.status == 1">
                    已反馈
                  </a-tag>
                  <a>详情></a>
                </a-col>
              </a-row>
            </div>
            <div class="item_info">
              <a-row>
                <a-col span="12">
                  <p>
                    <label>截止时间：</label>
                    {{ item.deadline }}
                  </p>
                </a-col>
                <a-col span="12">
                  <p>
                    <label>提醒时间：</label>
                    {{ item.reminder }}
                  </p>
                </a-col>
              </a-row>
              <a-row>
                <a-col span="24">
                  <p>
                    <label>交办理由：</label>
                    <a-tooltip placement="top">
                      <template slot="title">
                        <span>{{ item.reason }}</span>
                      </template>
                      {{ item.reason }}
                    </a-tooltip>
                  </p>
                </a-col>
                <a-col span="24">
                  <p>
                    <label>反馈内容：</label>
                    {{ item.feedback }}
                  </p>
                </a-col>
              </a-row>
            </div>
          </div>
        </a-list-item>
      </a-list>
    </div>
  </div>
</template>
<script>
const relationData = [
  {
    type: "person",
    img: require("@/assets/images/warn/taskdetail/person_img.png"),
    title: "欧阳某某",
    phone: "19980987654",
    idcard: "220109198909087654",
    address: "",
    licenseAddress: "XXX市XXX区XXXX"
  },
  {
    type: "person",
    img: require("@/assets/images/warn/taskdetail/person_img.png"),
    title: "欧阳某某2",
    phone: "19980987654",
    idcard: "220109198909087654",
    address: "XXX市XXX区XXXX",
    licenseAddress: "XXX市XXX区XXXX"
  },

  {
    type: "car",
    img: require("@/assets/images/warn/taskdetail/car_img.png"),
    title: "吉A1234",
    carType: "19980987654",
    other: "白色/奔驰",
    licenseAddress: "XXX市XXX区XXXX"
  },
  {
    type: "car",
    img: require("@/assets/images/warn/taskdetail/car_img.png"),
    title: "吉A1234",
    carType: "19980987654",
    other: "白色/奔驰",
    licenseAddress: "XXX市XXX区XXXX"
  },
  {
    type: "car",
    img: require("@/assets/images/warn/taskdetail/car_img.png"),
    title: "吉A1234",
    carType: "19980987654",
    other: "白色/奔驰",
    licenseAddress: "XXX市XXX区XXXX"
  }
];
const receiveData = [
  {
    unit: "农业农村厅",
    status: "0",
    deadline: "2022-09-08 12:32:12",
    reminder: "2022-09-11 12:32:12",
    reason: "根据农业农村部门排查，村级网路员上报的出行需求",
    feedback: ""
  },
  {
    unit: "交通运输厅",
    status: "1",
    deadline: "2022-09-08 12:32:12",
    reminder: "2022-09-11 12:32:12",
    reason: "通过派出定制化网场客运约车、客运车辆等服务，服务群众...",
    feedback: "将进一步加强农机车管理，确保秋收安全出行。"
  }
];
export default {
  name: "TaskDetail",
  data() {
    return {
      steps: [
        {
          title: "预警审核",
          status: "finished"
        },
        {
          title: "任务下发",
          status: "finished"
        },
        {
          title: "任务接收",
          status: "finished"
        },
        {
          title: "任务流转",
          status: "processing"
        },
        {
          title: "处置反馈",
          status: "undo"
        },
        {
          title: "任务评价",
          status: "undo"
        },
        {
          title: "任务归档",
          status: "undo"
        }
      ],
      relationTab: "all",
      relationData,
      receiveData
    };
  }
};
</script>
<style lang="less" scoped>
@import "~@/assets/style/disposal/task_detail.less";
</style>
