<template>
  <div>
  <v-container>
    <v-layout>
      <v-flex>
        <v-card>
          <v-card-text>
            <div class="font-italic " v-for="(behavior, index) in currentBehaviors" :key="index">
              <v-card tile v-if="currentBehaviors && currentBehaviors[0].question" hover elevation="13">
                <v-card-text>
                  <span class="header font-weight-black"></span>
                  {{behavior.question}}
                </v-card-text>
                <v-card-text>
                  <v-checkbox v-model="yourAnswer" v-for="(answer, index) in behavior.answerSets" :value="index" :key="answer.question" :label="answer.question"></v-checkbox>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn @click="submitAnswer" small>Submit answer</v-btn>
                </v-card-actions>
              </v-card>
            </div>
          </v-card-text>
          <v-card-actions v-if="currentBehaviors.length">
            <v-spacer></v-spacer>
            <v-btn @click="nextStep" v-if="currentBehaviors[0].question == ''">Next Step</v-btn>
            <v-btn @click="nextStep" v-if="currentBehaviors[0].question" :disabled="!answerQuestionCorrect" outline color="#E53935">Next Step</v-btn>
          </v-card-actions>
          <v-card-actions v-if="currentBehaviors.length == 0">
            <v-spacer></v-spacer>
            <v-btn @click="nextStep" outline color="#E53935">Next Step</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12 v-for="(photo, index) in photoToJudge" :key="index">
        <v-btn icon @click="sendReviewResult(1)"><v-icon>right</v-icon></v-btn>
        <v-btn icon @click="sendReviewResult(0)"><v-icon>wrong</v-icon></v-btn>
      </v-flex>
    </v-layout>


    <modal name="right">
      <v-card flat tile>
        <v-card-media height="60"></v-card-media>
        <v-card-title class="font-italic font-weight-black green--text display-1">Right!</v-card-title>
      </v-card>
    </modal>
    <modal name="wrong">
      <v-card flat tile>
        <v-card-media height="60"></v-card-media>
        <v-card-title class="font-italic font-weight-black red--text display-1">Wrong!</v-card-title>
      </v-card>
    </modal>


  </v-container>
  </div>
</template>

<script>
  export default {
    
    name: "Step",
    data: () => ({
      answerQuestionCorrect: false,
      yourAnswer: [],
      stepTot: 0,
      subsectionBehaviors: [],
      photoToJudge: []
    }),
    methods: {
      nextStep: function() {
        if (this.$store.state.project.step == this.stepTot)  {
          this.$modal.show("over");
          this.$socket.emit("stepAction", this.currentBehaviors[0]);         
          return;
        }
        if (this.$store.state.project.subsections[this.$store.state.project.currentSubsection - 1].steps[0] == this.currentStepContent) {
          this.subsectionBehaviors = [];
          this.photoToJudge = [];
        }
        if (this.currentBehaviors[0].question == '') {
          this.subsectionBehaviors.push(this.currentBehaviors[0]);
        }
        this.answerQuestionCorrect = false;
        this.yourAnswer = [];
        this.$socket.emit("stepAction", this.currentBehaviors[0]);
        this.$store.commit("project/addStep");
        this.$socket.emit("addStep");
      },
    
      submitAnswer: function() {
        let cmpAnswer = [];
        for (let answerSet = 0; answerSet < this.currentBehaviors[0].answerSets.length; ++answerSet) {
          if (this.currentBehaviors[0].answerSets[answerSet].check) {
            cmpAnswer.push(answerSet);
          }
        }
        if ( this.yourAnswer.toString() == cmpAnswer.toString() ) {
          this.answerQuestionCorrect = true;
          this.$modal.show("right");
        } else {
          this.answerQuestionCorrect = false;
          this.$modal.show("wrong");
          this.$socket.emit("failureHistory", this.currentBehaviors[0]);
        }
      },
      sendReviewResult: function(reviewResult, name, behavior, reviewComment, img) {
        
      }
    },
    computed: {
      currentStepNumber: function() {
        return this.$store.state.project.step;
      },
      currentSubsectionName: function() {
        return this.$store.state.project.subsections[this.$store.state.project.currentSubsection - 1].name;
      },
      currentStepContent: function() {
        return this.$store.state.project.currentStepContent;
      },
      currentBehaviors: {
        get: function() {
          return this.$store.state.project.currentBehaviors;
        }
      },
    },
    created: function() {
      for (let subsection of this.$store.state.project.subsections)  {
        this.stepTot += subsection.steps.length;
      }
    },
    sockets: {
      photo: function(data) {
        for (let behavior of this.subsectionBehaviors) {
          this.$socket.emit("photo", data, behavior);  
        }
      },
      photoToJudge: function(data) {
        let img = data[0][0];
        let studentName = data[0][1];
        let behavior = data[1];
        this.photoToJudge.push({
          img: img,
          studentName: studentName,
          behavior: behavior
        })
      }
    }
    

  }
</script>