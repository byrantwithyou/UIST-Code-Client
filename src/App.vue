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
  data () {
    return {
    }
  },
  created: function() {
    this.$router.push("/");
  },
  methods: {
  }
    
}
</script>
