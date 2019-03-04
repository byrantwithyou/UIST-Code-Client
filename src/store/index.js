import Vue from "vue";
import Vuex from "vuex";
import student from "./modules/student";
import project from "./modules/project";

Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    student,
    project
  }
});
