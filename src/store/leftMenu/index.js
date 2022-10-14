export default {
  namespaced: true,
  state: {
    // 导航
    active: 1,
    // 当前所在菜单的 path
  },
  mutations: {
    /**
     * @description 设置导航菜单
     */
    setActiveIndex(state,val){
      state.active = val
    }
  }
};
