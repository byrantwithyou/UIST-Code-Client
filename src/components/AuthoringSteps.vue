<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Step3: Authoring Steps</v-toolbar-title>
      <input style="display: none" type="file" @change="readFile" ref="inputFile">
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat small @click="handleUpload"><span class="caption font-weight-regular font-italic">Upload your project file</span></v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-layout v-for="(step, index) in steps" :key=index>
      <v-flex xs4 offset-xs1>
        <span class="ma-1 font-weight-thin font-italic">
          {{index + 1}}. {{step.content}}
        </span>
        <v-card-media height="100"></v-card-media>
      </v-flex>
      <v-flex xs4 offset-xs1>
        <v-select height="20" dense v-model="step.behaviors" color="green" hint="Choose the styles to detect for each step" persistent-hint :items="aa[index]"></v-select>
      </v-flex>
      <v-flex xs1 offset-xs1>
        <v-btn @click="change(index)" icon><v-icon>all_inclusive</v-icon></v-btn>
      </v-flex> 
    </v-layout>
    <v-card>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn outline @click="nextStep" color="#E53935">Next Step</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
  import steps from "../steps";
  import xml2js from "xml2js";
  import deors from "../defaultbehaviors";
  let parser = new xml2js.Parser();
  export default {
    data: () => ({
      steps: [],
      deors: JSON.parse(JSON.stringify(deors)),
      aa: deors,
      isde: [true, true, true, true, true, true, true, true, true, true, true]
    }),

    computed: {
      behaviors: function() {
        return this.$store.state.project.behaviors.map((element) => (element.name));
      }
    },
    created: function() {
      
    },

    methods: {
     change: function(index) {
       if (this.isde[index]) {
        this.isde[index] = false;
        this.$set(this.aa, index, this.behaviors);
       } else {
         this.isde[index] = true;
         this.$set(this.aa, index, this.deors[index])
       }
     },
     readFile: function(event) {
       let file = event.target.files[0];
       let fileReader = new FileReader();
       let that = this;
       fileReader.onload = function() {
        parser.parseString(this.result,function (err,res) {
          that.steps = steps;
        })
       }
       fileReader.readAsText(file);
     },
    nextStep: function() {
      this.$store.commit("project/setSteps", {
        steps: this.steps
      });
      this.$store.commit("project/addAuthoringStep");
    },
    handleUpload: function() {
      this.$refs.inputFile.click();
    },
  },
  }
</script>
