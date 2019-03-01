const state = {
  step: 1,
};

const getters = {};

const mutations = {
  addStep(state) {
    state.step += 1;
  },
};

const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
