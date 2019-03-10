const state = {
  studentName: "",
};

const getters = {};

const mutations = {
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
