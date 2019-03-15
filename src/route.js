import Vue from "vue";
import Router from "vue-router";
import Login from "@/components/Login";
import InputStudentName from "@/components/InputStudentName";
import Authoring from "@/components/Authoring";
import Sort from "@/components/Sort";
import Step from "@/components/Step";
import Result from "@/components/Result";
import Teacher from "@/components/Teacher";
import TeacherLogin from "@/components/TeacherLogin";
//import TeacherHardcode from "@/components/TeacherHardcode";

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
  },
  {
    path: "/sort",
    component: Sort
  },
  {
    path: "/teacher",
    component: Teacher
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
