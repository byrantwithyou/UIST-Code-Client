import behaviors from "../../behaviors";
const state = {
  behaviors: behaviors,
  settings: {},
  subsections: [],
  steps: [],
  authoringStep: 1,
  step: 1,
  currentStepContent: "",
  currentSubsection: "",
  currentBehaviors: []
};

const getters = {}

const mutations = {
  init(state) {
    state.behaviors = behaviors;
    state.settings = {};
    state.subsections = [];
    state.steps = [];
    state.authoringStep = 1;
  },
  setBehaviors(state, payload) {
    state.behaviors = payload.behaviors
  },
  setSettings(state, payload) {
    state.settings = payload.settings
  },
  setSubsections(state, payload) {
    state.currentBehaviors = [];
    state.subsections = payload.subsections;
    state.currentStepContent = payload.subsections[0].steps[0];
    state.currentSubsection = 1;
    let currentBehaviorName = state.steps[state.steps.findIndex((element) => (element.content == state.currentStepContent))].behaviors;
    state.currentBehaviors.push(state.behaviors[state.behaviors.findIndex((element) => (element.name == currentBehaviorName))]);
  },
  setSteps(state, payload) {
    state.steps = payload.steps;
  },
  addAuthoringStep(state) {
    state.authoringStep += 1;
  },
  addStep(state) {
    state.currentBehaviors = [];
    state.step += 1;
    let stepNumber = 0;
    for (let subsection of state.subsections) {
      for (let step of subsection.steps) {
        stepNumber += 1;
        if (stepNumber == state.step) {
          state.currentStepContent = step;
        }
      }
    }
    if (state.subsections[state.currentSubsection - 1].steps.findIndex((element) => (element == state.currentStepContent)) < 0) {
      state.currentSubsection += 1;
    }
    let currentBehaviorName = state.steps[state.steps.findIndex((element) => (element.content == state.currentStepContent))].behaviors;
    state.currentBehavios.push(state.behaviors[state.behaviors.findIndex((element) => (element.name == currentBehaviorName))]);
  },
}

const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

