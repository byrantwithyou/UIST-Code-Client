import Vue from "vue";
import Router from "vue-router";
import Login from "@/components/Login";
import InputStudentName from "@/components/InputStudentName";
import Authoring from "@/components/Authoring";
import Sort from "@/components/Sort";
//import Step from "@/components/Step";
import Result from "@/components/Result";
import Teacher from "@/components/Teacher";
import TeacherLogin from "@/components/TeacherLogin";
//import TeacherHardcode from "@/components/TeacherHardcode";
import stepnew from "@/components/stepnew";
import teachernew from "@/components/teachernew";
//import tt from "@/components/tt.vue";
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
    component: stepnew
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
