<template>
  <v-app>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
    }
  },
  created: function() {
    this.$router.push("/");
  },
    
}
</script>
