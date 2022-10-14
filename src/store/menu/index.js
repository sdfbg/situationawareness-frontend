export default {
    namespaced: true,
    state: {
      selectedKeys: ["manage"],
    },
    mutations: {
      setSelectedKey(state, val) {
        state.selectedKeys = val;
      },
      
    },
  };
  