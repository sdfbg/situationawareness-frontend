<template>
  <div class="task_wrap" ref="taskPage">
    <div class="detail_bradecrumb">
      <a-row>
        <a-col span="12">
          <span>当前位置：</span>
          <a-breadcrumb separator=">">
            <a-breadcrumb-item>任务中心</a-breadcrumb-item>
            <a-breadcrumb-item> 新建任务 </a-breadcrumb-item>
          </a-breadcrumb>
        </a-col>
      </a-row>
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
        <img src="@/assets/images/warn/taskdetail/rwjc_icon.png" />任务基础信息
      </h2>
      <a-form-model
        :model="basicForm"
        :label-col="{ span: 2 }"
        :wrapper-col="{ span: 21 }"
      >
        <a-form-model-item label="任务标题">
          <a-input v-model="basicForm.title" placeholder="请输入任务标题">
            <a-select slot="addonBefore" v-model="level" style="width: 60px">
              <img
                slot="suffixIcon"
                src="../../../assets/images/warn/taskdetail/select_arrow.png"
              />
              <a-select-option value="0"> 绿 </a-select-option>
              <a-select-option value="1"> 红 </a-select-option>
            </a-select>
          </a-input>
        </a-form-model-item>
        <a-form-model-item label="关联任务">
          <a-input
            v-model="basicForm.relation"
            readonly="readonly"
            placeholder="超链接，点击跳转至新签页，更换关联任务点击前面的图标出现弹窗。"
            @click="handelSelectTask"
          >
            <template slot="prefix">
              <img src="../../../assets/images/warn/taskdetail/list_icon.png" />
            </template>
          </a-input>
        </a-form-model-item>
        <a-row>
          <a-col span="8">
            <a-form-model-item
              label="数据来源"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 15 }"
            >
              <a-input v-model="basicForm.source" disabled> </a-input>
            </a-form-model-item>
          </a-col>
          <a-col span="8">
            <a-form-model-item
              label="任务类型"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 15 }"
            >
              <a-select v-model="basicForm.type" placeholder="请选择">
                <img
                  slot="suffixIcon"
                  src="../../../assets/images/warn/taskdetail/select_arrow.png"
                />
                <a-select-option value="0"> 日常处置 </a-select-option>
                <a-select-option value="1"> 战时处置 </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col span="8">
            <a-form-model-item
              label="截止时间"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 15 }"
            >
              <a-date-picker
                v-model="basicForm.date"
                show-time
                type="date"
                placeholder="选择时间"
                style="width: 100%"
              />
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
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
            <img
              src="@/assets/images/warn/taskdetail/rwgl_icon.png"
            />任务关联情况
          </a-col>
          <a-col span="12" class="relation_right">
            <a-button @click="addRelationObj"
              ><a-icon type="plus-circle" />添加关联对象</a-button
            >
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
            <div class="delete_btn">
              <img src="@/assets/images/warn/taskdetail/list_del.png" />
            </div>
            <template v-if="item.type == 'person'">
              <img :src="item.img" />
              <div class="item_info">
                <a-row>
                  <a-col span="12">
                    <h3>{{ item.title }}</h3></a-col
                  >
                  <a-col span="12" class="info_right">
                    <img
                      src="../../../assets/images/warn/taskdetail/phone_icon.png"
                    />
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
      <div class="instructions_item">
        <label>任务内容：</label>
        <a-textarea placeholder="请输入" style="height: 2rem" />
      </div>
      <div class="instructions_item">
        <div class="item_left">
          <p>上传附件：</p>
          <a-upload
            name="file"
            :multiple="true"
            class="upload_btn"
            v-model="fileList"
            @change="handleUploadChange"
            :showUploadList="false"
          >
            <a-button>添加</a-button>
          </a-upload>
        </div>
        <div class="upload_list">
          <div class="upload_item">
            <div class="thumbnail"></div>
            <div class="upload_info">
              <p>附件名称附件名称附件名称附件名称.png</p>
              <a>21K</a>
            </div>
            <div class="delete_btn">
              <img src="@/assets/images/warn/taskdetail/list_del.png" />
            </div>
          </div>
        </div>
        <label style="margin-left: 0.2rem">图上标绘：</label>
        <img src="../../../assets/images/warn/taskdetail/map_img.png" />
      </div>
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
            <img src="@/assets/images/warn/taskdetail/jsdw_icon.png" /><span
              >接收单位</span
            >
          </a-col>
          <a-col span="12" class="relation_right">
            <a-button @click="handleAddReceive"
              ><a-icon type="plus-circle" />添加接收单位</a-button
            >
          </a-col>
        </a-row>
      </h2>
      <a-list :grid="{ gutter: 16, column: 4 }" :data-source="receiveData">
        <a-list-item slot="renderItem" slot-scope="item">
          <div class="list_item unit_list">
            <div class="item_title">
              <a-row>
                <a-col span="12">
                  <h3>
                    <img src="@/assets/images/warn/taskdetail/jsdw_blue.png" />
                    <span>{{ item.unit }}</span>
                  </h3>
                </a-col>
                <a-col span="12" style="text-align: right">
                  <!-- <div class="delete_btn"> -->
                  <img src="@/assets/images/warn/taskdetail/list_del.png" />
                  <!-- </div> -->
                </a-col>
              </a-row>
            </div>
            <div class="item_info add_info">
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
                <a class="detail_a">详情></a>
              </a-row>
            </div>
          </div>
        </a-list-item>
      </a-list>
    </div>
    <div class="task_box">
      <a-button key="submit" class="save_btn" type="primary" @click="createTask" :loading="createTaskLoading"> 保存 </a-button>
      <a-button key="back" class="cancle_btn"> 取消 </a-button>
    </div>
    <!-- 添加关联对象弹窗 -->
    <a-modal
      v-model="relateVisible"
      centered
      :getContainer="() => $refs.taskPage"
      width="6.1rem"
      :footer="null"
      title="添加关联对象"
    >
      <template slot="closeIcon">
        <img src="@/assets/images/warn/taskdetail/list_del.png" />
      </template>
      <div class="task_modal">
        <RelateModal></RelateModal>
      </div>
    </a-modal>
    <!-- 添加接收单位弹窗 -->
    <a-modal
      v-model="receiveVisible"
      centered
      :getContainer="() => $refs.taskPage"
      width="6.1rem"
      :footer="null"
      title="添加接收单位"
    >
      <template slot="closeIcon">
        <img src="@/assets/images/warn/taskdetail/list_del.png" />
      </template>
      <div class="task_modal">
        <ReceiveModal></ReceiveModal>
      </div>
    </a-modal>
    <a-modal
      v-model="selectVisible"
      centered
      :getContainer="() => $refs.taskPage"
      width="6.1rem"
      :footer="null"
      title="关联任务"
    >
      <template slot="closeIcon">
        <img src="@/assets/images/warn/taskdetail/list_del.png" />
      </template>
      <div class="task_modal">
        <TaskList></TaskList>
      </div>
    </a-modal>
  </div>
</template>
<script>
const relationData = [
  {
    type: "person",
    img: require("../../../assets/images/warn/taskdetail/person_img.png"),
    title: "欧阳某某",
    phone: "19980987654",
    idcard: "220109198909087654",
    address: "",
    licenseAddress: "XXX市XXX区XXXX"
  },
  {
    type: "person",
    img: require("../../../assets/images/warn/taskdetail/person_img.png"),
    title: "欧阳某某2",
    phone: "19980987654",
    idcard: "220109198909087654",
    address: "XXX市XXX区XXXX",
    licenseAddress: "XXX市XXX区XXXX"
  },

  {
    type: "car",
    img: require("../../../assets/images/warn/taskdetail/car_img.png"),
    title: "吉A1234",
    carType: "19980987654",
    other: "白色/奔驰",
    licenseAddress: "XXX市XXX区XXXX"
  },
  {
    type: "car",
    img: require("../../../assets/images/warn/taskdetail/car_img.png"),
    title: "吉A1234",
    carType: "19980987654",
    other: "白色/奔驰",
    licenseAddress: "XXX市XXX区XXXX"
  },
  {
    type: "car",
    img: require("../../../assets/images/warn/taskdetail/car_img.png"),
    title: "吉A1234",
    carType: "19980987654",
    other: "白色/奔驰",
    licenseAddress: "XXX市XXX区XXXX"
  }
];
const receiveData = [
  {
    unit: "XXXX公安局",
    status: "0",
    deadline: "2022",
    reminder: "2022",
    reason:
      "从制度上规范和保障经侦情报信息研判工作的顺利开展。息从制度上规范和保障经侦情报信息研判工作的顺利开展。息从制度上规范和保障经侦情报信息研判工作的顺利开展。息"
  },
  {
    unit: "XXXX公安局",
    status: "1",
    deadline: "2022",
    reminder: "2022",
    reason: "从制度上规范和保障经侦情报信息研判工作的顺利开展。息"
  }
];
import RelateModal from "./RelateModal.vue";
import ReceiveModal from "./ReceiveModal.vue";
import TaskList from "./TaskList.vue";
export default {
  name: "NewTask",
  components: {
    RelateModal,
    ReceiveModal,
    TaskList
  },
  data() {
    return {
      basicForm: {
        title: "",
        relation: [],
        source: "预警下发",
        type: undefined,
        date: undefined
      },
      level: "0",
      relationData,
      receiveData,
      fileList: [
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url:
            "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        }
      ],
      relateVisible: false,
      receiveVisible: false,
      selectVisible: false
    };
  },
  methods: {
    handleUploadChange(file) {
      console.log(file);
    },
    addRelationObj() {
      this.relateVisible = true;
    },
    handleAddReceive() {
      this.receiveVisible = true;
    },
    handelSelectTask() {
      this.selectVisible = true;
    }
  }
};
</script>
<style lang="less" scoped>
@import "~@/assets/style/disposal/task_modal.less";
@import "~@/assets/style/disposal/task_detail.less";
</style>
