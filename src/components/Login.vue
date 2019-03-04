<template>
  <v-container>
    <v-layout>
      <v-btn @click="loginAsAStudent">Log in as a Student</v-btn>
      <v-btn @click="loginAsATeacher">Log in as a Teacher</v-btn>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
    }),
    methods:{
      loginAsAStudent: function() {
        this.$router.push("/inputStudentName");
      },
      loginAsATeacher: function() {
        this.$socket.emit("teacherLogin");
        this.$router.push("/authoring");
      }
    }
  }
</script>

<style>

</style>
