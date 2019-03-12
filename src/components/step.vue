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


              <v-card tile v-if="currentBehaviors[0].question" hover elevation="13" :color="behaviorColor">
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
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="nextStep" v-if="(currentBehaviors[0].dealingMethod == 'Block') && (!currentBehaviors[0].question)" :disabled="!retrievedBehavior || !approved" outline color="#E53935">Block</v-btn>
            <v-btn @click="nextStep" v-if="(currentBehaviors[0].dealingMethod == 'Message') && (!currentBehaviors[0].question)" :disabled="!retrievedBehavior" outline color="#E53935">Message</v-btn>
            <v-btn @click="nextStep" v-if="currentBehaviors[0].question" :disabled="!answerQuestionCorrect" outline color="#E53935">Next Step</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <v-dialog width="300" v-model="reviewDialog">
      <v-card>
        <v-card-title>
          <span class="font-weight-black font-italic title">
            Please review the following behavior
          </span>
        </v-card-title>
        <v-card-title primary-title>
          {{reviewBehavior.name}}
        </v-card-title>
        <v-card-media contain height="50">
          <v-img contain :src="reviewImg" height="50"></v-img>
        </v-card-media>
        <v-card-text>
          <v-text-field persistent-hint hint="Add some comment" background-color="#FCE4EC" v-model="reviewComment"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn small @click="reviewComment = 'Wire is wrong!'">Wire is wrong!</v-btn>
          <v-btn small @click="reviewComment = 'Mind Polarity'">Mind Polarity!</v-btn>
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
      yourAnswer: []
    }),
    methods: {
      nextStep: function() {
        this.retrievedBehavior = false;
        this.approved = false;
        this.$store.commit("project/addStep");
        this.$socket.emit("addStep");
      },
      sendReviewResult: function(reviewResult) {
        this.reviewDialog = false;
        this.$socket.emit("reviewResult", reviewResult, this.reviewStudentName, this.reviewBehavior, this.reviewComment, this.reviewImg);
        this.reviewComment = "";
      },
      sendFeedbackToTeacher: function() {
        this.reviewResultDialog = false;
        this.$socket.emit("teacherFeedback", this.reviewResultImg, this.reviewResultBehavior, this.reviewResult, this.$store.state.student.studentName);
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
        } else {
          this.answerQuestionCorrect = false;
          this.$notify({
            group: "foo",
            type: "error",
            title: "Wrong Answer!"
          })
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
        this.retrievedBehavior = true;
        this.$socket.emit("photo", data, this.currentBehaviors[0]);
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
          this.$notify({
            group: "foo",
            type: "success",
            title: "Feedback from teacher",
            text: data[1] + " is wonderful!"
          })
        } else {
          this.$notify({
            group: "foo",
            type: "warn",
            title: "Feedback from teacher",
            text: data[1] + " not doing well!"
          })
        }
      }
    }

  }
</script>