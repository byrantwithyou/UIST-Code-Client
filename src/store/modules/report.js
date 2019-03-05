const state = {
  errorRecord: [],
  correctRecord: []
};

const getters = {};

const mutations = {
  addErrorRecord(state, payload) {
    state.errorRecord.push(payload.record);
  },
  addCorrectRecord(state, payload) {
    state.correctRecord.push(payload.record);
  }
};

const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

