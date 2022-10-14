<template>
  <div class="home_wrap home_other" ref="page">
    <!-- <template v-if="!fetching" >
      <a-spin :spinning="false" />
    </template> -->
    <template>
      <Header />
      <left-menu />
      <div class="content_other">
        <div class="crumbs_nav">
          <a-breadcrumb separator="">
            <a-breadcrumb-item>{{ currentPage }}</a-breadcrumb-item>
          </a-breadcrumb>
        </div>
        <div class="search_container" style="margin-top: 0.1rem">
          <a-form-model layout="inline">
            <a-form-model-item label="用车单位">
              <a-form-model-item
                :style="{
                  marginRight: i == selectableCodeCounts - 1 ? '5px' : '0',
                }"
                v-for="(n, i) in selectableCodeCounts"
                :key="i"
              >
                <a-select
                  :disabled="i == 0"
                  :value="selectedCodes[i]"
                  @change="(v) => onCodeSelect(v, i)"
                  :options="[
                    { value: 0, label: '全部' },
                    ...selectableCodeOptionsArr[i],
                  ]"
                />
                <span class="text">{{ codeSuffixs[i] }}</span>
              </a-form-model-item>
            </a-form-model-item>
            <a-form-model-item label="用车日期">
              <a-range-picker
                v-model="duration"
                :show-time="false"
                :placeholder="['开始时间', '结束时间']"
              >
                <img
                  src="../../assets/images/warn/modal/date_icon.png"
                  slot="suffixIcon"
                />
              </a-range-picker>
            </a-form-model-item>
            <a-form-model-item>
              <a-button class="search_btn" @click="onSearch"> 查询 </a-button>
              <a-button class="reset_btn" @click="reset"> 重置 </a-button>
            </a-form-model-item>
          </a-form-model>
        </div>
        <div class="dispatch_list">
          <a-list
            :grid="{ gutter: 16, column: 3 }"
            :data-source="vehicleApplys"
            :pagination="pagination"
          >
            <a-list-item slot="renderItem" slot-scope="item, index">
              <div class="dispatch_item">
                <div class="xh">
                  {{
                    (pagination.current - 1) * pagination.pageSize +
                    Number(index) +
                    1
                  }}
                </div>
                <div class="item_info">
                  <p>
                    <label>用车单位：</label>
                    <span>{{ item.villageName }}</span>
                  </p>
                </div>
                <a-row>
                  <a-col span="12">
                    <div class="item_info">
                      <p>
                        <label>用车日期：</label>
                        <span>{{ item.useTime | dateFilter }}</span>
                      </p>
                    </div>
                  </a-col>
                  <a-col span="12">
                    <div class="item_info">
                      <p>
                        <label>用车结束日期：</label>
                        <span>{{ item.endTime | dateFilter }}</span>
                      </p>
                    </div>
                  </a-col>
                  <a-col span="12">
                    <div class="item_info">
                      <p>
                        <label>用车时段：</label>
                        <span
                          >{{ item.useTimeStart | timeFilter }}-{{
                            item.useTimeEnd | timeFilter
                          }}</span
                        >
                      </p>
                    </div>
                  </a-col>
                  <a-col span="12">
                    <div class="item_info">
                      <p>
                        <label>用车人数：</label>
                        <span>{{ item.riderNum }}</span>
                      </p>
                    </div>
                  </a-col>
                  <a-col span="12">
                    <div class="item_info">
                      <p>
                        <label>派车状态：</label>
                        <span v-if="item.status >= 2">
                          <a-tag color="#2db7f5"> 已派车 </a-tag>
                        </span>
                        <span v-else>
                          <a-tag color="#f50"> 未派车 </a-tag>
                        </span>
                      </p>
                    </div>
                  </a-col>
                  <a-col span="12">
                    <div class="item_info">
                      <p>
                        <label>派警状态：</label>
                        <span v-if="item.status == 3">
                          <a-tag color="#2db7f5"> 已派警 </a-tag>
                        </span>
                        <span v-else>
                          <a-tag color="#f50"> 未派警 </a-tag>
                        </span>
                      </p>
                    </div>
                  </a-col>
                </a-row>
                <div class="warn_btns">
                  <a-button @click="() => showDetail(item)">查看</a-button>
                  <template
                    v-if="
                      (org.orgType == 1 && item.status == 0) ||
                      (org.orgType == 2 && item.status == 1) ||
                      (org.orgType == 3 && item.status == 2)
                    "
                  >
                    <a-button @click="() => handleEditItem(item)"
                      >编辑</a-button
                    >
                    <a-button @click="() => confirm(item)">提交</a-button>
                  </template>
                  <template v-if="org.orgType == 0 && item.status == 2">
                    <a-button @click="() => handleEditItem(item)"
                      >编辑</a-button
                    >
                  </template>
                </div>
              </div>
            </a-list-item>
          </a-list>
        </div>
        <!-- 编辑弹窗 -->
        <a-modal
          v-model="editVisible"
          title="编辑信息"
          centered
          :maskClosable="false"
          :getContainer="() => $refs.page"
          width="10rem"
          :footer="null"
        >
          <div class="modal_container">
            <a-steps :current="current" @change="handleStepChange">
              <a-step v-for="(item, index) in taskSteps" :key="item.title">
                <template slot="title">
                  <div class="custom_title">
                    <p>{{ item.title }}</p>
                    <!-- <span v-if="item.title.length>4">{{item.title.substring(6,item.title.length)}}</span> -->
                  </div>
                </template>
                <template slot="subTitle" v-if="index < current">
                  <p>2022-08-09</p>
                  <span>10:21:12</span>
                </template>
              </a-step>
            </a-steps>
            <!--  -->
            <div class="step_content">
              <!--农业局 -->
              <a-form-model
                :model="vehicleApply"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 14 }"
                v-if="current === 0"
              >
                <a-row>
                  <a-col span="12">
                    <a-form-model-item label="申请人姓名">
                      <a-input :value="vehicleApply.name" disabled />
                    </a-form-model-item>
                  </a-col>
                  <a-col span="12">
                    <a-form-model-item label="乘车人数">
                      <a-input v-model="vehicleApply.riderNum" />
                    </a-form-model-item>
                  </a-col>
                  <a-col span="12">
                    <a-form-model-item label="用车开始日期">
                      <a-date-picker
                        :allowClear="false"
                        v-model="vehicleApply.useTime"
                        format="YYYY年MM月DD"
                        type="date"
                        placeholder=""
                        style="width: 100%"
                      />
                    </a-form-model-item>
                  </a-col>
                  <a-col span="12">
                    <a-form-model-item label="用车结束日期">
                      <a-date-picker
                        :allowClear="false"
                        v-model="vehicleApply.endTime"
                        format="YYYY年MM月DD"
                        type="date"
                        placeholder=""
                        style="width: 100%"
                      />
                    </a-form-model-item>
                  </a-col>
                  <a-col span="24">
                    <a-form-model-item
                      label="用车人联系方式"
                      :label-col="{ span: 4 }"
                      :wrapper-col="{ span: 19 }"
                    >
                      <a-input
                        v-model="vehicleApply.tel"
                        style="width: 100%"
                      />
                    </a-form-model-item>
                  </a-col>
                  <a-col span="12">
                    <a-form-model-item label="开始时间">
                      <a-time-picker
                        use12-hours
                        style="width: 100%"
                        v-model="vehicleApply.useTimeStart"
                        :allowClear="false"
                      />
                    </a-form-model-item>
                  </a-col>
                  <a-col span="12">
                    <a-form-model-item label="结束时间">
                      <a-time-picker
                        use12-hours
                        style="width: 100%"
                        v-model="vehicleApply.useTimeEnd"
                        :allowClear="false"
                      />
                    </a-form-model-item>
                  </a-col>
                  <a-col span="12">
                    <a-form-model-item label="行车路线">
                      <a-input v-model="vehicleApply.route" />
                    </a-form-model-item>
                  </a-col>
                  <a-col span="12">
                    <a-form-model-item label="出车里程">
                      <a-input v-model="vehicleApply.goMileage" />
                    </a-form-model-item>
                  </a-col>
                  <a-col span="12">
                    <a-form-model-item label="回车里程">
                      <a-input v-model="vehicleApply.returnMileage" />
                    </a-form-model-item>
                  </a-col>
                  <a-col span="12">
                    <a-form-model-item label="行政区划">
                      <a-input :value="vehicleApply.villageName" disabled />
                    </a-form-model-item>
                  </a-col>
                  <a-col span="24">
                    <a-form-model-item
                      label="集合地点"
                      :label-col="{ span: 4 }"
                      :wrapper-col="{ span: 19 }"
                    >
                      <a-textarea
                        v-model="vehicleApply.place"
                        style="width: 100%"
                      />
                    </a-form-model-item>
                  </a-col>
                  <a-col span="24">
                    <a-form-model-item
                      label="用车事由"
                      :label-col="{ span: 4 }"
                      :wrapper-col="{ span: 19 }"
                    >
                      <a-textarea
                        v-model="vehicleApply.useReason"
                        style="width: 100%"
                      />
                    </a-form-model-item>
                  </a-col>
                  <a-col span="24">
                    <a-form-model-item
                      label="备注（乡镇）"
                      :label-col="{ span: 4 }"
                      :wrapper-col="{ span: 19 }"
                    >
                      <a-textarea
                        v-model="vehicleApply.remakeAg"
                        style="width: 100%"
                      />
                    </a-form-model-item>
                  </a-col>
                </a-row>
              </a-form-model>
              <a-form-model
                :model="vehicleApply"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 14 }"
                v-if="current === 1"
                style="height: 4rem"
              >
                <a-row>
                  <a-col span="24">
                    <a-form-model-item
                      label="用车信息1"
                      :label-col="{ span: 4 }"
                      :wrapper-col="{ span: 19 }"
                    >
                      <a-textarea
                        placeHolder="车牌号，姓名，联系方式"
                        v-model="vehicleApply.carInfo1"
                        style="width: 100%"
                      />
                    </a-form-model-item>
                  </a-col>
                  <a-col span="24">
                    <a-form-model-item
                      label="用车信息2"
                      :label-col="{ span: 4 }"
                      :wrapper-col="{ span: 19 }"
                    >
                      <a-textarea
                        placeHolder="车牌号，姓名，联系方式"
                        v-model="vehicleApply.carInfo2"
                        style="width: 100%"
                      />
                    </a-form-model-item>
                  </a-col>
                  <a-col span="24">
                    <a-form-model-item
                      label="用车信息3"
                      :label-col="{ span: 4 }"
                      :wrapper-col="{ span: 19 }"
                    >
                      <a-textarea
                        placeHolder="车牌号，姓名，联系方式"
                        v-model="vehicleApply.carInfo3"
                        style="width: 100%"
                      />
                    </a-form-model-item>
                  </a-col>
                  <a-col span="24">
                    <a-form-model-item
                      label="备注（交通）"
                      :label-col="{ span: 4 }"
                      :wrapper-col="{ span: 19 }"
                    >
                      <a-textarea
                        v-model="vehicleApply.remakeTfc"
                        style="width: 100%"
                      />
                    </a-form-model-item>
                  </a-col>
                </a-row>
              </a-form-model>
              <a-form-model
                :model="vehicleApply"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 14 }"
                v-if="current === 2"
                style="height: 4rem"
              >
                <a-row>
                  <a-col span="12">
                    <a-form-model-item label="联系人姓名">
                      <a-input v-model="vehicleApply.policeName" />
                    </a-form-model-item>
                  </a-col>
                  <a-col span="12">
                    <a-form-model-item label="联系人手机号">
                      <a-input v-model="vehicleApply.policeTel" />
                    </a-form-model-item>
                  </a-col>
                  <a-col span="24">
                    <a-form-model-item
                      label="备注（交警）"
                      :label-col="{ span: 4 }"
                      :wrapper-col="{ span: 19 }"
                    >
                      <a-textarea
                        v-model="vehicleApply.remakePolice"
                        style="width: 100%"
                      />
                    </a-form-model-item>
                  </a-col>
                </a-row>
              </a-form-model>

              <div class="btns">
                <a-button
                  key="submit"
                  class="send_btn"
                  type="primary"
                  @click="onSave"
                  v-if="editable && submitable"
                >
                  保存
                </a-button>
                <a-button
                  key="back"
                  class="cancle_btn"
                  @click="handleCancleClick"
                >
                  关闭
                </a-button>
              </div>
            </div>
          </div>
        </a-modal>
      </div>
    </template>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import moment from "moment";
import api from "@/api";
import LeftMenu from "../harvest/layout/LeftMenu";
import Header from "../harvest/layout/Header.vue";

export default {
  name: "VehicleApply",
  components: {
    LeftMenu,
    Header,
  },
  data() {
    return {
      duration: [undefined, undefined],
      cityCodes: [],
      selectedCodes: [0, 0, 0, 0, 0, 0],
      codeSuffixs: ["市", "区/县", "乡/镇", "村"],
      vehicleApplys: [],
      pagination: {
        current: 1,
        pageSize: 9,
        showQuickJumper: true,
        showTotal: (total) => `总共 ${total} 条记录`,
        onChange: (pageNum, pageSize) => {
          this.pagination.current = pageNum;
          this.pagination.pageSize = pageSize;
        },
      },
      editVisible: false,
      editable: false,
      current: 0,
      taskSteps: [
        {
          title: "乡镇",
        },
        {
          title: "交通运输局",
        },
        {
          title: "交警支队",
        },
      ],
      vehicleApply: {},
      userInfoLoaded: false,
    };
  },
  filters: {
    dateFilter(val) {
      return moment(val, "YYYYMMDD").format("YYYY年M月DD日");
    },
    timeFilter(val) {
      return moment(val, "HHmmss").format("HH时mm分ss秒");
    },
  },
  computed: {
    ...mapState("login", ["fetching", "org"]),
    ...mapState("userInfo", ["userInfo"]),
    currentPage() {
      return this.$route.meta.title;
    },
    selectableCodeCounts() {
      if (this.cityCodes.length == 0) {
        return 0;
      }
      for (let i = 0; i < this.selectedCodes.length; i++) {
        const v = this.selectedCodes[i];
        if (v == 0) {
          return i + 1;
        }
      }
      return this.selectedCodes.length;
    },
    selectableCodeOptionsArr() {
      const labelKeys = ["city", "area", "town", "village"];
      const codeKeys = labelKeys.map((l) => `${l}Code`);
      let lastCityCodes;
      return Array.from({ length: this.selectableCodeCounts }).map((v, i) => {
        const codeKey = codeKeys[i];
        const labelKey = labelKeys[i];
        if (i == 0) {
          lastCityCodes = this.cityCodes;
        } else {
          lastCityCodes = lastCityCodes.find(
            (c) => c[codeKeys[i - 1]] == this.selectedCodes[i - 1]
          ).subs;
        }
        return lastCityCodes.map((c) => ({
          value: c[codeKey],
          label: c[labelKey],
        }));
      });
    },
    currentCode() {
      for (let i = this.selectedCodes.length - 1; i >= 0; i--) {
        const v = this.selectedCodes[i];
        if (v != 0) {
          return v;
        }
      }
      return undefined;
    },
    submitable() {
      if (this.org.orgType == 1) {
        return this.current == 0;
      } else if (this.org.orgType == 2) {
        return this.current == 1;
      } else if (this.org.orgType == 0) {
        return this.current == 2;
      }
      return false;
    },
  },
  created() {
    const p = this.fetchVillages();
    this.fetchLoginInfo((code) => {
      if (!code) {
        this.$message.error("系统异常");
        return;
      }
      this.selectedCodes = [code.substring(0, 4), 0, 0, 0];
      p.then(this.onSearch);
    });
  },
  methods: {
    ...mapActions("login", ["fetchLoginInfo"]),
    fetCodes() {
      this.$axios.post(api.vehicleApplys());
    },
    fetchVillages() {
      return this.$axios.get(api.villages()).then((res) => {
        this.cityCodes = res.data;
      });
    },
    handleEditItem(vehicleApply) {
      this.editVisible = true;
      this.editable = true;
      const { useTime, endTime, useTimeStart, useTimeEnd, policeTime } =
        vehicleApply;
      this.vehicleApply = {
        ...vehicleApply,
        useTime: useTime ? moment(useTime, "YYYYMMDD") : undefined,
        endTime: endTime ? moment(endTime, "YYYYMMDD") : undefined,
        useTimeStart: useTimeStart ? moment(useTimeStart, "HHmmss") : undefined,
        useTimeEnd: useTimeEnd ? moment(useTimeEnd, "HHmmss") : undefined,
        policeTime: policeTime
          ? moment(vehicleApply.useTime, "YYYYMMDDHHmmss")
          : undefined,
      };
      if (this.org.orgType == 0) {
        this.current = 2;
      } else if (this.org.orgType == 1) {
        this.current = 0;
      } else if (this.org.orgType == 2) {
        this.current = 1;
      }
    },
    handleCancleClick() {
      this.editVisible = false;
    },
    handleStepChange(current) {
      this.current = current;
    },
    onCodeSelect(v, i) {
      this.selectedCodes = [
        ...this.selectedCodes.slice(0, i),
        v,
        ...Array.from({ length: this.selectedCodes.length - i - 1 }).map(
          () => 0
        ),
      ];
    },
    onSearch() {
      if (this.cityCodes.length == 0) {
        this.$message.error("系统忙，请稍后重试");
        return;
      }
      const code = this.userInfo.cityCode;
      let [startDate, endDate] = this.duration;
      if (startDate) {
        startDate = startDate.format("YYYYMMDD");
      }
      if (endDate) {
        endDate = endDate.format("YYYYMMDD");
      }
      const pageNum = this.pagination.current;
      const pageSize = this.pagination.pageSize;
      this.$axios
        .post(api.vehicleApplys(), {
          code,
          startDate,
          endDate,
          pageNum,
          pageSize,
        })
        .then((res) => {
          this.vehicleApplys = res.data.records.map((c) => ({
            ...c,
            villageName: this.toVillageName(c.cityCode),
          }));
          this.pagination.total = res.data.total;
        });
    },
    toVillageName(code) {
      const city = this.cityCodes.find(
        (c) => c.cityCode == code.substring(0, 4)
      );
      if (!city) {
        return "未知";
      }
      const area = city.subs.find((c) => c.areaCode == code.substring(0, 6));
      if (!area) {
        return "未知";
      }
      const town = area.subs.find((c) => c.townCode == code.substring(0, 9));
      if (!town) {
        return "未知";
      }
      const village = town.subs.find((v) => v.villageCode == code);
      if (!village) {
        return "未知";
      }
      return `${city.city}${area.area}${town.town}${village.village}`;
    },
    onSave() {
      if (this.current == 0) {
        const {
          id,
          place,
          useReason,
          tel,
          useTime,
          endTime,
          useTimeStart,
          useTimeEnd,
          riderNum,
          route,
          goMileage,
          returnMileage,
          remakeAg,
        } = this.vehicleApply;
        if (!useTime) {
          this.$message.error("用车开始日期不能为空");
          return;
        }
        if (!endTime) {
          this.$message.error("用车结束日期不能为空");
          return;
        }
        if (!useTimeStart) {
          this.$message.error("用车开始时间不能为空");
          return;
        }
        if (!useTimeEnd) {
          this.$message.error("用车结束时间不能为空");
          return;
        }
        this.$axios
          .post(`${api.vehicleApplys()}/updateByFarming`, {
            id,
            place,
            useReason,
            tel,
            riderNum,
            route,
            goMileage,
            returnMileage,
            remakeAg,
            endTime: endTime.format("YYYYMMDD"),
            useTime: useTime.format("YYYYMMDD"),
            useTimeStart: useTimeStart.format("HHmmss"),
            useTimeEnd: useTimeEnd.format("HHmmss"),
          })
          .then(() => {
            this.$message.success("修改成功");
            this.onSearch();
            this.editVisible = false;
          });
      } else if (this.current == 1) {
        const { id, carInfo1, carInfo2, carInfo3, dispatchUnit, remakeTfc } =
          this.vehicleApply;
        this.$axios
          .post(`${api.vehicleApplys()}/updateByTraffic`, {
            id,
            carInfo1,
            carInfo2,
            carInfo3,
            dispatchUnit,
            remakeTfc,
          })
          .then(() => {
            this.$message.success("修改成功");
            this.onSearch();
            this.editVisible = false;
          });
      } else if (this.current == 2) {
        const { id, policeName, policeTel, remakePolice } = this.vehicleApply;
        if (!policeName) {
          this.$message.error("联系人姓名不能为空");
          return;
        }
        if (!policeTel) {
          this.$message.error("联系人手机号不能为空");
          return;
        }
        this.$axios
          .post(`${api.vehicleApplys()}/updateByPolice`, {
            id,
            policeName,
            policeTel,
            remakePolice,
          })
          .then(() => {
            this.$message.success("修改成功");
            this.onSearch();
            this.editVisible = false;
          });
      }
    },
    confirm(vehicleApply) {
      this.$confirm({
        content: "确认要提交吗，提交后信息不可编辑",
        onOk: () => {
          this.$axios
            .post(`${api.vehicleApplys()}/updateByPoliceStatus`, {
              id: vehicleApply.id,
            })
            .then(() => {
              this.$message.success("提交成功");
              this.onSearch();
            });
        },
      });
    },
    reset() {
      this.selectedCodes = [this.org.cityCode.substring(0, 4), 0, 0, 0];
      this.duration = [undefined, undefined];
      this.onSearch();
    },
    showDetail(vehicleApply) {
      this.editVisible = true;
      this.editable = false;
      const { useTime, endTime, useTimeStart, useTimeEnd, policeTime } =
        vehicleApply;
      this.vehicleApply = {
        ...vehicleApply,
        useTime: useTime ? moment(useTime, "YYYYMMDD") : undefined,
        endTime: endTime ? moment(endTime, "YYYYMMDD") : undefined,
        useTimeStart: useTimeStart ? moment(useTimeStart, "HHmmss") : undefined,
        useTimeEnd: useTimeEnd ? moment(useTimeEnd, "HHmmss") : undefined,
        policeTime: policeTime
          ? moment(vehicleApply.useTime, "YYYYMMDDHHmmss")
          : undefined,
      };
      this.current = 0;
    },
  },
};
</script>
<style lang="less" scoped>
@import "~@/assets/style/warn/home.less";
@import "~@/assets/style/warn/modal.less";
@import "~@/assets/style/disposal/disposal.less";
@import "~@/assets/style/warn/dispatch.less";
</style>