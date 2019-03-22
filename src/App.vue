<template>
  <v-app>
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
  },
  sockets: {
    stepInit: function(data) {
        for (let i = 0; i < data - 1; ++i) {

        this.$store.commit("project/addStep")  
        }
        this.$router.push("/step");
    }
  }
}
</script>
