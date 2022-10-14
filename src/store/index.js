import Vue from 'vue'
import Vuex from 'vuex'
import leftNav from "./leftNav";
import leftMenu from "./leftMenu";
import dispoal from "./disposal";
import constants from "./constants";
import userInfo from "./global/userInfo";
import login from "./login";

Vue.use(Vuex)
import menu from './menu'

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    leftNav,
    menu,
    leftMenu,
    dispoal,
    constants,
    userInfo,
    login
  }
});
