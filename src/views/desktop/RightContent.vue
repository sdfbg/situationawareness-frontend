<template>
  <div class="right_content" id="deskContent">
    <div class="desk_search">
      <a-input-search
        v-model="searchVal"
        placeholder="请输入关键字"
        @search="getMyApplicationGroup"
        enterButton
      />
    </div>
    <!-- 点开文件夹的弹窗 -->
    <a-modal
      v-model="showGroupDetail"
      :getContainer="() => this.$window.document.getElementById('deskContent')"
      :footer="null"
      centered
      width="680px"
    >
      <template slot="title">
        <a-tooltip placement="top">
          <template slot="title">
            <span>{{ this.currentDetailGroup.name }}</span>
          </template>
          <P class="fold_title">{{ this.currentDetailGroup.title }}</P>
        </a-tooltip>
      </template>
      <div class="app_details" style="overflow: auto;">
        <a-carousel>
          <div
            class="modal_apps"
            v-for="(app, j) in currentDetailGroup.apps"
            :key="j"
          >
            <div class="app_item_modal" v-for="(innerApp, k) in app" :key="k">
              <div class="app_thumb_modal" @click="handleAppClick(innerApp)">
                <img :src="innerApp.img" />
              </div>
              <p>{{ innerApp.title }}</p>
            </div>
          </div>
        </a-carousel>
      </div>
    </a-modal>
    <!-- 弹窗 -->
    <a-carousel class="app_list" style="height: calc(90% - 40px);"> 
        <!-- 文件夹显示 -->
        <!-- <a-row class="right_top" v-show="isRightTop">
          <a-col
            :span="4"
            class="folder_item"
            v-for="group in groupPage"
            :key="group.id"
          >
            <div v-show="onDeleteMode">
              <div class="del_icon" @click="deleteGroup(group.id)">
                <a-icon type="close" />
              </div>
            </div> -->
            <!-- 文件夹本夹 -->
            <!-- <div
              class="app_icons"
              @click="showGroupApps(group)"
              @contextmenu.prevent="rightClickGroup(group)"
              :class="
                group == currentRelationGroup ? 'styleClass_wathet' : 'styleClass_blue'
              "
            >
              <img
                :src="app.img"
                v-for="(app, i) in group.applications.slice(0, 6)"
                :key="i"
              />
            </div> -->
            <!-- 文件夹名称显示 -->
            <!-- <a-tooltip>
              <template slot="title">
                {{ group.name }}
              </template>

              <a-input
                class="foldName_class"
                :defaultValue="group.title"
                :id="group.id"
                :maxLength="255"
                @pressEnter="pressEnter"
              />
            </a-tooltip>
          </a-col>
        </a-row> -->
        <!-- 组件显示 -->
        <div style="height:500px;overflow:auto;width:1200px" class="overflowClass">
          <!-- <a-checkbox-group v-model="goRelatedAppIds" > -->
            <div
              class="app_item"
              v-for="(app, i) in standaloneApps"
              :key="app.id"
            >
              <!-- <a-checkbox
                v-show="onRelationMode"
                :value="app.id"
              ></a-checkbox> -->
              <div
                class="app_thumb"
                @click="handleAppClick(app)"
                :style="
                  'background:' + colorArr[Math.round(Math.random(i) * 3) - 1]
                "
                :title="app.title">
                <img :src="app.img" />
              </div>
              <a-tooltip placement="top">
                <template #title>
                  <span>{{ app.title }}</span>
                </template>
              <p>{{ app.title }}</p>
              </a-tooltip>
              <!--  -->
            </div>
          <!-- </a-checkbox-group> -->
        </div>
    </a-carousel>
  </div>
</template>
<script>
import api from "@/api";
import event from "../../event";

export default {
  name: "RightContent",
  inject: ["reload"],
  data() {
    return {
      searchVal: "",
      showGroupDetail: false,
      onDeleteMode: false,
      currentDetailGroup: {
        applications: [],
      },
      currentRelationGroup: null,
      colorArr: [
        "linear-gradient(#6174c5, #050c9c)",
        "linear-gradient(#58C9FE, #0591CD)",
        "linear-gradient(#C3A78B, #8A7055)",
      ],
      onRelationMode: true, //是否展示checkbox
      checkAloneFlod: [], //选中文件夹
      isRightTop: true,
      groups: [],
      allApps: [],
      goRelatedAppIds: []
    };
  },
  computed: {
    groupPages() {
      if (this.groups.length == 0) return [];
      const groupPages = [];
      const len = Math.ceil(this.groups.length / 6) - 1;
      for (let i = 0; i <= len; i++) {
        groupPages.push(this.groups.slice(i * 6, (i + 1) * 6));
      }
      return groupPages;
    },
    standaloneApps() {
      const apps = this.allApps;
      return apps.map((a) => ({
        ...a,
        title: a.name,
        img: api.applicationLogo(a.id),
        checked: true
      })).filter(a=>{
        if(!this.searchVal) return true
        return a.name.indexOf(this.searchVal)>-1
      });
    },
    appIdsInGroups(){
      const ids = new Set();
      this.groups.forEach(g=>g.applications.forEach(app=>ids.add(app.id)))
      // if(this.currentRelationGroup){
      //   this.currentRelationGroup.applications.forEach(app=>ids.delete(app.id))
      // }
      return ids;
    }
  },
  
  mounted() {
    event.$on("add-group", this.addGroup);
    event.$on("switch-delete-group-mode", this.switchDeleteGroupMode);
    event.$on("relate-group-apps", this.relateGroupApps); //打开应用的checkbox，拖组件
    event.$on("relate-group-appsout", this.relateGroupAppsout); //打开应用的checkbox,加组件
    event.$on("close-relation-mode", ()=>this.onRelationMode = false); //取消checkbox
    this.getMyApplicationGroup(); //获取应用管理组
  },
  beforeDestroy() {
    event.$off("add-group", this.addGroup);
  },
  methods: {
    toHarvest() {
      let route = this.$router.resolve({
        path: "/harvest"
      });
      window.open(route.href, "_blank");
    },
    getMyApplicationGroup() {
      this.$axios.get(api.groupApplications()).then((res) => {
        this.groups = res.data;
        this.groups.forEach((group) => {
          group.title =
            group.name.length > 15
              ? group.name.slice(0, 8) + "..."
              : group.name;
          group.applications.forEach((app) => {
            app.img = api.applicationLogo(app.id);
            app.title = app.name;
          });
        });
        this.getMyApplication(); //获取应用
      });
    },
    getMyApplication() {
      this.$axios.get(api.applications()).then((res) => {
        //let data = res.data;
        this.allApps = res.data.map(app=>({
          ...app,
          img : api.applicationLogo(app.id),
          title : app.name
        }));
       // console.log(this.allApps);
      });
    },
    //按下回车的回调-修改应用组名称
    pressEnter(e) {
      if (e.target.value.length == 0) {
        this.success("应用组名称不能为空！");
        return;
      }
      if (this.groups.filter((g) => g.name == e.target.value).length > 0) {
        this.success("应用组已存在，不能重复修改！");
        return;
      }
      this.$axios
        .put(api.editApplicationGroup(e.target.id, e.target.value))
        .then(() => {
          this.groups.find((g) => g.id == e.target.id).name = e.target.value;
          this.success("修改成功");
        });
    },
    showGroupApps(group) {
      this.currentDetailGroup = group;
      const apps = [];
      if (this.currentDetailGroup.applications.length != 0) {
        const n = Math.ceil(this.currentDetailGroup.applications.length / 8) - 1;
        for (let i = 0; i <= n; i++) {
          apps.push(this.currentDetailGroup.applications.slice(i * 8, (i + 1) * 8));
        }
      }
      this.currentDetailGroup.apps = apps;
      this.showGroupDetail=true
    },
    // 添加文件夹
    addGroup(group, callback) {
      let duplicateNamed = false;
      this.groups.forEach((g) => {
        if (g.name == group.groupName) {
          duplicateNamed = true;
        }
      });
      if (duplicateNamed) {
        this.success("应用组已存在，不能重复添加！");
        return;
      }
      this.$axios
        .post(api.addApplicationGroup(group.groupName, group.remark))
        .then((res) => {
          const name = group.groupName;
          const title = name.length > 15 ? name.slice(0, 8) + "..." : name;
          const applications = [];
          const id = res.data;
          this.groups.push({
            name,
            title,
            applications,
            id,
          });
          this.success("应用管理组添加成功");
          callback();
        });
    },
    // 删除文件夹
    switchDeleteGroupMode() {
      this.onDeleteMode = !this.onDeleteMode
    },
    //右击文件夹
    rightClickGroup(group) {
      this.currentRelationGroup=this.currentRelationGroup==group?null:group
    },
    // 往文件夹里添加应用
    relateGroupApps() {
      if (!this.currentRelationGroup) {
        // this.success('请选择应用组！');
        return false;
      }
      if (this.onRelationMode) {
        this.$confirm({
          title: "是否确认添加此应用！",
          closable: true,
          // content: (<div><h2 class='del_info'>提示信息</h2></div>),
          getContainer: () => document.getElementById("deskContent"),
          class: "delModal",
          centered: true,
          cancelText: "取消",
          okText: "确认",
          onOk:()=>{
            this.addAppsToGroup(); //确认添加
          },
          onCancel() {},
        });
      } else {
        this.onRelationMode = true;
        this.goRelatedAppIds = this.currentRelationGroup.applications.map(a=>a.id)
      }
    },
    relateGroupAppsout(){

    },
    //确认添加
    addAppsToGroup() {
      const strAppid = this.goRelatedAppIds.join(",");
      this.$axios
        .post(api.InsertApp_group_app(this.currentRelationGroup.id, strAppid))
        .then(() => {
          this.currentRelationGroup.applications=[]
          let apps=[];
          for(let i=0;i<this.allApps.length;i++){
            for(let j=0;j<this.goRelatedAppIds.length;j++){
              if(this.allApps[i].id == this.goRelatedAppIds[j]){
                apps.push(this.allApps[i]);
              }
            }
          }
          //this.currentRelationGroup.applications.push(this.allApps.filter(a=>this.goRelatedAppIds.findIndex(i=>i==a.id)>-1))
          this.currentRelationGroup.applications = apps
          this.goRelatedAppIds = []
          this.success("应用管理添加成功");
          this.onRelationMode = false
        });
    },
    deleteGroup(id) {
      this.$confirm({
        title: "您确认要删除此记录吗？此操作不可恢复！",
        closable: true,
        getContainer: () => document.getElementById("deskContent"),
        class: "delModal",
        centered: true,
        cancelText: "取消",
        okText: "确认",
        onOk:()=>{
          this.deleteGroupById(id); //删除应用组
        },
      });
    },
    //删除应用组
    deleteGroupById(group_id) {
      this.$axios.delete(api.applicationGroups(group_id)).then(() => {
        this.groups.splice(
          this.groups.findIndex((g) => g.id == group_id),
          1
        );
        this.success("删除成功");
      });
    },
    handleAppClick(data) {
      if (data.linkUrl.indexOf("http") > -1) {
        window.open(data.linkUrl);
      } else {
        let route = this.$router.resolve({
        path: "/harvest"
      });
      window.open(route.href, "_blank");
      }
    },
    success(msg) {
      this.onRelationMode = false //是否展示checkbox
      this.checkAloneFlod = [] //选中文件夹
      this.$success({
        title: "信息提示",
        // JSX support
        content: msg,
      });
    },
  },
};
</script>
<style scoped lang="less">
@import "../../assets/style/desktop.less";
/deep/.styleClass_wathet {
  background: url(../../assets/images/folder_blue.png) center center no-repeat;
}
/deep/.styleClass_blue {
  background: url(../../assets/images/folder_bg.png) center center no-repeat;
}
/deep/ .ant-checkbox-group {
  display: block;
}
.foldName_class {
  background-color: #00275c;
  height: 6.0vh;
  border-radius: 6px 0 0 6px;
  color: rgb(221, 192, 192);
  width: 80%;
  border: none;
  text-align: center;
}
.fold_title {
  width: 90%;
  margin: 0 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
/deep/.ant-carousel .slick-dots-bottom{
  bottom:-50px
}
/*定义滑块颜色、内阴影及圆角*/
::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}
::-webkit-scrollbar-thumb {
  border-radius: 7px;
  /*-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);*/
  background: #00ffff;
  width: 6px;
}


/*定义右下角汇合处的样式*/
::-webkit-scrollbar-corner {
  background: khaki;
}
/deep/.foldName_class {
    background-color: #00275c;
    height: 4.5vh;
    border-radius: 6px 0 0 6px;
    color: #ddc0c0;
    width: 79%;
    border: none;
    text-align: center;
    font-size: 18px;
}
</style>
