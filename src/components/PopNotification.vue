<template>
  <div ref="page"> 
  </div>
</template>
<script>
export default {
  name:'PopNotification',
  methods:{
    showConfirm() {
      let that = this
      this.$confirm({
        title: '是否要将该预警推送至指挥调度平台?',
        content: () => <div style="color:red;">推送后将在指挥调度平台上处置该预警信息！</div>,
        centered:true,
        getContainer:()=>that.$refs.page,
        onOk() {
          that.$message.success("成功")
        },
        onCancel() {
          console.log('Cancel');
        },
        class: 'custom',
      });
    },
  }
}
</script>
<style lang="less" scoped>
@deep:~">>>";
//@import "../../assets/style/warn/modal.less";
  @{deep}.custom{
  .ant-modal-content{
     background: url("~@/assets/images/del_modal_bg.png") no-repeat;
     background-size: 100% 100%;
     max-height: none;
     min-height: fit-content;
  }
  }
@{deep}.ant-modal-confirm-body > .anticon{
  font-size: .3rem;
}
@{deep}.ant-modal-confirm-body .ant-modal-confirm-title{
  color: #fff;
  font-size: .18rem;
}
@{deep}.ant-modal-confirm-btns{
  float: none;
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  button{
    margin: 0 .1rem;
     width: 1.22rem;
     height: .4rem;
     background: url("~@/assets/images/warn/modal/btn-bg2.png") no-repeat;
     background-size: 100% 100%;
     color: #fff;
     border: none;
    &.ant-btn-primary{
     background: url("~@/assets/images/warn/modal/btn-bg1.png") no-repeat;
     background-size: 100% 100%;
    }
  } 
}
</style>