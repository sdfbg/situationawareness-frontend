<template>
  <div>
    <hr class="line" />
    <h4>任务处置反馈</h4>
    <div class="warn_item">
      <a-row>
        <a-col span="24">
          <label>处置信息：</label>
          <a-input v-if="editable" v-model="task.deal" />
          <span v-else>{{task.deal}}</span>
        </a-col>
      </a-row>
      <a-row>
        <a-col span="24">
          <label>处理人员：</label>
          <a-input v-if="editable" v-model="task.handlerUser" />
          <span v-else>{{task.handlerUser}}</span>
        </a-col>
      </a-row>
    </div>
    <div class="warn_item">
      <a-row>
        <a-col span="24">
          <label>反馈信息：</label>
          <a-input v-if="editable" v-model="task.feedback"/>
          <span v-else>{{task.feedback}}</span>
        </a-col>
      </a-row>
      <a-row>
        <a-col span="24">
          <label>反馈人：</label>
          <a-input v-if="editable" v-model="task.feedbackUser"/>
          <span v-else>{{task.feedbackUser}}</span>
        </a-col>
      </a-row>
    </div>
    <div class="warn_item">
      <a-row>
        <a-col span="24">
          <label style="vertical-align: top"> 文件上传：</label>
          <div class="file_list">
            <div class="file_item" v-for="file in task.images" :key="file.id">
              <img :src="imageTypes.find(i=>i==file.suffix)?file.url:fileImg" />
              <div class="file_opt">
                <a-button v-if="editable" type="link" @click="()=>remove(file)">
                  <img src="../../assets/images/warn/modal/yulan.png" />
                  <span>删除</span>
                </a-button>
                <a-button type="link" @click="()=>download(file)">
                  <img src="../../assets/images/warn/modal/xiazai.png" />
                  <span>下载</span>
                </a-button>
              </div>
            </div>
            <div class="file_item" v-if="editable">
              <a-upload
                action="#"
                :showUploadList="false"
                :customRequest="({ file }) => upload(file)"
                :before-upload="beforeUpload"
              >
                <div>
                  <img src="../../assets/images/warn/modal/add_deal.png"/>
                  <div class="ant-upload-text">点击上传</div>
                </div>
              </a-upload>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import api from "@/api/index";
import FileSaver from 'file-saver';
import fileImg from "../../assets/images/warn/modal/file_img.png";
import { mapState } from "vuex";
const limit = 20 * 1024 * 1024
const limitDes = "20MB"
export default {
  name: "Deal",
  props: {
    editable: Boolean,
  },
  data(){
    return {
      imageTypes: ["png", "gif", "jpg", "jpeg"],
      imageIdBase: 0,
      fileImg,
    }
  },
  computed: {
    ...mapState("dispoal",["task"])
  },
  methods: {
    upload(file) {
      const formData = new FormData();
      formData.append("file", file);
      const imageId = this.getTempImageId();
      const toAdd = {
        filename: file.name,
        url: URL.createObjectURL(file),
        suffix: file.type,
        uploading: true,
        percent: 0,
        id: imageId
      };
      this.task.images.push(toAdd);
      this.$axios
        .post(api.warnImages(), formData, {
          onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            const percent = Math.floor((100 * loaded) / total);
            const index = this.task.images.findIndex((m) => m.id == imageId);
            this.task.images.splice(index, 1, { ...toAdd, percent });
          },
        })
        .then(res => {
          const { id, suffix } = res.data
          const index = this.task.images.findIndex((m) => m.id == imageId);
          this.task.images.splice(index, 1, {
            ...toAdd,
            id: id,
            suffix,
            uploading: false,
          });
        });
    },
    beforeUpload(file) {
      if (file.size == 0) {
        this.$message.error(`不能上传大小为0的照片`);
        return false;
      }
      if (file.size > limit) {
        this.$message.error(`文件大小不能超过 ${limitDes}!`);
        return false;
      }
      return true;
    },
    getTempImageId() {
      let imageId = this.imageIdBase;
      // eslint-disable-next-line no-constant-condition
      while (true) {
        imageId++;
        const imageIdStr = imageId.toString();
        if (this.task.images.findIndex((m) => m.id == imageIdStr) > -1) {
          continue;
        }
        this.imageIdBase = imageId;
        return imageIdStr;
      }
    },
    remove(file){
      const index = this.task.images.findIndex((m) => m.id == file.id)
      this.task.images.splice(index,1)
    },
    download(file) {
      FileSaver.saveAs(file.url, file.filename);
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/style/warn/modal.less";
</style>
