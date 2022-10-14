<template>
  <a-form-model
    :model="receiveForm"
    :label-col="{ span: 4 }"
    :wrapper-col="{ span: 18 }"
  >
    <a-form-model-item label="接收单位" class="unit_list">
      <a-tree-select
        :showSearch="true"
        style="width: 100%"
        v-model="receiveForm.unit"
        :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
        placeholder="请选择"
        allow-clear
        tree-checkable
        :treeData="treeData"
        tree-default-expand-all
        @change="onChange"
        @search="onSearch"
        @select="onSelect"
        :getPopupContainer="triggerNode => triggerNode.parentNode"
      >
      </a-tree-select>
    </a-form-model-item>
    <a-form-model-item label="截止时间">
      <a-date-picker
        style="width:100%"
        show-time
        v-model="receiveForm.deadline"
        placeholder="请选择"
      >
        <img
          slot="suffixIcon"
          src="@/assets/images/warn/taskdetail/date_icon.png"
        />
      </a-date-picker>
    </a-form-model-item>
    <a-form-model-item label="提醒时间">
      <a-date-picker
        style="width:100%"
        show-time
        v-model="receiveForm.remind"
        placeholder="请选择"
      >
        <img
          slot="suffixIcon"
          src="@/assets/images/warn/taskdetail/date_icon.png"
        />
      </a-date-picker>
    </a-form-model-item>
    <a-form-model-item label="交办理由">
      <a-textarea
        v-model="receiveForm.reason"
        placeholder="请输入"
        :auto-size="{ minRows: 8, maxRows: 8 }"
      />
    </a-form-model-item>
    <a-form-model-item :wrapper-col="{ span: 18, offset: 3 }">
      <div class="form_btns">
        <a-button class="reset_btn">
          重置
        </a-button>
        <a-button class="save_btn">
          确定
        </a-button>
      </div>
    </a-form-model-item>
  </a-form-model>
</template>
<script>
const treeData = [
  {
    title: "吉林省XXXX局",
    value: "1",
    key: "1",
    children: [
      {
        title: "XXX部门1",
        value: "1-1",
        key: "1-1"
      },
      {
        title: "XXX部门2",
        value: "1-2",
        key: "1-2"
      }
    ]
  },
  {
    title: "吉林省XXXX局2",
    value: "2",
    key: "2",
    children: [
      {
        title: "XXX部门1",
        value: "2-1",
        key: "2-1"
      },
      {
        title: "XXX部门2",
        value: "2-2",
        key: "2-2"
      }
    ]
  },
  {
    title: "吉林省XXXX局2",
    value: "3",
    key: "3",
    children: [
      {
        title: "XXX部门1",
        value: "3-1",
        key: "3-1"
      },
      {
        title: "XXX部门2",
        value: "3-2",
        key: "3-2"
      }
    ]
  }
];
export default {
  name: "ReceiveModal",
  data() {
    return {
      receiveForm: {
        unit: [],
        deadline: undefined,
        remind: undefined,
        reason: ""
      },
      treeData
    };
  },
  methods: {
    onChange(value) {
      console.log(value);
      this.value = value;
    },
    onSearch() {
      console.log(...arguments);
    },
    onSelect() {
      console.log(...arguments);
    }
  }
};
</script>
