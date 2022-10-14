import api from "@/api";
import axios from "@/utils/configured-axios";
export default {
  namespaced: true,
  state: {
    fetching: true,
    user: {},
    org: {}
  },
  mutations: {
    setFetching(state, fetching) {
      state.fetching = fetching;
    },
    setUser(state, user) {
      state.user = user;
    },
    setOrg(state, org) {
      state.org = org;
    },
  },
  actions: {
    fetchLoginInfo({commit},callback){
      axios.get(api.loginUser()).then(res=>{
        commit("setUser", res.data.user)
        commit("setOrg", res.data.org)
        callback(res.data.org.cityCode)
      }).finally(()=>commit("setFetching", false))
    },
  }
};
