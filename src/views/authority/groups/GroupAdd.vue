<template>
  <a-modal
    v-model="thisModalVisible"
    :title="title"
    centered
    :getContainer="() => this.$window.document.getElementById(this.containerId)"
    width="820px"
    wrapClassName = "add_gruop_modal"
  >
    <template slot="footer">
      <a-button key="submit" @click="submit" type="primary" class="submit_btn">提交</a-button>
      <a-button key="back" @click="cancel" class="cancel_btn">取消</a-button>
    </template>
    <a-form-model
      ref="form"
      :model="group"
      :rules="rules"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 12 }"
    >
      <a-form-model-item label="应用组名称">
        <a-input v-model="group.name" />
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>
<script>
import api from "../../../api";
export default {
  data() {
    return {
      group: {
        name: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入应用组名称",
            trigger: "blur"
          }
        ]
      },
      thisModalVisible: false
    };
  },
  props: {
    modalVisible: {
      required: true,
      type: Boolean
    },
    containerId: {
      required: true,
      type: String
    },
    mode: {
      required: false,
      default: "add",
      type: String,
      validator: function(value) {
        return ["add", "edit"].indexOf(value) !== -1;
      }
    },
    form: {
      required: false,
      type: Object
    }
  },
  watch: {
    modalVisible: function() {
      this.thisModalVisible = this.modalVisible;
      if (this.modalVisible && this.mode == "add") {
        this.group.name = "";
      } else if (this.modalVisible && this.mode == "edit") {
        this.group.name = this.form.name;
        this.group.id = this.form.id;
      }
    },
    thisModalVisible: function() {
      if (this.thisModalVisible) return;
      this.$emit("update:modalVisible", this.thisModalVisible);
    }
  },
  computed: {
    title: function() {
      let title;
      switch (this.mode) {
        case "add":
          title = "添加应用组";
          break;
        case "edit":
          title = "修改应用组";
          break;
        default:
          title = "添加应用组";
          break;
      }
      return title;
    }
  },
  methods: {
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          let type = this.mode == "edit" ? "put" : "post";
          let url =
            this.mode == "edit"
              ? `${api.applicationGroups()}/${this.group.id}`
              : api.applicationGroups();
          this.$axios[type](url, this.group).then(res => {
            this.$notification.success({
              message: "操作成功",
              description: "操作提示"
            });
            if (this.mode == "add") {
              this.$emit("add-group-success", res.data);
            } else {
              this.$emit("edit-group-success", this.group);
            }
            this.thisModalVisible = false;
          });
        }
      });
    },
    cancel() {
      this.thisModalVisible = false;
    }
  }
};
</script>
<style scoped lang="less">
@import "../../../assets/style/authority_modal.less";
</style>
