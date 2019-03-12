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

let host = "http://localhost";
let port = 8089;

Vue.use(VModal, { dialog: false});
Vue.config.productionTip = false;
Vue.use(new VueSocketIO({
  connection: host + ":" + port, 
}));
Vue.use(vueg, router);
Vue.use(VueGoogleCharts);
Vue.use(Notifications);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

