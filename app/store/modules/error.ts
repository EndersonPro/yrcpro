export default {
  namespaced: true,
  state: () => ({
    error: false,
    msg: ""
  }),
  getters: {
    // @ts-ignore
    error: state => state.error
  },
  actions: {
    // @ts-ignore
    HANDLER_ERROR({ commit }, data) {
      commit("MUTATION_ERROR", data);
    }
  },
  mutations: {
    // @ts-ignore
    MUTATION_ERROR(state, data) {
      console.log("error", data);
    }
  }
};
