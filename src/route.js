import Vue from "vue";
import Router from "vue-router";
import Login from "@/components/Login";
import InputStudentName from "@/components/InputStudentName";
import Authoring from "@/components/Authoring";
import Step from "@/components/Step";
import Result from "@/components/Result";

Vue.use(Router);

const routes = [
  {
    path: "/",
    component: Login
  },
  {
    path: "/inputStudentName",
    component: InputStudentName
  },
  {
    path: "/authoring",
    component: Authoring
  },
  {
    path: "/step",
    component: Step
  },
  {
    path: "/result",
    component: Result
  }
];

const router = new Router({
  routes
});

export default router;
