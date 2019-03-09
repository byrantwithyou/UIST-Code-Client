<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Step2: Authoring Steps</v-toolbar-title>
      <input style="display: none" type="file" @change="readFile" ref="inputFile">
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat small @click="handleUpload"><span class="caption font-weight-regular font-italic">Upload your project file</span></v-btn>
      </v-toolbar-items>
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
      dialog: false,
      
    }),

    computed: {
      
    },

    methods: {
     readFile: function() {
     },
    nextStep: function() {
      this.$store.commit("project/addAuthoringStep");
    },
    handleUpload: function() {
      this.$refs.inputFile.click();
    }
  },
  }
</script>
