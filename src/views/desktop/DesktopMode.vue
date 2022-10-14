<template>
    <div class="portal_wrap">
        <Header></Header>
        <div class="portal_content">
            <a-row>
                <a-col :span="2">
                    <left-slide></left-slide>
                </a-col>
                <a-col :span="20">
                    <right-content></right-content>
                </a-col>
            </a-row>
            <Footer></Footer>
        </div>

    </div>
</template>
<script>
import Header from '../common/Header.vue'
import LeftSlide from './LeftSilde.vue'
import RightContent from './RightContent.vue'
import Footer from '../common/Footer.vue'
export default {
  name: 'DesktopMode',
  components: {
    Header,
    LeftSlide,
    RightContent,
    Footer
  }
}
</script>
<style scoped lang='less'>
@import '../../assets/style/public.less';
/deep/.right_content .app_list .app_item p {
    text-align: center;
    font-size: 1.73vh;
    margin-top: 10px;
    font-weight: bold;
    width: 12.2vh;
    /* max-width: 438px; */
    color: #fff;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
