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
    this.$router.push("/");
  },
}
</script>
