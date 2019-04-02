<template>
  <v-app>
    <v-toolbar dark height="40" color="#00693e" v-if="$route.path=='/teacher'" app>
      <v-icon dark>fa fa-chalkboard-teacher</v-icon>
      <v-toolbar-title>TUTORIAL</v-toolbar-title>
    </v-toolbar>
    <v-toolbar dark height="40" color="#00693e" v-if="($route.path=='/sort') || ($route.path=='/step')" app>
      <v-icon>fa fa-user-graduate</v-icon>
      <v-toolbar-title>TUTORIAL</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <router-view v-transition></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  created: function() {
    console.log(this.$socket);
    this.$router.push("/");
    console.log(this.$route.path);
  },
}
</script>
