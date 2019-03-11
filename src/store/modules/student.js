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
    payload.studentProfile.unshift(["StudentName", "Step"]);
    state.studentProfile = payload.studentProfile;
    if (payload.studentProfile.length == 0) {
      state.studentProfile = [];
    }
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
