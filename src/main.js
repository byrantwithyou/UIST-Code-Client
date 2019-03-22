import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./route";
import store from "./store";
import VueSocketIO from "vue-socket.io";
import vueg from "vueg";
import VueGoogleCharts from "vue-google-charts";
import Notifications from "vue-notification";
import VModal from "vue-js-modal";
import VTooltip from "v-tooltip";

let host = "https://polar-ravine-24711.herokuapp.com";

Vue.use(VModal, { dialog: false});
Vue.config.productionTip = false;
Vue.use(new VueSocketIO({
  connection: "" 
}));
Vue.use(vueg, router);
Vue.use(VueGoogleCharts);
Vue.use(Notifications);
Vue.use(VTooltip);
VTooltip.options.popover.defaultPlacement = 'bottom';
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

