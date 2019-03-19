<template>
  <div>
    <v-card height="640">
      <v-layout>
        <v-flex xs10 v-if="btnWord == 'Style'"> 
          <v-card flat tile>
            <v-card-text class="display-1 font-weight-black font-italic blue-grey--text ma-1">
              Tutorial
            </v-card-text>
            <v-img :src="settings.projectTutorial" contain height="400" v-if="btnWord == 'Style'">
            </v-img>
          </v-card>
        </v-flex>
        <v-flex xs10 v-if="btnWord == 'Classroom'">
          <v-layout>
            <v-flex xs6>
              <v-card height="320">
                <div v-if="studentReview.length">
                  <v-card-title primary-title>
                    {{studentReview[0].behavior.name}} asdfavadfs
                  </v-card-title>
                  <v-card-media>
                    <v-img contain :src="studentReview[0].img" height="100"></v-img>
                  </v-card-media>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="sendReviewResult(1, studentReview[0].name, studentReview[0].behavior)"><v-icon>done</v-icon></v-btn>
                    <v-btn icon @click="sendReviewResult(0, studentReview[0].name, studentReview[0].behavior)"><v-icon>clear</v-icon></v-btn>
                  </v-card-actions>
                  <v-card-text>
                    <v-layout>
                      <v-flex xs5>
                        <v-text-field height="30" v-model="reviewComment" persistent-hint hint="Add some comment" background-color="#FCE4EC"></v-text-field>
                      </v-flex>
                      <v-flex xs5 offset-xs1>
                        <v-select height="30" label="Select Comment" v-model="reviewComment" :items="['Mind polarity', 'Wire is wrong']"></v-select>
                      </v-flex>
                    </v-layout>
                  </v-card-text>
                </div>
              </v-card>
            </v-flex>
            <v-flex xs6>
              <v-card height="320">
                <div v-if="studentView.length >= 1">
                  <v-card-media height="40"></v-card-media>
                  <v-img :src="studentView[0].img" contain height="200"></v-img>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="thu(studentView[0].studentName)"><v-icon>thumb_up</v-icon></v-btn>
                  </v-card-actions>
                </div>
              </v-card>
            </v-flex>
            </v-layout>
            <v-layout>
            <v-flex xs6>

              <v-card height="320">
                <div v-if="studentView.length >= 2">
                  <v-card-media height="40"></v-card-media>
                  <v-img :src="studentView[1].img" contain height="200"></v-img>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="thu(studentView[1].studentName)"><v-icon>thumb_up</v-icon></v-btn>
                  </v-card-actions>
                </div>
              </v-card>
            </v-flex>
            
            <v-flex xs6>
              <v-card height="320">
                <div v-if="studentView.length >= 3">
                  <v-card-media height="40"></v-card-media>
                  <v-img :src="studnetView[2].img" contain height="200"></v-img>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn icon><v-icon @click="thu(studentView[2].studentName)">thumb_up</v-icon></v-btn>
                  </v-card-actions>
                </div>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs2>
          <v-badge left>
            <template v-slot:badge>
              <span>{{studentReview.length}}</span>
            </template>
            <v-btn @click="change" absolute right fab>{{btnWord}}</v-btn>
          </v-badge>
          <v-treeview :items="treeItems"></v-treeview>
          <!--div v-for="(step, index) in steps" :key="index">
            {{index + 1}}. {{step.content}}
            <br>
            <span class="font-italic amber--text">
              Number of students in this step: {{stepProfile.filter((element) => (step.content == element.stepContent)).length}}
            </span>
          </div-->
        </v-flex>
      </v-layout>

    </v-card>
    <v-card height="75">
      <v-layout>
        <v-flex xs3 v-for="index in 4" :key="index">
          <div>
            Wire
          </div>
          <GChart type="PieChart" :data="chartData" :options="options"></GChart>
        </v-flex>
      </v-layout>
    </v-card>
  </div>

</template>

<script>
  export default ({
    name: "teachernew",
    data: () => ({
      styleData: [],
      top4Style: [],
      behaviors: [],
      steps: [],
      sections: [],
      settings: [],
      stepProfile: [],
      reviewComment: "",
      studentView: [],
      chartData: [ ['Right', 'Wrong'], ["Right", 50], ["Wrong", 50]],
      options: {
        'title': "Wire",
        height: 60,
        colors: ['green', 'red']
      },
      btnWord: "Style"
    }),
    methods: {
      sendReviewResult(reviewResult, studentName, reviewResultBehavior) {
        this.$store.commit("student/deleteStudentReview", {
          name: studentName
        });
        this.$socket.emit("reviewResult", reviewResult, studentName, reviewResultBehavior, this.reviewComment, "teacher");
        this.reviewComment = "";
      },
      thu: function(studentName) {
        this.$socket.emit("pr", studentName);
        console.log("pr");
      },
      change: function() {
        if (this.btnWord == "Style") {
          this.btnWord = "Classroom"
        } else {
          this.btnWord = "Style"
        }
      }
    },
    sockets: {
      review2Teacher: function(data) {
        console.log(data);
        this.$store.commit("student/addStudentReview", {
          name: data[2],
          img: data[0],
          behavior: data[1]
        })
      },
      styleData: function(data) {
        this.styleData = data;
        let style = this.styleData[0];
        let right = this.styleData.filter((element) => (element.style == style && element.reviewResult == 1)).length;
        let wrong = this.styleData.filter((element) => (element.style == style && element.reviewResult == 0)).length;
        this.top4Style = [['', ''], ['Right', right], ['Wrong', wrong]]  
      },
      authoring: function(data) {
        this.behaviors = data[0];
        this.steps = data[1];
        this.sections = data[2];
        this.settings = data[3];
      },
      stepProfile: function(data) {
        console.log("stepProfile");
        console.log(data);
        this.stepProfile = data;
      },
      studentView: function( data ) {
        console.log("studentView");
        let img = data[0];
        let studentName = data[1];
        this.studentView.unshift({
          img: img,
          studentName: studentName
        });
        
        if (this.studentView.length > 3) {
          this.studentView.pop();
        };
        
      }
    },
    computed: {
      studentReview: function() {
        return this.$store.state.student.studentReview;
      },
      treeItems: function() {
        return this.sections.map(function ( element ) {
          let stepElement = [];
          for (let stepNum = 0; stepNum < element.steps.length; ++stepNum ) {
            stepElement.push({
              id: element.steps[stepNum].content,
              name: "Step" + (stepNum + 1)
            })
          }
          return {
            id: element.name,
            name: "Section " + element.name,
            children: stepElement
          }
        })
      }
    }
  })
</script>