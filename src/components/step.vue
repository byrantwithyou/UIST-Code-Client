<template>
  <div>
  <v-container>
    <v-layout>
      <v-flex xs8 offset-xs2>
        <v-card>
          <v-card-title>
            <span class="display-1 font-weight-black font-italic blue-grey--text ma-2">Tutorial</span>
          </v-card-title>
          <v-card-media contain height="100">
            <v-img contain height="100" :src="tutorial"></v-img>
          </v-card-media>
          <v-card-text>
            <span class="title font-weight-regular grey--text font-italic">{{currentSubsectionName}} Subsection</span>
            <v-card-media height="30"></v-card-media>
            <span class="title amber--text">Step Instruction</span>
            <br>
            <span class="header font-weight-light black--text">{{$store.state.project.step}}. {{currentStepContent}}</span>
            <v-card-media height="30"></v-card-media>
            <div class="font-italic " v-for="(behavior, index) in currentBehaviors" :key="index">
              <v-card tile hover elevation="13" :color="behaviorColor">
                <v-card-text>
                  Behavior {{index + 1}}: {{behavior.name}}
                  <br>
                  Detection Method: {{behavior.detectionMethod}}
                  <br>
                  Level: {{behavior.level}}
                  <br>
                  Dealing Method: {{behavior.dealingMethod}}
                  <br>
                  Behavior Description: {{behavior.description}}
                  <v-card-media height="10"></v-card-media>
                  <v-layout>
                    <v-flex xs6>
                      <div style="text-align: center">
                        Good Example
                      </div>
                      <v-card-media height="10"></v-card-media>
                      <v-card-media contain height="50">
                        <v-img contain height="50" :src="behavior.goodExample"></v-img>
                      </v-card-media>
                    </v-flex>
                    <v-flex xs6>
                      <div style="text-align: center">
                        Bad Example
                      </div>
                      <v-card-media height="10"></v-card-media>
                      <v-card-media contain height="50">
                        <v-img contain height="50" :src="behavior.badExample"></v-img>
                      </v-card-media>
                    </v-flex>
                  </v-layout>
                  <v-card-media height="30"></v-card-media>
                </v-card-text>
              </v-card>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="nextStep" v-if="currentBehaviors[0].dealingMethod == 'Block'" :disabled="!retrievedBehavior || !approved" outline color="#E53935">Next Step</v-btn>
            <v-btn @click="nextStep" v-if="currentBehaviors[0].dealingMethod == 'Message'" :disabled="!retrievedBehavior" outline color="#E53935">Next Step</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
  </div>
</template>

<script>
  export default {
    
    name: "Step",
    data: () => ({
      retrievedBehavior: false,
      approved: false
    }),
    methods: {
      nextStep: function() {
        this.retrievedBehavior = false;
        this.approved = false;
        this.$store.commit("project/addStep");
      }
    },
    computed: {
      currentStepNumber: function() {
        return this.$store.state.project.step;
      },
      tutorial: function() {
        return this.$store.state.project.settings["projectTutorial"];
      },
      currentSubsectionName: function() {
        return this.$store.state.project.subsections[this.$store.state.project.currentSubsection - 1].name;
      },
      currentStepContent: function() {
        return this.$store.state.project.currentStepContent;
      },
      currentBehaviors: function() {
        return this.$store.state.project.currentBehaviors;
      },
      behaviorColor: function() {
        const mapping = {
          "High": "#EF5350",
          "Middle": "#E57373",
          "Low": "#FFCDD2"
        }
        return mapping[this.currentBehaviors[0].level];
      },
    },
    created: function() {
    },
    components: {
    },
    sockets: {
      photo: function(data) {
        console.log("received photo");
        this.retrievedBehavior = true;
        this.$socket.emit("photo", data);
      }
    }

  }
</script>