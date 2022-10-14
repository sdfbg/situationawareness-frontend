<template>
    <div class="left_slide" id="leftSlide">
        <div class="side_item" @click="foldAdd">
            <img src="../../assets/images/fold_add.png"/>
        </div>
        <a-modal title="添加文件夹"
         v-model="addVisible" centered
         :getContainer="() => this.$window.document.getElementById('leftSlide')"
         width='680px'
         :afterClose = "afterClose"
         >
            <div class="left_modal">
                <a-form-model>
                  <i style="color:red;font-size:35px;vertical-align:middle;position: absolute;left: 50px">*</i>
                    <a-form-model-item label="文件夹名称" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }" >
                        <a-input v-model="groupName"
                                 :maxLength = "255"
                        />
                    </a-form-model-item>
                  <!--<a-form-model-item label="备注" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }" >
                    <a-textarea  v-model="remark"   />
                    </a-form-model-item>-->
                </a-form-model>
            </div>
            <template slot="footer">
                <a-button key="submit" type="primary"  @click="handleAddOk">
                确定
                </a-button>
                <a-button key="back" @click="handleAddCancel">取消</a-button>
            </template>
        </a-modal>
        <div class="side_item" @click="foldDel">
          <img src="../../assets/images/del_icon.png"/>
            <!--<img src="../../assets/images/fold_delete.png"/>-->
        </div>
        <div class="side_item" @click="addAppLicationin" @contextmenu.prevent="appCheckRightClick">
            <img src="../../assets/images/add_icon.png"/>
        </div>
        <!-- <div class="side_item" @click="addAppLicationout" @contextmenu.prevent="appCheckRightClick">
            <img src="../../assets/images/add_icon.png"/>
        </div> -->
        <a-modal title="添加应用"
         v-model="appModal" centered
         :getContainer="() => this.$window.document.getElementById('leftSlide')"
         width='680px'
         >
            <div class="left_modal">
                <a-form-model>
                    <a-form-model-item label="应用名称" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }" >
                        <a-input  />
                    </a-form-model-item>
                    <a-form-model-item label="路由地址" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }" >
                        <a-input  />
                    </a-form-model-item>
                    <a-form-model-item label="应用图标" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }" >
                        <a-upload
                            name="avatar"
                            listType="picture-card"
                            class="avatar-uploader"
                            :showUploadList="false"
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            :beforeUpload="beforeUpload"
                            @change="handleChange"
                        >
                            <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
                            <div v-else>
                            <a-icon :type="loading ? 'loading' : 'plus'" />
                            <div class="ant-upload-text">Upload</div>
                            </div>
                        </a-upload>
                    </a-form-model-item>
                </a-form-model>
            </div>
            <template slot="footer">
                <a-button key="submit" type="primary"  @click="handleAppOk">
                确定
                </a-button>
                <a-button key="back" @click="handleAppCancel">取消</a-button>
            </template>
        </a-modal>
        <!--<div class="side_item">
            <img src="../../assets/images/edit_icon.png"/>
        </div>-->
        <!--<div class="side_item">
            <img src="../../assets/images/del_icon.png"/>
        </div>-->
    </div>
</template>
<script>
import event from '../../event'
function getBase64 (img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
export default {
  name: 'LeftSlide',
  data () {
    return {
      addVisible: false,
      appModal: false,
      groupName: '',
      loading: false,
      imageUrl: '',
      remark:'',
    }
  },
  methods: {
    foldAdd () {
      this.addVisible = true
    },
    foldDel () {
      event.$emit('switch-delete-group-mode')
    },
    handleAddOk () {
      if(this.groupName.length==0){
        this.success('应用组名称不能为空！');
        return;
      }
      const group ={};
      group.groupName = this.groupName;
      group.remark = this.remark;
      event.$emit('add-group', group, ()=>this.addVisible=false)
    },
    //完全关闭后的回调
    afterClose(){
      this.addVisible = false;
      this.groupName= '';
      this.remark='';
    },
    handleAddCancel () {
      this.addVisible = false;
      this.groupName= '';
        this.remark='';
    },
    //点击添加按钮,加组件
    addAppLicationout() {
      this.appModal = true;
      event.$emit('relate-group-appsout');//打开应用的checkbox
    },
    //点击添加按钮，拖组件
    addAppLicationin() {
      // this.appModal = true;
      event.$emit('relate-group-apps');//打开应用的checkbox
    },
    //右键添加按钮
    appCheckRightClick () {
      event.$emit('close-relation-mode');//取消checkbox
    },
    handleAppOk () {
      this.appModal = false
    },
    handleAppCancel () {
      this.appModal = false
    },
    // 上传图片
    handleChange (info) {
      if (info.file.status === 'uploading') {
        this.loading = true
        return
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl => {
          this.imageUrl = imageUrl
          this.loading = false
        })
      }
    },
    beforeUpload (file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        this.$message.error('You can only upload JPG file!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('Image must smaller than 2MB!')
      }
      return isJpgOrPng && isLt2M
    },
    success(msg) {
        this.$success({
          title: '成功信息提示',
          content: msg,
        });
    },
  }
}
</script>
<style scoped lang='less'>
@import '../../assets/style/desktop.less';
</style>
