<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>{{title}}</v-toolbar-title>
    </v-toolbar>
    <v-container>
      <v-layout>
        <v-flex xs5>
            <v-select
              solo
              dense
              flat
              color="green"
              background-color="#E8EAF6"
              v-model="goalNumber"
              :items="goalNumbers"
              :menu-props="{ maxHeight: '400' }"
              hint="Goal number of correct behavior demenstrations for mastery?"
              persistent-hint
            ></v-select>
        </v-flex>
        <v-flex xs5 offset-xs2>
            <v-select
              solo
              dense
              flat
              color="green"
              background-color="#E8EAF6"
              v-model="errorTime"
              :items="errorTimes"
              :menu-props="{ maxHeight: '400' }"
              hint="Number of mistakes to demenstrate lack of mastery?"
              persistent-hint
            ></v-select>
        </v-flex>
      </v-layout>
      <v-card-media height="30"></v-card-media>
      <v-card-media contain height="150">
        <v-img contain height="150" :src="projectTutorial"></v-img>
      </v-card-media>
      <v-card-media height="50"></v-card-media>
      <v-layout>
        <v-flex xs7>
          <span class="font-weight-regular font-italic title indigo--text">
            Choose the tutorial of the project
          </span>
        </v-flex>
        <v-flex xs5>
          <v-btn @click="uploadTutorial" ripple color="#26A69A" bottom round><span class="white--text">Upload Project Tutorial</span></v-btn>
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
        <v-btn outline @click="nextStep" color="#E53935">Back to Teacher Homepage</v-btn>
      </v-card-actions>
    </v-card>
    </v-container>
  </div>
</template>
<script>
  export default {
    data: () => ({
      title: 'Step4: Authoring Other Settings',
      errorTimes: [1, 2, 3, 4],
      errorTime: 1,
      goalNumber: 1,
      goalNumbers: [1, 2, 3, 4],
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
        this.$socket.emit("authoring", this.behaviors, this.steps, this.subsections, {
          errorTime: this.errorTime,
          goalNumber: this.goalNumber,
          projectTutorial: this.projectTutorial,
          projectDescription: this.projectDescription
        })
        this.$router.push("/teacherLogin");
      }
    },
    computed: {
      behaviors: function() {
        return this.$store.state.project.behaviors;
      },
      steps: function() {
        return this.$store.state.project.steps;
      },
      subsections: function() {
        return this.$store.state.project.subsections;
      }

    }
  }

</script>