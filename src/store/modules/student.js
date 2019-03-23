const state = {
  studentName: "",
  studentProfile: [],
  studentReview: []
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
  },
  addStudentReview(state, payload) {
    state.studentReview.push({
      name: payload.name,
      img: payload.img,
      behavior: payload.behavior
    })
  },
  deleteStudentReview(state, payload) {
    const index = state.studentReview.findIndex((element) => (element.img == payload.img));
    if (index >= 0) {
      state.studentReview.splice(state.studentReview.findIndex((element) => (element.img == payload.img)), 1);
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
