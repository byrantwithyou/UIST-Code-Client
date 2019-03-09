<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>{{title}}</v-toolbar-title>
    </v-toolbar>
    <v-card>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn outline @click="nextStep" color="#E53935">Next Step</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
  export default {
    data: () => ({
      title: 'Step3: Authoring Subsections',
    }),
    methods: {
      nextStep: function() {
        this.$store.commit("project/addAuthoringStep");
      }
    }
  }

</script>