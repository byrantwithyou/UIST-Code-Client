import Vue from "vue";
import Router from "vue-router";
import Login from "@/components/Login";
import InputStudentName from "@/components/InputStudentName";
import Authoring from "@/components/Authoring";
import Sort from "@/components/Sort";
import TeacherLogin from "@/components/TeacherLogin";
import stepnew from "@/components/stepnew";
import teachernew from "@/components/teachernew";
import card from "@/components/card";

Vue.use(Router);

const routes = [
  {
    path: "/card",
    component: card
  },
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
    component: stepnew
  },
  {
    path: "/sort",
    component: Sort
  },
  {
    path: "/teacher",
    component: teachernew
  },
  {
    path: "/teacherLogin",
    component: TeacherLogin
  },
];

const router = new Router({
  routes
});

export default router;
