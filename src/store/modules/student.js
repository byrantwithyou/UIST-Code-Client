const state = {
  studentName: "",
  studentProfile: []
};

const getters = {};

const mutations = {
  setStudentName(state, payload) {
    state.studentName = payload.studentName;
  },
  setStudentProfile(state, payload) {
    state.studentProfile = payload.studentProfile;
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
