<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>{{title}}</v-toolbar-title>
    </v-toolbar>
    <v-container>
      <v-card-media height="30"></v-card-media>
      <v-card-media contain height="150">
        <v-img contain height="150" :src="projectTutorial"></v-img>
      </v-card-media>
      <v-card-media height="50"></v-card-media>
      <v-layout>
        <v-flex xs7>
          <span class="font-weight-regular font-italic title indigo--text">
            Choose the photo of the project
          </span>
        </v-flex>
        <v-flex xs5>
          <v-btn @click="uploadTutorial" ripple color="#26A69A" bottom round><span class="white--text">Upload Project Photo</span></v-btn>
          <input style="display: none" type="file" @change="readFile" ref="inputFile">
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs12>
          <v-text-field v-model="projectDescription" prepend-icon="description" hint="Add description of the project" persistent-hint></v-text-field>
        </v-flex>
      </v-layout>
      <v-card flat tile>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn outline @click="nextStep" color="#E53935">Next Step</v-btn>
      </v-card-actions>
    </v-card>
    </v-container>
  </div>
</template>
<script>
  export default {
    data: () => ({
      title: 'Step1: Authoring the whole project',
      projectTutorial: "",
      projectDescription: ""
    }),
    methods: {
      readFile: function(img) {
        let imgReader = new FileReader();
        let that = this;
        imgReader.onload = function(data) {
          that.projectTutorial = data.target.result;
        }
        imgReader.readAsDataURL(img.target.files[0]);
      },
      uploadTutorial: function() {
        this.$refs.inputFile.click();
      },
      nextStep: function() {
        this.$store.commit("project/addAuthoringStep");
        this.$store.commit("project/setSettings", {
          settings: {
            projectTutorial: this.projectTutorial,
            projectDescription: this.projectDescription
          }
        });
      },
    },
  }

</script>