<template>
  <v-container>
    <v-layout>
      <v-btn>Authoring</v-btn>
    </v-layout>
  </v-container>
</template>

<script>
  import behaviors from "../behaviors";
  export default {
    data: () => ({
      settings: {},
      behaviors: behaviors,
      subsections: [],
      steps: []
    }),
    methods:{

    }
  }
</script>

<style>

</style>
