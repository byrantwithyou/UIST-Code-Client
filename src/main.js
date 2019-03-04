import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./route";
import store from "./store";
import VueSocketIO from "vue-socket.io";


let host = "http://localhost";
let port = 8089;


Vue.config.productionTip = false;
Vue.use(new VueSocketIO({
  connection: host + ":" + port, 
}));

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

