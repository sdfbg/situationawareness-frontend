// import moment from "moment";
import api from "@/api";
import axios from "@/utils/configured-axios";
export default {
  namespaced: true,
  state: {
    warnModels: [],
    warnModelsFetched: false,
  },
  mutations: {
    setWarnModels(state, warnModels) {
      state.warnModels = warnModels;
    },
    setWarnModelsFetched(state, warnModelsFetched) {
      state.warnModelsFetched = warnModelsFetched;
    },
  },
  actions: {
    fetchWarnModels({commit, state}){
      if(state.warnModelsFetched) return
      axios.post(api.getModelName()).then((res) => {
        commit("setWarnModels", res.data)
        commit("setWarnModelsFetched", true)
      });
    }
  }
};
