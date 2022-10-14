<template>
  <a-form-model
    :model="form"
    :label-col="{ span: 4 }"
    :wrapper-col="{ span: 18 }"
  >
    <a-form-model-item label="关联类型">
      <a-select v-model="form.type" placeholder="请选择">
        <a-select-option value="0">
          人
        </a-select-option>
        <a-select-option value="1">
          车
        </a-select-option>
        <a-select-option value="2">
          路
        </a-select-option>
        <a-select-option value="3">
          企
        </a-select-option>
      </a-select>
    </a-form-model-item>
    <template v-if="form.type == '0'">
      <a-row>
        <a-col span="12">
          <a-form-model-item
            label="驾驶人"
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 14 }"
          >
            <a-input v-model="form.driver" placeholder="请输入" />
          </a-form-model-item>
        </a-col>
        <a-col span="12">
          <a-form-model-item
            label="性别"
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 14 }"
          >
            <a-radio-group v-model="form.gender">
              <a-radio value="1">
                男
              </a-radio>
              <a-radio value="2">
                女
              </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-form-model-item label="身份证号">
        <a-input v-model="form.idcard">
          <template slot="addonAfter">
            <a-button>自动匹配</a-button>
          </template>
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="联系电话">
        <a-input v-model="form.phone" placeholder="请输入"> </a-input>
      </a-form-model-item>
      <a-form-model-item label="现住址">
        <a-input v-model="form.address" placeholder="请输入"> </a-input>
      </a-form-model-item>
      <a-form-model-item label="驾照注册地址" class="break_word">
        <a-input v-model="form.registered" placeholder="请输入"> </a-input>
      </a-form-model-item>
    </template>
    <template v-if="form.type == '1'">
      <a-form-model-item label="车牌号">
        <a-input v-model="form.plate">
          <template slot="addonAfter">
            <a-button>自动匹配</a-button>
          </template>
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="车辆类型">
        <a-select v-model="form.carType" placeholder="请选择">
          <a-select-option value="0">
            小型汽车
          </a-select-option>
          <a-select-option value="1">
            校车
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="车辆注册地址" class="break_word">
        <a-input v-model="form.carAdress"> </a-input>
      </a-form-model-item>
      <a-form-model-item label="基本信息">
        <a-input v-model="form.carInfo" type="textarea" style="height:.8rem">
        </a-input>
      </a-form-model-item>
    </template>
    <template v-if="form.type == '2'">
      <a-form-model-item label="道路名称">
        <a-input v-model="form.roadName">
          <template slot="addonAfter">
            <a-button>自动匹配</a-button>
          </template>
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="道路类型">
        <a-select v-model="form.roadType" placeholder="请选择">
          <a-select-option value="0">
            类型1
          </a-select-option>
          <a-select-option value="1">
            类型2
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="行政等级">
        <a-select v-model="form.grade" placeholder="请选择">
          <a-select-option value="0">
            行政等级1
          </a-select-option>
          <a-select-option value="1">
            行政等级1
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="归属地">
        <a-input v-model="form.ownership"> </a-input>
      </a-form-model-item>
    </template>
    <template v-if="form.type == '3'">
      <a-form-model-item label="公司名称">
        <a-input v-model="form.comName">
          <template slot="addonAfter">
            <a-button>自动匹配</a-button>
          </template>
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="车辆类型">
        <a-select v-model="form.comCarType" placeholder="请选择">
          <a-select-option value="0">
            类型1
          </a-select-option>
          <a-select-option value="1">
            类型2
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="归属地">
        <a-input v-model="form.comOwnership"> </a-input>
      </a-form-model-item>
    </template>
    <a-form-model-item :wrapper-col="{ span: 18, offset: 3 }">
      <div class="form_btns">
        <a-button class="reset_btn">
          重置
        </a-button>
        <a-button class="save_btn">
          保存
        </a-button>
      </div>
    </a-form-model-item>
  </a-form-model>
</template>
<script>
export default {
  name: "RelateModal",
  data() {
    return {
      form: {
        type: "0",
        driver: "",
        gender: "1",
        idcard: "",
        phone: "",
        address: "",
        registered: "",
        plate: "", //车牌号
        carType: undefined,
        carAdress: "",
        carInfo: "",
        roadName: "", //道路名称
        roadType: undefined,
        grade: undefined,
        ownership: "",
        comName: "", //公司名称
        comCarType: undefined,
        comOwnership: ""
      }
    };
  }
};
</script>
