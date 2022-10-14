import moment from "moment";
import api from "@/api";
import axios from "@/utils/configured-axios";
export default {
  namespaced: true,
  state: {
    fromWarn: true,
    modalVisible: false,
    admin: 1,
    task: {},
    warnStatus: 0,
    remindTasks: [],
    warnCount: 0,
    wsData: {},
    showWarnSign: false
  },
  mutations: {
    setFromWarn(state, fromWarn) {
      state.fromWarn = fromWarn;
    },
    setModalVisible(state, modalVisible) {
      state.modalVisible = modalVisible;
    },
    setAdmin(state, admin){
      state.admin = admin
    },
    setTask(state, task){
      state.task = task
    },
    setWarnStatus(state, warnStatus) {
      state.warnStatus = warnStatus;
    },
    setRemindTasks(state, remindTasks){
      state.remindTasks = remindTasks
    },
    setWsData(state, wsData) {
      state.wsData = wsData;
    },
    setShowWarnSign(state, showWarnSign) {
      state.showWarnSign = showWarnSign
    },
  },
  getters:{
    todoStatus(state, getters){
      if(state.admin==1) return [3,4]
      return getters.remindStatus
    },
    remindTasks(state, getters){
      if (state.admin==1) return []
      return  state.tasks.filter(t=>t.remind.isBefore(moment())&&getters.remindStatus.findIndex(ts=>ts==t.status)>-1)
    },
    remindStatus(state){
      return state.admin==0?[2,-1]:[0,1]
    },
    getWsData(state) {
      return state.wsData
    }
  },
  actions: {
    fetchDetail({commit},task){
      axios.get(`${api.warnTasks()}/${task.id}/images`).then(res=>{
        commit("setFromWarn", task.taskType==0)
        commit("setModalVisible", true)
        commit("setWarnStatus", 1)
        commit("setTask",{
          ...task,
          orgIds:[task.orgId],
          taskType: 1,
          images:res.data.map(d=>({...d,url:api.warnImages(d.uploadFileId,d.suffix)}))})
      })
    },
    fetchWarnDetail({commit},warn){
      axios.get(api.warnDetails(),{
        params: {
          yjId: warn.id,
          tableName: warn.tableName,
          dataSourceType: warn.dataSourceType,
        }
      }).then(res=>{
        commit("setFromWarn", true)
        commit("setModalVisible", true)
        commit("setWarnStatus", 0)
        commit("setTask",{
          orgIds:[],
          status: -2,
          warnContent:res.data.yjxx,
          source:res.data.yjly,
          level:res.data.yjjb,
          time:res.data.yjsj,
          taskType:0,
        })
      })
    },
    fetchReminds({commit,state}){
      if(state.admin==1) return
      const status = state.admin==0?[2,-1]:[0,1]
      axios.post(`${api.warnTasks()}/tasks/remind`,{status}).then(res=>{
        commit("setRemindTasks", res.data)
      })
    },
    changeWsData({commit}, data) {
      commit("setWsData", data);
    },
    changeShowWarnSign({commit}, data) {
      commit("setShowWarnSign", data);
    }
  }
};
