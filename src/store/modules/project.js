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
  setBehaviors(state, payload) {
    state.behaviors = payload.behaviors
  },
  initAuthoringSteps(state) {
    state.authoringStep = 1;
  },
  setSettings(state, payload) {
    state.settings = payload.settings
  },
  setSubsections(state, payload) {
    state.currentBehaviors = [];
    state.subsections = payload.subsections;
    state.currentStepContent = payload.subsections[0].steps[0];
    state.currentSubsection = 1;
    let tempBehaviors = [];
    if (state.steps) {
      for (let step of state.steps) {
        if (step.content == state.currentStepContent) {
          tempBehaviors = step.behaviors;
          break;
        }
      }
    }
    if (state.behaviors) {
      for (let behavior of state.behaviors) {
        if (tempBehaviors.findIndex((element) => (element == behavior.name)) >= 0) {
          state.currentBehaviors.push(behavior);
        }
      }
    }
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
    let tempBehaviors = [];
    for (let step of state.steps) {
      if (step.content == state.currentStepContent) {
        tempBehaviors = step.behaviors;
        break;
      }
    }
    for (let behavior of state.behaviors) {
      if (tempBehaviors.findIndex((element) => (element == behavior.name)) >= 0) {
        state.currentBehaviors.push(behavior);
      }
    }
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

