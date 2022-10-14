import api from "@/api";
import axios from "@/utils/configured-axios";
export default {
    namespaced: true,
    state: {
        userInfo: {},
        userInfoFetched: false
    },
    mutations: {
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo;
        },
        setUserInfoFetched(state, userInfoFetched) {
            state.userInfoFetched = userInfoFetched;
        }
    },
    actions: {
        getUserInfo({commit, state}) {
            if(state.userInfoFetched) return;
            axios.get(api.getUserInfo()).then((res) => {
                commit("setUserInfo", res.data);
                commit("setUserInfoFetched", true);
            })
        }
    },
}