import behaviors from "../../behaviors";
const state = {
  behaviors: behaviors,
  settings: {},
  subsections: [],
  steps: [],
  disable: true
};

const getters = {}

const mutations = {
  setBehaviors(state, payload) {
    state.behaviors = payload.behaviors
  },
  setSettings(state, payload) {
    state.settings = payload.settings
  },
  setSubsections(state, payload) {
    state.subsections = payload.subsections
  },
  setSteps(state, payload) {
    state.steps = payload.steps;
  },
  setDisable(state, payload) {
    state.disable = payload.disable
  }
}

const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

