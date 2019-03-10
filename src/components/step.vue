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
            <span class="header font-weight-light black--text">{{currentStepContent}}</span>
            <v-card-media height="30"></v-card-media>
            <div class="font-italic " v-for="(behavior, index) in currentBehaviors" :key="index">
              <v-card outline>
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
                  <br>
                  <v-layout>
                    <v-flex xs6>
                      <v-card-media contain height="50">
                        <v-img contain height="50" :src="behavior.goodExample"></v-img>
                      </v-card-media>
                    </v-flex>
                    <v-flex xs6>
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
            <v-btn @click="nextStep" :disabled="(bcknotAuth != 0) || behaviorSentToMobile" outline color="#E53935">Next Step</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
    <!--ReviewResult 
      :img="reviewResultImage" 
      :comment="reviewResultComment" 
      :behavior="behaviorReviewed" 
      :reviewResult="reviewResult"
      v-if="isReviewResultExisted">
    </ReviewResult-->
  </div>
</template>

<script>
  //import ReviewResult from "@/components/ReviewResult";
  export default {
    
    name: "Step",
    data: () => ({
      reviewResult: "",
      reviewResultImage: "",
      reviewResultComment: "",
      behaviorReviewed: "",
      isReviewResultExisted: false,
      bcknotAuth: 0,
      behaviorSentToMobile: false,
    }),
    methods: {
      nextStep: function() {
        this.behaviorSentToMobile = false;
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
      }
    },
    created: function() {
      for (let currentBehavior of this.currentBehaviors) {
        if (currentBehavior.dealingMethod == "Block") {
          this.bcknotAuth += 1;
        }
      }
    },
    components: {
     // ReviewResult
    },
    sockets: {
      reviewResult: function(data) {
        this.behaviorReviewed = data[0];
        this.reviewResult = data[1];
        this.reviewResultImage = data[2];
        this.reviewResultComment = data[3];
        this.isReviewResultExisted = true;
        //TODO: 
        //TODO:
        //pop up the currentStepBlockBehaviors if any
      },
      photo: function(data) {
        this.behaviorSentToMobile = true;
        this.$socket.emit("photo", data, "Behavior 1");
      }
    }

  }
</script>