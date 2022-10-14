<template>
  <div id="userTable">
    <div class="table_btns">
      <button class="add_btn" @click="addUser"></button>
        <a-modal v-model="addVisible" title="新增警力资源" centered
        :getContainer="() => this.$window.document.getElementById('userTable')"
        width="42.7vw"
        >
            <template slot="footer">
                <a-button key="submit" type="primary" class="submit_btn" @click="handleAddOk">
                提交
                </a-button>
                <a-button key="back" class="cancel_btn" @click="handleReset">重置</a-button>
            </template>
            <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
                <a-form-item label="姓名">
                <a-input
                    v-decorator="['name', { rules: [{ required: true, message: '请输入姓名' }] }]"
                />
                </a-form-item>
                <a-form-item label="警号">
                <a-input
                    v-decorator="['policeNum', { rules: [{ required: true, message: '请输入警号' }] }]"
                />
                </a-form-item>
               <!--  <a-form-item label="邮箱">
                <a-input
                    v-decorator="['email', { rules: [{ message: '请输入姓名' }] }]"
                />
                </a-form-item> -->
                <a-form-item label="性别">
                <a-select
                    v-decorator="[
                    'sex',
                    { rules: [{ required: true, message: '请选择性别' }] },
                    ]"
                    placeholder="请选择性别"
                >
                    <a-select-option value="1">
                    男
                    </a-select-option>
                    <a-select-option value="2">
                    女
                    </a-select-option>
                </a-select>
                </a-form-item>
                <a-form-item label="所属部门">
                <a-select
                    v-decorator="[
                    'dept',
                    { rules: [{ required: true, message: '请选择部门' }] },
                    ]"
                    placeholder="请选择部门"
                >
                    <a-select-option value="1">
                    部门1
                    </a-select-option>
                    <a-select-option value="2">
                    部门2
                    </a-select-option>
                    <a-select-option value="3">
                    部门3
                    </a-select-option>
                </a-select>
                </a-form-item>
                <a-form-item label="职务">
                <a-input
                    v-decorator="['post', { rules: [{ }] }]"
                />
                </a-form-item>
                <a-form-item label="电话">
                <a-input
                    v-decorator="['tel', { rules: [{ }] }]"
                />
                </a-form-item>
            </a-form>
        </a-modal>
      <button class="import_btn"></button>
      <button class="export_btn"></button>
    </div>
    <div class="table_content">
      <a-table :columns="columns" :dataSource="data" :pagination="pagination">
        <template slot="action">
          <a href="javascript:;" class="detail">查看</a>
          <a href="javascript:;" class="modify">修改</a>
          <a href="javascript:;" class="delete">删除</a>
        </template>
        <template slot="activate">
            <a-switch defaultChecked />
        </template>
      </a-table>
    </div>
  </div>
</template>
<script>
const columns = [
  {
    title: '姓名',
    dataIndex: 'policeName',
    key: 'policeName'
  },
  {
    title: '警号',
    dataIndex: 'policeNum',
    key: 'policeNum'
  },
  {
    title: '性别',
    key: 'sex',
    dataIndex: 'sex'
    // scopedSlots: { customRender: 'tags' }
  },
  {
    title: '所属部门',
    key: 'dept',
    dataIndex: 'dept'
  },
  {
    title: '职务',
    key: 'post',
    dataIndex: 'post'
  },
  {
    title: '电话',
    key: 'tel',
    dataIndex: 'tel'
  },
  {
    title: '添加时间',
    key: 'addDate',
    dataIndex: 'addDate'
  },
  {
    title: '操作',
    key: 'action',
    scopedSlots: { customRender: 'action' }
  }
]
const data = [
  {
    key: '1',
    policeName: 'admin',
    policeNum: '010928',
    sex: '女',
    dept: 'XXXX部',
    post: '警员',
    tel: '15432123456',
    addDate: '2020-03-09 12:32:13'
  },
  {
    key: '2',
    policeName: 'admin',
    policeNum: '010928',
    sex: '女',
    dept: 'XXXX部',
    post: '警员',
    tel: '15432123456',
    addDate: '2020-03-09 12:32:13'
  },
  {
    key: '3',
    policeName: 'admin',
    policeNum: '010928',
    sex: '女',
    dept: 'XXXX部',
    post: '警员',
    tel: '15432123456',
    addDate: '2020-03-09 12:32:13'
  },
  {
    key: '4',
    policeName: 'admin',
    policeNum: '010928',
    sex: '女',
    dept: 'XXXX部',
    post: '警员',
    tel: '15432123456',
    addDate: '2020-03-09 12:32:13'
  },
  {
    key: '5',
    policeName: 'admin',
    policeNum: '010928',
    sex: '女',
    dept: 'XXXX部',
    post: '警员',
    tel: '15432123456',
    addDate: '2020-03-09 12:32:13'
  },
  {
    key: '6',
    policeName: 'admin',
    policeNum: '010928',
    sex: '女',
    dept: 'XXXX部',
    post: '警员',
    tel: '15432123456',
    addDate: '2020-03-09 12:32:13'
  },
  {
    key: '7',
    policeName: 'admin',
    policeNum: '010928',
    sex: '女',
    dept: 'XXXX部',
    post: '警员',
    tel: '15432123456',
    addDate: '2020-03-09 12:32:13'
  },
  {
    key: '8',
    policeName: 'admin',
    policeNum: '010928',
    sex: '女',
    dept: 'XXXX部',
    post: '警员',
    tel: '15432123456',
    addDate: '2020-03-09 12:32:13'
  },
  {
    key: '9',
    policeName: 'admin',
    policeNum: '010928',
    sex: '女',
    dept: 'XXXX部',
    post: '警员',
    tel: '15432123456',
    addDate: '2020-03-09 12:32:13'
  },
  {
    key: '10',
    policeName: 'admin',
    policeNum: '010928',
    sex: '女',
    dept: 'XXXX部',
    post: '警员',
    tel: '15432123456',
    addDate: '2020-03-09 12:32:13'
  },
  {
    key: '11',
    policeName: 'admin',
    policeNum: '010928',
    sex: '女',
    dept: 'XXXX部',
    post: '警员',
    tel: '15432123456',
    addDate: '2020-03-09 12:32:13'
  },
  {
    key: '12',
    policeName: 'admin',
    policeNum: '010928',
    sex: '女',
    dept: 'XXXX部',
    post: '警员',
    tel: '15432123456',
    addDate: '2020-03-09 12:32:13'
  }
]
export default {
  name: 'UserTable',
  data () {
    return {
      data,
      columns,
      pagination: {
        showSizeChanger: true
      },
      addVisible: false,
      form: this.$form.createForm(this, { name: 'coordinated' })
    }
  },
  methods: {
    addUser () {
      this.addVisible = true
    },
    handleAddOk () {
      this.addVisible = false
    },
    handleReset () {
    //   this.addVisible = false
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields(() => {
      })
    }

  }
}
</script>
<style scoped lang="less">
@import "../../assets/style/authority.less";
@import "../../assets/style/authority_modal.less";
</style>
