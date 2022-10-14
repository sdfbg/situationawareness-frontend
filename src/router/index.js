import Vue from 'vue'
import VueRouter from 'vue-router'
import {
  getToken
} from '@/api/store.js'
Vue.use(VueRouter)
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location,onResolve, onReject) {
  if (onResolve || onReject)
    return routerPush.call(this, location, onResolve, onReject);
  return routerPush.call(this, location).catch((err) => err);
  // return routerPush.call(this, location).catch(error => error)
}
export const warnMenus = {
  path: "/warnList",
  name: "WarnList",
  meta: {
    title: "预警中心",
    icon: require("@/assets/images/menu/yjly.png"),
    admin: true,
  },
  component: () => import("@/views/warn/WarnList.vue")
}
export const taskMenus = [
  {
    path: "/all",
    name: "all",
    meta: {
      title: "任务中心",
      icon: require("@/assets/images/menu/yjly.png"),
    },
    component: () => {
      const admin = JSON.parse(localStorage.getItem("userInfo")).admin
      return admin==1?import("@/views/disposal/AllTaskBase.vue"):import("@/views/disposal/TaskTable.vue")
    }
  },
]
export const harvestMenus = [
  {
    path: "/harvest",
    name: "harvest",
    meta: {
      title: "任务中心",
      icon: require("@/assets/images/menu/yjly.png"),
    },
    component: () => import("@/views/disposal/VehicleApply.vue")
  }
]
export const chartMenus=[
  {
    path: "/person",
    name: "person",
    meta: {
      name: "驾驶人"
    },
    component: () => import("@/views/person/Person.vue")
  },
  {
    path: "/car",
    name: "car",
    meta: {
      name: "机动车"
    },
    component: () => import("@/views/car/Car.vue")
  },
  {
    path: "/road",
    name: "road",
    meta: {
      name: "道路"
    },
    component: () => import("@/views/road/Road.vue")
  },
  {
    path: "/business",
    name: "business",
    meta: {
      name: "企业"
    },
    component: () => import("@/views/business/Business.vue")
  },
  {
    path: "/accident",
    name: "accident",
    meta: {
      name: "管理",
    },
    component: () => import("@/views/manage/ManageAccident.vue")
  },
  {
    path: "/illegal",
    name: "illegal",
    meta: {
      name: "管理违法",
      hidden: true,
    },
    component: () => import("@/views/manage/ManageIllegal.vue")
  },
]
const routes = [
  {
    path: "/login",
    name: "login",
    component:
      process.env.VUE_APP_NET == "GONGAN"
        ? () => import("../views/login/Login.vue")
        : () => import("@/views/login/LoginNet.vue")
  },
  {
    path: "/warn_detail",
    name: "warnDetail",
    component: () => import("@/views/disposal/SingleTaskFlow.vue")
  },
  {
    path: "/",
    name: "main",
    component:
      process.env.VUE_APP_NET == "GONGAN"
        ? () => import("../views/login/Login.vue")
        : () => import("@/views/login/LoginNet.vue")
  },
  {
    path: "/desktop",
    name: "DesktopMode",
    component: () => import("../views/desktop/DesktopMode.vue")
  },
  {
    path: "/demo",
    name: "DemoMode",
    component: () => import("../views/demoMode/DemoMode.vue")
  },
  {
    path: "/role",
    name: "Role",
    component: () => import("../views/authority/role/Role.vue")
  },
  {
    path: "/user",
    name: "User",
    component: () => import("@/views/authority/User.vue")
  },
  {
    path: "/menu",
    name: "MenuRes",
    component: () => import("@/views/authority/MenuRes.vue")
  },
  {
    path: "/auth",
    name: "auth",
    component: () => import("@/views/token/Authentication.vue")
  },
  {
    path: "/police",
    name: "PoliceRes",
    component: () => import("@/views/authority/PoliceRes.vue")
  },
  {
    path: "/app",
    name: "AppManage",
    component: () => import("@/views/authority/AppManage.vue")
  },
  {
    path: "/group",
    name: "AppGroup",
    component: () => import("@/views/authority/AppGroup.vue")
  },
  {
    path: "/org",
    name: "OrgManage",
    component: () => import("@/views/authority/OrgManage.vue")
  },
  {
    path: "/loginlog",
    name: "loginlog",
    component: () => import("@/views/authority/loginlog/LoginLog.vue")
  },
  {
    path: "/warn_type",
    name: "warn_type",
    component: () => import("@/views/authority/WarnType.vue")
  },
  {
    path: "/map",
    name: "Map",
    component: () => import("@/views/manage/mapTest.vue")
  },
  {
    path: "/warn",
    name: "Warn",
    component: () => import("@/views/warn/Warn.vue")
  },
  warnMenus,
  {
    path: "/layout",
    name: "Layout",
    component: () => import("@/views/layouts/Layout.vue"),
    redirect: "/person",
    children: chartMenus,
  },
  {
    path: "/portal",
    name: "Portal",
    component: () => import("@/views/portal/Portal.vue")
  },
  ...taskMenus,
  ...harvestMenus
];

const router = new VueRouter({
  routes,
})
if(process.env.VUE_APP_PUBLIC_AUTH){
  router.beforeEach((to,from,next)=>{
    if ((to.path != '/login'&&to.path != '/login_net') && !getToken()){
      next('/login')
    }else{
      next()
    }
  })
}
export default router
