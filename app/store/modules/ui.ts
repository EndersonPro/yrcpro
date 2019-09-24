export default {
  namespaced: true,
  state: () => ({
    isLoading: false
  }),
  getters: {
    // @ts-ignore
    isLoading: state => state.isLoading
  },
  actions: {
    IS_LOADING: {
      root: true,
      // @ts-ignore
      handler: ({ commit }, data: Boolean) => {
        commit("isLoading", data);
      }
    }
  },
  mutations: {
    // @ts-ignore
    isLoading(state, data: Boolean) {
      state.isLoading = data;
    }
  }
};
