<template>
  <v-container>
    <v-layout>
      <v-btn @click="test">Authoring</v-btn>
    </v-layout>
  </v-container>
</template>

<script>
  import behaviors from "../behaviors";
  export default {
    data: () => ({
      behaviors: behaviors,
      steps: [],
      subsections: [],
      settings: {},
    }),
    methods:{
      test: function() {
        this.$socket.emit("authoring", this.behaviors, this.steps, this.subsections, this.settings);
      }
    },
    sockets: {
    }
  }
</script>

<style>

</style>
