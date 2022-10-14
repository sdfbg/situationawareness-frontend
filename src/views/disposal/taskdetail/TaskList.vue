<template>
  <div class="task_list">
    <a-input-search placeholder="请输入"  />
    <a-table :columns="taskColumns" :data-source="taskData" :pagination="pagination" :rowSelection="rowSelection" bordered :scroll="{y: 260 }">
      <template #detail>
        <img @click="taskDetail" src="@/assets/images/warn/taskdetail/list_icon.png"/>
      </template>
      <template #level="text,record">
        <a-tag color="#b10000" v-if="record.level=='1'">
          红
        </a-tag>
        <a-tag color="#ffff00" v-if="record.level=='2'" style="color:#000">
          黄
        </a-tag>
        <a-tag color="#009944" v-if="record.level=='3'">
          绿
        </a-tag>
      </template>
    </a-table>
    <div class="form_btns">
      <a-button class="reset_btn">
        重置
      </a-button>
      <a-button class="save_btn">
        确定
      </a-button>
    </div>
  </div>
</template>
<script>
const taskColumns =[
  {
    title: '任务名称',
    dataIndex: 'name',
    key: 'name',
    align:'center',
    width:'60%',
    ellipsis: true,
  },
  {
    title: '等级',
    dataIndex: 'level',
    key: 'level',
    align:'center',
    scopedSlots: { customRender: 'level' },
  },
  {
    title: '查看',
    dataIndex: 'detail',
    key: 'detail',
    align:'center',
    scopedSlots: { customRender: 'detail' },
  },
]
const taskData =[
  {
    key:'1',
    name:'希望其实就在每个人心里，一个乐观的人，即使在失意灰暗...',
    level:1,
  },
  {
    key:'2',
    name:'希望其实就在每个人心里，一个乐观的人，即使在失意灰暗...',
    level:2,
  },
  {
    key:'3',
    name:'希望其实就在每个人心里，一个乐观的人，即使在失意灰暗...',
    level:3,
  },
]
export default {
  name:'TaskList',
  data() {
    return {
      taskColumns,
      taskData,
      pagination:{
        current: 1,
        pageSize: 10,
        onChange: this.currentPageChange,
        onShowSizeChange: this.showSizeChange,
        showTotal: (total) => `共 ${total} 条`,
        showSizeChanger: true,
        showQuickJumper: true,
        size:'small'
      },
      rowSelection:{
        type: "checkbox",
        selectedRowKeys: [],
        selectedRows: [],
        selected: false,
        onChange: this.rowSelectionChange,
        onSelectAll: this.rowSelectionSelectAll,
      },
    }
  },
  methods:{
    currentPageChange(page, pageSize) {
      this.pagination.current = page;
      this.pagination.pageSize = pageSize;
    },
    showSizeChange(current, size) {
      this.pagination.current = current
      this.pagination.pageSize = size;
    },
     rowSelectionChange(selectedRowKeys, selectedRows) {
      this.rowSelection.selectedRowKeys = selectedRowKeys;
      this.rowSelection.selectedRows = selectedRows;
    },
    rowSelectionSelectAll(selected) {
      this.rowSelection.selected = selected;
    },
    taskDetail(){

    }
  }
}
</script>