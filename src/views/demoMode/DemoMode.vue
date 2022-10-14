<template>
  <div class="portal_wrap">
    <Header></Header>
    <div class="portal_content" id="certify" style="height:calc(100% - 8vh)">
      <div class="demo_top">
        <swiper ref="mySwiper" :options="swiperOptions" v-if="demoData.length>0">
          <swiper-slide v-for="(item,i) in demoData" :key="i">
            <div class="slide_content selected">

              <a-tooltip>
                <template placement="top" slot="title">
                  {{item.name}}
                </template>
                <h2 class="slide_title">{{item.title}}</h2>

              </a-tooltip>


              <div class="slide_list">
                <a-carousel style="width:100%">
                  <div
                    class="list_item"
                    v-for="(innerItem,index) in demoData[i].childrenAfter"
                    :key="index"
                  >
                    <div
                      style="width:30%;float:left"
                      v-for="(childrenData,childrenIndex) in innerItem"
                      :key="childrenIndex"
                      @click="handleAppClick(childrenData)"
                    >
                      <div class="item_thumb" :style="'background:' + colorArr[i]">
                        <img :src="childrenData.imgUrl" height="40" />
                      </div>
                      <p>{{childrenData.text}}</p>
                    </div>
                  </div>
                </a-carousel>

              </div>
            </div>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </div>
      <div class="demo_bottom">
        <a-carousel arrows class="demo_carousel" :dots="false">
          <div slot="prevArrow" class="custom-slick-arrow">
            <img src="../../assets/images/left-foot.png" />
          </div>
          <div slot="nextArrow" class="custom-slick-arrow">
            <img src="../../assets/images/right-foot.png" />
          </div>
          <div class="demo_apps" v-for="(app,appIndex) in appdata" :key="appIndex">
            <div class="demo_box">
              <div class="app_detail"
                   v-for="(innerApp,j) in appdata[appIndex]" :key="j"
                   @click="handleAppClick(innerApp)">
                <!--<div :class="isClick==innerApp.id?'detail_thumb active':'detail_thumb'" :style="'background:' + colorArr[Math.round(Math.random(j) * 10)-1]">-->
                <div :class="isClick==innerApp.id?'detail_thumb active':'detail_thumb'" :style="'background:' + colorArr[0]">
                  <img :src="innerApp.imgUrl"  />
                </div>
                <p :class="isClick==innerApp.id+j?'active':''">{{innerApp.text}}</p>
              </div>
            </div>
          </div>
        </a-carousel>
      </div>
    </div>
  </div>
</template>
<script>
  import api from "@/api"
  import Header from '../common/Header.vue'

  export default {
    name: 'DeskMode',
    components: {
      Header
    },

    data () {
      const _this = this
      return {
        userId:"",
        demoData:[],
        appdata: [],
        listdata:[],
        index: 0,
        isClick: '',
        userInfo:{},
        swiperOptions: {
          watchSlidesProgress: true,
          slidesPerView: '5',
          centeredSlides: true,
          loop: true,
          autoplay: false,
          loopedSlides: 5,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
          pagination: {
            el: '.swiper-pagination'
            // clickable :true,
          },
          on: {
            progress: function () {
              for (var i = 0; i < this.slides.length; i++) {
                var slide = this.slides.eq(i)
                var slideProgress = this.slides[i].progress
                var modify = 1
                if (Math.abs(slideProgress) > 1) {
                  modify = (Math.abs(slideProgress) - 1) * 0.3 + 1
                }
                var translate = (slideProgress * modify * 190)*100/1920 + 'vh'
                var scale = 1 - Math.abs(slideProgress) / 9
                var zIndex = 999 - Math.abs(Math.round(10 * slideProgress))
                slide.transform(
                  'translateX(' + translate + ') scale(' + scale + ')'
                )
                slide.css('zIndex', zIndex)
                slide.css('opacity', 1)
                if (Math.abs(slideProgress) > 3) {
                  slide.css('opacity', 0)
                }
              }
            },
            setTransition: function (transition) {
              for (var i = 0; i < this.slides.length; i++) {
                var slide = this.slides.eq(i)
                slide.transition(transition)
              }
            },
            transitionEnd: function () {
              // let userInfo = JSON.parse(localStorage.getItem('userInfo'));
              // let userId = userInfo.userid;
              _this.$axios.get(api.myApplicationGroup()).then(res=>{
                let demoArr = [];
                res.data.forEach(e=>{
                  let foldMap ={};
                  foldMap.id = e.id;
                  foldMap.name = e.name;
                  foldMap.title = e.name;
                  foldMap.userid = e.userid;
                  let imgArr = [];
                  if(e.applications.length>0){
                    e.applications.forEach(d=>{
                      let imgMap = {};
                      imgMap.imgUrl = api.applicationLogo(d.id);
                      imgMap.linkUrl = d.linkUrl;
                      imgMap.text = d.name;
                      imgMap.id = d.id;
                      imgArr.push(imgMap)
                    });
                  }
                  foldMap.children = imgArr;
                  demoArr .push(foldMap)
                })
                _this.index = this.realIndex
                _this.formatterApp(demoArr)//计算文件夹
                // _this.formatterApp()//计算文件夹

                // this.getMyApplication();//获取应用组
              })


            }
          }
        },
        colorArr: [
          'linear-gradient(#6174c5, #050c9c)',
          // 'linear-gradient(#FEA488, #E24413)',
          // 'linear-gradient(#87ABF6, #4066C5)',
          // 'linear-gradient(#90E958, #60BD4A)',
          // 'linear-gradient(#FB73D0, #D41998)',
          // 'linear-gradient(#58C9FE, #0591CD)',
          // 'linear-gradient(#E89FFF, #DC69FF)',
          // 'linear-gradient(#C3A78B, #8A7055)',
          // 'linear-gradient(#FDA285, #E24414)',
          // 'linear-gradient(#F9B87E, #CE7321)'
        ]
      }
    },
    mounted () {
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
      this.userId = this.userInfo.userid;
      this.getMyApplicationGroup();//获取应用管理组

    },
    methods: {
      getMyApplicationGroup(){
        this.demoData = [];
        this.$axios.get(api.groupApplications()).then(res=>{
          res.data.forEach(e=>{
            let foldMap ={};
            foldMap.id = e.id;
            foldMap.name = e.name;

            if (e.name.length > 15) {
              foldMap.title=e.name.slice(0, 15) + "...";
            }else{
              foldMap.title = e.name;
            }
            foldMap.userid = e.userid;
            let imgArr = [];
            if(e.applications.length>0){
              e.applications.forEach(d=>{

                let imgMap = {};
                imgMap.imgUrl = api.applicationLogo(d.id);
                imgMap.linkUrl = d.linkUrl;
                imgMap.text = d.name;
                imgMap.id = d.id;
                imgArr.push(imgMap)
              });
            }
            foldMap.children = imgArr;
            this.demoData .push(foldMap)
          })
          this.formatterApp(this.demoData)//计算文件夹
          this.cautionDemoChildrenData();
            // this.formatterList(this.demoData);

          // this.getMyApplication();//获取应用组

        })
      },
      // 按6个一屏幕进行循环
      cautionDemoChildrenData () {

        for (let i = 0; i < this.demoData.length; i++) {
          let len = Math.ceil(this.demoData[i].children.length / 6)
          let data = []
          for (let j = 0; j < len; j++) {
            data[j] = this.demoData[i].children.slice(0, 6)
          }
          this.demoData[i].childrenAfter = data
        }
      },
      formatterApp (demoData) {

        this.appdata = demoData[this.index].children
        const app = []
        const n = Math.ceil(this.appdata.length / 8) - 1
        for (let i = 0; i <= n; i++) {
          app.push(this.appdata.slice(i * 8, (i + 1) * 8))
        }
        this.appdata = app
      },
      handleAppClick (data) {
        this.isClick = data.id
        // this.$router.push('/map');
        // window.location.href ='http://localhost:8088/#/map';
        if(data.linkUrl.indexOf("http")>-1){
          window.open(data.linkUrl);
        }

      }
    },

  }
</script>
<style scoped lang="less">
  @import "../../assets/style/public.less";
  @import "../../assets/style/custom_swiper.less";
  @import "../../assets/style/demo.less";
  /* For demo */
  .ant-carousel {
    overflow: hidden;
    width: 100%;
  }
  .ant-carousel  .slick-slide {
    text-align: center;
    // height: 160px;
    // line-height: 160px;
    background: #364d79;
    overflow: hidden;
  }

  .ant-carousel  .slick-slide h3 {
    color: #fff;
  }


</style>
