<template>
  <div>
  <notifications :duration="5000" group="foo" position="top right" >
      <template slot="body" slot-scope="props">
        <div>{{props.item.data.number}}</div>
        <v-btn @click="emit"></v-btn>
      </template>
    </notifications>

  <v-btn @click="test">Test</v-btn>
  <v-container>
    <v-layout>
      <v-flex xs8 offset-xs2>
        <v-card>
          

          <!--        This is the teaching stuff                                   -->
          <v-card-title>
            <span class="display-1 font-weight-black font-italic blue-grey--text ma-2">Tutorial</span>
          </v-card-title>
          <v-card-media contain height="400">
            <v-img contain height="400" :src="tutorial"></v-img>
          </v-card-media>
          <v-card-media height="30"></v-card-media>
          <v-card-text>
            <div>
              <span class="headline font-weight-regular grey--text font-italic">{{currentSubsectionName}} Subsection</span>
            </div>
            <v-card-media height="30"></v-card-media>
            <div>
              <span class="title font-italic amber--text">Step Instruction</span>
            </div>
            <v-card-media height="30"></v-card-media>
            <div>
              <span class="subheading font-weight-light black--text">{{$store.state.project.step}}. {{currentStepContent}}</span>
            </div>
          </v-card-text>
           
           <v-card-text>
              <v-popover offset="16" v-if="currentBehaviors.length != 0">
                <span class="tooltip-target">Mind the {{currentBehaviors[0].name}} style</span>
                <template slot="popover">
                  <v-card tile hover elevation="13" :color="behaviorColor">
                    <v-card-text>
                      Style: {{currentBehaviors[0].name}}
                      <br>
                      Validation Method: {{currentBehaviors[0].detectionMethod}}
                      <br>
                      Level: {{currentBehaviors[0].level}}
                      <br>
                      Block or not? {{currentBehaviors[0].dealingMethod}}
                      <br>
                      Style Description: {{currentBehaviors[0].description}}
                      <v-card-media height="10"></v-card-media>
                      <v-layout>
                        <v-flex xs6>
                          <div style="text-align: center">
                            Good Example of the style
                          </div>
                          <v-card-media height="10"></v-card-media>
                          <v-card-media contain height="50">
                            <v-img contain height="50" :src="currentBehaviors[0].goodExample"></v-img>
                          </v-card-media>
                        </v-flex>
                        <v-flex xs6>
                          <div style="text-align: center">
                            Bad Example of the style
                          </div>
                          <v-card-media height="10"></v-card-media>
                          <v-card-media contain height="50">
                            <v-img contain height="50" :src="currentBehaviors[0].badExample"></v-img>
                          </v-card-media>
                        </v-flex>
                      </v-layout>
                      <v-card-media height="30"></v-card-media>
                  </v-card-text>
                </v-card>
                </template>
              </v-popover>
           </v-card-text>
          



              <v-card tile v-if="currentBehaviors.length != 0 && currentBehaviors[0].question" hover elevation="13">
                <v-card-text>
                  <span class="header font-weight-black"></span>
                  {{currentBehaviors[0].question}}
                </v-card-text>
                <v-card-text>
                  <v-checkbox v-model="yourAnswer" v-for="(answer, index) in currentBehaviors[0].answerSets" :value="index" :key="answer.question" :label="answer.question"></v-checkbox>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn @click="submitAnswer" small>Submit answer</v-btn>
                </v-card-actions>
              </v-card>




          <v-card-actions v-if="currentBehaviors.length != 0">
            <v-spacer></v-spacer>
            <v-btn @click="nextStep" v-if="currentBehaviors[0].question && !arrSectionEnd" :disabled="!answerQuestionCorrect" outline color="#E53935">Next Step</v-btn>
            <v-btn @click="nextStep" v-if="currentBehaviors[0].question == '' && !arrSectionEnd" outline color="#E53935">Next Step</v-btn>
            <!--v-btn @click="nextStep" v-if="currentBehaviors[0].question && arrSectionEnd" :disabled="!answerQuestionCorrect || !fetchedBehavior" outline color="#E53935">Next Step</v-btn>
            <v-btn @click="nextStep" v-if="currentBehaviors[0].question == '' && arrSectionEnd" :disabled="!fetchedBehavior" outline color="#E53935">Next Step</v-btn-->
            <v-btn @click="nextStep" v-if="currentBehaviors[0].question && arrSectionEnd" :disabled="!answerQuestionCorrect" outline color="#E53935">Next Step</v-btn>
            <v-btn @click="nextStep" v-if="currentBehaviors[0].question == '' && arrSectionEnd" outline color="#E53935">Next Step</v-btn>
     
          </v-card-actions>
         
          <v-card-actions v-if="currentBehaviors.length == 0">
            <v-spacer></v-spacer>
            <v-btn @click="nextStep" v-if="!arrSectionEnd" outline color="#E53935">Next Step</v-btn>
            <v-btn @click="nextStep" :disabled="!fetchedBehavior" v-if="arrSectionEnd" outline color="#E53935">Next Step</v-btn>
          </v-card-actions>
        
        </v-card>
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
    <modal name="over">
      <v-card flat tile>
        <v-card-media height="60"></v-card-media>
        <v-card-title class="font-italic font-weight-black blue--text display-2">Congratulations! Your project is done!</v-card-title>
      </v-card>
    </modal>

    <modal name="sectionend">
      <v-card flat tile>
        <v-card-media height="60"></v-card-media>
        <v-card-title class="font-italic font-weight-black orange--text display-1">Please take a photo of this section after this step!</v-card-title>
      </v-card>
    </modal>

      <modal :height="900" v-for="(review, index) in photoToReview" @closed="close(index)" :key="index" :name="index.toString()">
        <v-card flat tile>
          <v-card-title>
            <span class="font-weight-black font-italic title">
              Please review the following style
            </span>
          </v-card-title>
          <v-card-title primary-title>
            {{review.behavior.name}}
          </v-card-title>
          <v-card-media contain height="200">
            <v-img contain :src="review.img" height="200"></v-img>
          </v-card-media>
          <v-card-text>
            <v-text-field persistent-hint hint="Add some comment" background-color="#FCE4EC" v-model="photoToReview[index].comment"></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-layout>
              <v-flex xs10 offset-xs1>
                <v-select label="Select Comment" v-model="photoToReview[index].comment" :items="['Mind polarity', 'Wire is wrong']"></v-select>
              </v-flex>
            </v-layout>
          </v-card-actions>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn icon @click="sendReviewResult(index, 1, review.studentName, review.behavior, review.comment, review.img)"><v-icon>done</v-icon></v-btn>
            <v-btn icon @click="sendReviewResult(index, 1, review.studentName, review.behavior, review.comment, review.img)"><v-icon>clear</v-icon></v-btn>
          </v-card-actions>
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
      sectionBehaviors: [],
      fetchedBehavior: false,
      photoToReview: [],
    }),
    methods: {
      nextStep: function() {
        this.fetchedBehavior = false;
        if (this.currentBehaviors.length != 0 && (this.currentBehaviors[0].question == '') && !this.sectionBehaviors.map((element) => (element.name)).includes(this.currentBehaviors[0].name)) {
          this.sectionBehaviors.push(this.currentBehaviors[0]);
        }
        if (this.$store.state.project.step == this.stepTot)  {
          this.$modal.show("over");
          this.$socket.emit("stepAction", this.currentBehaviors[0]);         
          return;
        }
        this.answerQuestionCorrect = false;
        this.yourAnswer = [];
        this.$socket.emit("stepAction", this.currentBehaviors[0]);
        this.$store.commit("project/addStep");
        this.$socket.emit("addStep");
        if (this.$store.state.project.currentStepContent == this.$store.state.project.subsections[this.$store.state.project.currentSubsection - 1].steps[0]) {
          for (let i = 0; i < this.photoToReview.length; ++i) {
            this.$modal.show(i.toString());    
          }
        }
        let sectionStep = this.$store.state.project.subsections[this.$store.state.project.currentSubsection - 1].steps;
        if ( this.$store.state.project.currentStepContent == sectionStep[sectionStep.length - 1] ) {
          this.$modal.show("sectionend");
          if (this.currentBehaviors.length != 0 && (this.currentBehaviors[0].question == '') && !this.sectionBehaviors.map((element) => (element.name)).includes(this.currentBehaviors[0].name)) {
            this.sectionBehaviors.push(this.currentBehaviors[0]);
          }
        }
      },
      close: function( index ) {
        if (index == 0) {
          this.photoToReview = [];
        }
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
      sendReviewResult: function(index, reviewResult, studentName, behavior, comment, img) {
        this.$modal.hide(index.toString());
        this.$socket.emit("reviewResult", reviewResult, studentName, behavior, comment, img);
      },
      test: function() {
        this.$notify({
          group: "foo",
          data: {
            number: 1
          }
        })
      },
      emit: function() {
        console.log("ttt");
      }
    },
    computed: {
      behaviorColor: function() {
        const mapping = {
          "High": "red",
          "Middle": "yellow",
          "Low": "green"
        }
        return mapping[this.currentBehaviors[0].level];
      },
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
      arrSectionEnd: function() {
        let sectionStep = this.$store.state.project.subsections[this.$store.state.project.currentSubsection - 1].steps;
        return sectionStep[sectionStep.length - 1] == this.currentStepContent? true: false;
      }
      
    },
    created: function() {
      console.log(this.$socket.id);
      for (let subsection of this.$store.state.project.subsections)  {
        this.stepTot += subsection.steps.length;
      }
      if (this.currentBehaviors.length != 0 && this.currentBehaviors[0].question == '') {
        this.sectionBehaviors.push(this.currentBehaviors[0]);
      }
    },
    sockets: {
      photo: function(data) {
        console.log(data);
        this.fetchedBehavior = true;
        if (this.sectionBehaviors.length != 0) {
          for (let behavior of this.sectionBehaviors) {
            this.$socket.emit("photo", data, behavior);
            console.log("send photo");
          }
          
        }
        this.sectionBehaviors = [];
      },
      photoToJudge: function(data) {
        let img = data[0][0];
        let studentName = data[0][1];
        let behavior = data[1];

        console.log("photoToJudege");
        this.photoToReview.push({
          img: img,
          studentName: studentName,
          behavior: behavior,
          comment: ""
        })
      },
      reviewResult: function( data ) {
        console.log(data);
      }
    }

  }
</script>