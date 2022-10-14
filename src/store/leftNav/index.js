export default {
  namespaced: true,
  state: {
    // 侧栏菜单
    navIndex: 0,
    // 当前所在菜单的 path
    activePath: ""
  },
  mutations: {
    /**
     * @description 设置侧边栏菜单
     */
    setNavIndex(state, index) {
      state.navIndex = index;
    },
    /**
     * @description 设置当前所在菜单的 path，用于侧栏菜单高亮当前项
     */
    setActivePath(state, path) {
      state.activePath = path;
    }
  }
};
