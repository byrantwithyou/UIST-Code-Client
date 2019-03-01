import Vue from "vue";
import Vuex from "vuex";
import step from "./modules/step";

Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    step
  }
});
