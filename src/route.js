import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "@/components/HelloWorld";


Vue.use(Router);

const routes = [
  {
    path: "/",
    component: HelloWorld
  },
];

const router = new Router({
  routes
});

export default router;
