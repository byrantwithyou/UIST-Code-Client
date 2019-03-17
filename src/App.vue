<template>
  <v-app>
    <notifications group="foo" position="top right" >
      <template slot="body" slot-scope="props">
        <div>{{props}}</div>
        <v-btn @click="props.test"></v-btn>
      </template>
    </notifications>
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
  },
  
    
}
</script>
