const state = {
  step: 1,
  studentName: ""
};

const getters = {};

const mutations = {
  addStep(state) {
    state.step += 1;
  },
  setStudentName(state, payload) {
    state.studentName = payload.studentName;
  }
};

const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
