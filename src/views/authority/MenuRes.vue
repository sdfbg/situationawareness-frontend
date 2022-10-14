<template>
  <div class="portal_wrap">
    <Header></Header>
    <div class="portal_content" style="height:calc(100% - 80px)">
      <div class="user_manage">
        <a-row>
          <a-col :span="3" class="left_content">
            <left-nav></left-nav>
          </a-col>
          <a-col :span="20" class="right_content" style="margin-left:0">
            <a-row>
              <a-col :span="5" class="res_list">
                <h2>资源列表</h2>
                <a-button class="add_res"
                  ><a-icon type="plus" />添加资源</a-button
                >
                <div class="res_tree">
                  <div class="tree_btns">
                    <a-checkbox @change="onTreeChange">全选</a-checkbox>
                    <a-button class="multi_del">批量删除</a-button>
                  </div>
                  <a-tree
                    checkable
                    @expand="onExpand"
                    :expandedKeys="expandedKeys"
                    :autoExpandParent="autoExpandParent"
                    v-model="checkedKeys"
                    @select="onSelect"
                    :selectedKeys="selectedKeys"
                    :treeData="treeData"
                  >
                    <template slot="custom_title" slot-scope="item">
                      <span class="tree_text">{{ item.title }}</span>
                      <div class="tree_opts">
                        <img src="../../assets/images/delete.png" height="19" />
                        <img src="../../assets/images/update.png" height="19" />
                        <img src="../../assets/images/view.png" height="19" />
                      </div>
                    </template>
                  </a-tree>
                </div>
              </a-col>
              <a-col :span="19">
                <div class="right_form">
                  <a-button class="recover_btn"
                    ><a-icon type="reload" />恢复至上次备份</a-button
                  >
                  <div style="clear:both"></div>
                  <a-form
                    :form="form"
                    :label-col="{ span: 5 }"
                    :wrapper-col="{ span: 12 }"
                    @submit="handleSubmit"
                  >
                    <a-form-item label="父资源编码">
                      <a-input
                        v-decorator="[
                          'pNum',
                          {
                            rules: [
                              {

                              }
                            ]
                          }
                        ]"
                      />
                    </a-form-item>
                    <a-form-item label="桌面展示图标">
                      <a-input
                        v-decorator="[
                          'icon',
                          {
                            rules: [
                              {

                              }
                            ]
                          }
                        ]"
                      />
                    </a-form-item>
                    <a-form-item label="资源编码">
                      <a-input
                        v-decorator="[
                          'resNum',
                          {
                            rules: [
                              {

                              }
                            ]
                          }
                        ]"
                      />
                    </a-form-item>
                    <a-form-item label="资源名称">
                      <a-input
                        v-decorator="[
                          'resName',
                          {
                            rules: [
                              {

                              }
                            ]
                          }
                        ]"
                      />
                    </a-form-item>
                    <a-form-item label="图片地址">
                      <a-input
                        v-decorator="[
                          'imgUrl',
                          {
                            rules: [
                              {

                              }
                            ]
                          }
                        ]"
                      />
                    </a-form-item>
                    <a-form-item label="URL">
                      <a-input
                        v-decorator="[
                          'url',
                          {
                            rules: [
                              {

                              }
                            ]
                          }
                        ]"
                      />
                    </a-form-item>
                    <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
                      <a-button type="primary" html-type="submit" class="confirm_btn">
                        确定
                      </a-button>
                    </a-form-item>
                  </a-form>
                </div>
              </a-col>

            </a-row>

          </a-col>
        </a-row>
        <Footer></Footer>
      </div>
    </div>
  </div>
</template>
<script>
import Header from '../common/Header.vue'
import LeftNav from './LeftNav.vue'
import Footer from '../common/Footer.vue'
const treeData = [
  {
    title: '社会面管控应用',
    key: '0-0',
    scopedSlots: { title: 'custom_title' },
    children: [
      {
        title: '治安态势',
        key: '0-0-0',
        children: [
          { title: '0-0-0-0', key: '0-0-0-0' },
          { title: '0-0-0-1', key: '0-0-0-1' },
          { title: '0-0-0-2', key: '0-0-0-2' }
        ]
      },
      {
        title: '基础排查',
        key: '0-0-1',
        children: [
          { title: '重点人排查', key: '0-0-1-0' },
          { title: '重点车辆排查', key: '0-0-1-1' },
          { title: '重点区域排查', key: '0-0-1-2' }
        ]
      },
      {
        title: '窝点聚焦',
        key: '0-0-2'
      }
    ]
  },
  {
    title: '可视化指挥',
    key: '0-1',
    scopedSlots: { title: 'custom_title' },
    children: [
      { title: '我的地图', key: '0-1-0-0' },
      { title: '精确督导', key: '0-1-0-1' },
      { title: '勤务督导', key: '0-1-0-2' }
    ]
  },
  {
    title: '人像大数据',
    key: '0-2',
    scopedSlots: { title: 'custom_title' }
  }
]
export default {
  name: 'MenuRes',
  data () {
    return {
      expandedKeys: [],
      autoExpandParent: true,
      checkedKeys: [],
      selectedKeys: [],
      treeData,
      form: this.$form.createForm(this, { name: 'coordinated' })
    }
  },
  components: {
    Header,
    LeftNav,
    Footer
  },
  methods: {
    onExpand (expandedKeys) {
      this.expandedKeys = expandedKeys
      this.autoExpandParent = false
    },
    onCheck (checkedKeys) {
      this.checkedKeys = checkedKeys
    },
    onSelect (selectedKeys) {
      this.selectedKeys = selectedKeys
    },
    onTreeChange () {
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
@import "../../assets/style/public.less";
@import "../../assets/style/authority.less";
</style>
