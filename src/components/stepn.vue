<template>
  <div>
  <v-container>
    <v-layout>
      <v-flex xs8 offset-xs2>
        <v-card>
          <v-card-title>
            <span class="display-1 font-weight-black font-italic blue-grey--text ma-2">Tutorial</span>
          </v-card-title>
          <v-card-media contain height="400">
            <v-img contain height="400" :src="tutorial"></v-img>
          </v-card-media>
          <v-card-text>
            <span class="title font-weight-regular grey--text font-italic">{{currentSubsectionName}} Subsection</span>
            <v-card-media height="30"></v-card-media>
            <span class="title amber--text">Step Instruction</span>
            <br>
            <span class="header font-weight-light black--text">{{$store.state.project.step}}. {{currentStepContent}}</span>
            <v-card-media height="30"></v-card-media>
            <div class="font-italic " v-for="(behavior, index) in currentBehaviors" :key="index">
              <v-card tile hover v-if="currentBehaviors" elevation="13" :color="behaviorColor">
                <v-card-text>
                  Style: {{behavior.name}}
                  <br>
                  Validation Method: {{behavior.detectionMethod}}
                  <br>
                  Level: {{behavior.level}}
                  <br>
                  Block or not? {{behavior.dealingMethod}}
                  <br>
                  Style Description: {{behavior.description}}
                  <v-card-media height="10"></v-card-media>
                  <v-layout>9
                    <v-flex xs6>
                      <div style="text-align: center">
                        Good Example of the style
                      </div>
                      <v-card-media height="10"></v-card-media>
                      <v-card-media contain height="50">
                        <v-img contain height="50" :src="behavior.goodExample"></v-img>
                      </v-card-media>
                    </v-flex>
                    <v-flex xs6>
                      <div style="text-align: center">
                        Bad Example of the style
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


              <v-card tile v-if="currentBehaviors && currentBehaviors[0].question" hover elevation="13" :color="behaviorColor">
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
            <v-btn @click="nextStep" v-if="(currentBehaviors[0].dealingMethod) && (!currentBehaviors[0].question)" :disabled="!retrievedBehavior || !approved" outline color="#E53935">Next Step</v-btn>
            <v-btn @click="nextStep" v-if="(!currentBehaviors[0].dealingMethod) && (!currentBehaviors[0].question)" :disabled="!retrievedBehavior" outline color="#E53935">Next Step</v-btn>
            <v-btn @click="nextStep" v-if="currentBehaviors[0].question" :disabled="!answerQuestionCorrect" outline color="#E53935">Next Step</v-btn>
          </v-card-actions>
          <v-card-actions v-if="currentBehaviors.length == 0">
            <v-spacer></v-spacer>
            <v-btn @click="nextStep" outline color="#E53935">Next Step</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <v-dialog width="300" v-model="reviewDialog">
      <v-card>
        <v-card-title>
          <span class="font-weight-black font-italic title">
            Please review the following style
          </span>
        </v-card-title>
        <v-card-title primary-title>
          {{reviewBehavior.name}}
        </v-card-title>
        <v-card-media contain height="200">
          <v-img contain :src="reviewImg" height="200"></v-img>
        </v-card-media>
        <v-card-text>
          <v-text-field persistent-hint hint="Add some comment" background-color="#FCE4EC" v-model="reviewComment"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-layout>
            <v-flex xs10 offset-xs1>
              <v-select label="Select Comment" v-model="reviewComment" :items="['Mind polarity', 'Wire is wrong']"></v-select>
            </v-flex>
          </v-layout>
        </v-card-actions>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn icon @click="sendReviewResult(1)"><v-icon>done</v-icon></v-btn>
          <v-btn icon @click="sendReviewResult(0)"><v-icon>clear</v-icon></v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>

    <v-dialog width="500" v-model="reviewResultDialog">
      <v-card>
        <v-card-title>
          <span class="font-italic font-weight-black blue-grey--text">
            Review Result
          </span>
        </v-card-title>
        <v-card-text>
          {{reviewResultComment}}
          <br>
          {{reviewResultBehavior.name}} is {{reviewResultIcon}}approved!
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="sendReview2Teacher" v-if="(reviewResult == 0) && (reviewResultImg != 'teacher')">Send to teacher again</v-btn>
          <v-btn @click="sendFeedbackToTeacher">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
    <modal name="over">
      <v-card flat tile>
        <v-card-media height="60"></v-card-media>
        <v-card-title class="font-italic font-weight-black blue--text display-2">Congratulations! Your project is done!</v-card-title>
      </v-card>
    </modal>
    <modal height="100" name="tf">
      <v-card flat tile>
        <v-card-media height="10"></v-card-media>
        <span class="font-italic font-weight-regular indigo--text display-1">{{feedback}}</span>
      </v-card>
    </modal>

  </v-container>
  </div>
</template>

<script>
  export default {
    
    name: "Step",
    data: () => ({
      retrievedBehavior: false,
      approved: false,
      reviewDialog: false,
      reviewImg: "",
      reviewBehavior: "",
      reviewStudentName: "",
      reviewComment: "",
      reviewResult: "",
      reviewResultBehavior: "",
      reviewResultComment: "",
      reviewResultImg: "",
      reviewResultDialog: false,
      reviewResultIcon: "",
      answerQuestionCorrect: false,
      yourAnswer: [],
      stepTot: 0,
      feedback: "",
    }),
    methods: {
      nextStep: function() {
        if (this.$store.state.project.step == this.stepTot)  {
          this.$modal.show("over");
          this.$socket.emit("stepAction", this.currentBehaviors[0]);         
          return;
        }
        this.retrievedBehavior = false;
        this.approved = false;
        this.answerQuestionCorrect = false;
        this.yourAnswer = [];
        this.$socket.emit("stepAction", this.currentBehaviors[0]);
        this.$store.commit("project/addStep");
        this.$socket.emit("addStep");
      },
      sendReviewResult: function( reviewResult ) {
        this.reviewDialog = false;
        this.$socket.emit("reviewResult", reviewResult, this.reviewStudentName, this.reviewBehavior, this.reviewComment, this.reviewImg);
        this.reviewComment = "";
      },
      sendFeedbackToTeacher: function() {
        this.reviewResultDialog = false;
        this.$socket.emit("teacherFeedback", this.reviewResultImg, this.reviewResultBehavior, this.reviewResult, this.$store.state.student.studentName);
        if ( 0 == this.reviewResult) {
          this.$socket.emit("failureHistory", this.currentBehaviors[0]);
        }
        this.reviewResultIcon = "";
        this.reviewResultImg = "";
        this.reviewResultComment = "";
        this.reviewResultBehavior = "";
        this.reviewResult = "";
      },
      sendReview2Teacher: function() {
        this.$socket.emit("review2Teacher", this.reviewResultImg, this.reviewResultBehavior, this.$store.state.student.studentName);
        this.reviewResultIcon = "";
        this.reviewResultImg = "";
        this.reviewResultComment = "";
        this.reviewResultBehavior = "";
        this.reviewResult = "";
        this.reviewResultDialog = false;
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
      currentBehaviors: {
        get: function() {
          return this.$store.state.project.currentBehaviors;
        }
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
      for (let subsection of this.$store.state.project.subsections)  {
        this.stepTot += subsection.steps.length;
      }
      this.currentBehaviors = this.currentBehaviors;
    },
    components: {
    },
    sockets: {
      photo: function(data) {
        this.retrievedBehavior = true;
        if (this.currentBehaviors) {
          this.$socket.emit("photo", data, this.currentBehaviors[0]);
        }
      },
      photoToJudge: function(data) {
        this.reviewDialog = true;
        let img = data[0][0];
        let studentName = data[0][1];
        let behavior = data[1];
        this.reviewImg = img;
        this.reviewBehavior = behavior;
        this.reviewStudentName = studentName;
      },
      reviewResult: function(data) {
        this.reviewResult = data[0];
        this.reviewResultBehavior = data[2];
        this.reviewResultComment = data[3];
        this.reviewResultImg = data[4];
        this.reviewResultDialog = true;
        if (data[0] == 1) {
          this.approved = true;
        } else {
          this.reviewResultIcon = "not ";
        }
      },
      feedBack2Stu: function(data) {
        if (data[0] == 1) {
          this.feedback = data[1] + " is good!";
          this.$modal.show("tf");
        } else {
          this.feedback = data[1] + " is bad!";
          this.$modal.show("tf");
        }
      },
    }

  }
</script>