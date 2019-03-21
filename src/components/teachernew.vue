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
                <div v-if="studentView.length >= 1">
                  <v-card-text>
                    <code>{{studentView[0].studentName}}'s recent progess:</code>
                  </v-card-text>
                  <v-img :src="studentView[0].img" contain height="200"></v-img>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="thu(studentView[0].studentName)"><v-icon>thumb_up</v-icon></v-btn>
                    <v-btn @click="vvif0 = !vvif0" icon><v-icon>reply</v-icon></v-btn>
                    <v-text-field @click:append-outer="sendFeedback0(studentView[0].studentName)" v-model="comments[0]" v-if="vvif0" type="text" label="message" append-outer-icon="send"></v-text-field>
                  </v-card-actions>
                </div>
              </v-card>
            </v-flex>

            <v-flex xs6>
              <v-card height="320">
                <div v-if="studentView.length >= 2">
                  <v-card-text>
                    <code>{{studentView[1].studentName}}'s recent progess:</code>
                  </v-card-text>                  
                  <v-img :src="studentView[1].img" contain height="200"></v-img>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="thu(studentView[1].studentName)"><v-icon>thumb_up</v-icon></v-btn>
                    <v-btn @click="vvif1 = !vvif1" icon><v-icon>reply</v-icon></v-btn>
                    <v-text-field @click:append-outer="sendFeedback1(studentView[1].studentName)" v-model="comments[1]" v-if="vvif1" type="text" label="message" append-outer-icon="send"></v-text-field>
                  </v-card-actions>
                </div>
              </v-card>
            </v-flex>





            
            </v-layout>

            <v-layout>

            <v-flex xs6>
              <v-card height="320">
                <div v-if="studentView.length >= 3">
                  <v-card-text>
                    <code>{{studentView[2].studentName}}'s recent progess:</code>
                  </v-card-text>                  
                  <v-img :src="studentView[2].img" contain height="200"></v-img>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn icon><v-icon @click="thu(studentView[2].studentName)">thumb_up</v-icon></v-btn>
                    <v-btn @click="vvif2 = !vvif2" icon><v-icon>reply</v-icon></v-btn>
                    <v-text-field @click:append-outer="sendFeedback2(studentView[2].studentName)" v-model="comments[2]" v-if="vvif2" type="text" label="message" append-outer-icon="send"></v-text-field>
                  </v-card-actions>
                </div>
              </v-card>
            </v-flex>


            <v-flex xs6 v-if="studentReview.length">
              <v-card dark height="320" v-if="studentReview.length">
                <div v-if="studentReview.length">
                  <v-card-media>
                    <span class="font-weight-bold font-italic amber--text">
                      Style to review: {{studentReview[0].behavior.name}} 
                    </span>
                    <v-img contain :src="studentReview[0].img" height="200"></v-img>
                  </v-card-media>
                  <v-card-actions>
                    <v-btn dark small @click="sendReviewResult(1, studentReview[0].name, studentReview[0].behavior)">Right</v-btn>
                    <v-btn dark small @click="sendReviewResult(0, studentReview[0].name, studentReview[0].behavior)">Wrong</v-btn>
                    <v-layout>
                      <v-flex xs4 offset-xs1>
                        <v-text-field dark height="30" v-model="reviewComment" persistent-hint hint="Add some comment"></v-text-field>
                      </v-flex>
                      <v-flex xs5 offset-xs1>
                        <v-select dark height="30" label="Select Comment" v-model="reviewComment" :items="['Mind polarity', 'Wire is wrong']"></v-select>
                      </v-flex>
                    </v-layout>
                  </v-card-actions>
        
                </div>
              </v-card>
            </v-flex>

            <v-flex xs6 v-if="(studentReview.length == 0) && (studentView.length >= 4)">
              <v-card height="320" v-if="(studentReview.length == 0) && (studentView.length >= 4)">
                <div v-if="(studentReview.length == 0) && (studentView.length >= 4)">
                  <v-card-text>
                    <code>{{studentView[3].studentName}}'s recent progess:</code>
                  </v-card-text>                  
                  <v-img :src="studentView[3].img" contain height="200"></v-img>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn icon><v-icon @click="thu(studentView[3].studentName)">thumb_up</v-icon></v-btn>
                    <v-btn @click="vvif3 = !vvif3" icon><v-icon>reply</v-icon></v-btn>
                    <v-text-field @click:append-outer="sendFeedback3(studentView[3].studentName)" v-model="comments[3]" v-if="vvif3" type="text" label="message" append-outer-icon="send"></v-text-field>
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
            <v-btn @click="change" absolute right>{{btnWord}}</v-btn>
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
      btnWord: "Style",
      comments: ["", "", "", ""],
      vvif0: false,
      vvif1: false,
      vvif2: false,
      vvif3: false
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
      },
      sendFeedback0: function(name) {
        this.vvif0 = false;
        this.$socket.emit("sendFeedback", this.comments[0], name);
        console.log("send okay");
        this.comments[0] = "";
      },
      sendFeedback1: function(name) {
        this.vvif1 = false;
        this.$socket.emit("sendFeedback", this.comments[1], name);
        console.log("send okay");
        this.comments[1] = "";
      },
      sendFeedback2: function(name) {
        this.vvif2 = false;
        this.$socket.emit("sendFeedback", this.comments[2], name);
        console.log("send okay");
        this.comments[2] = "";
      },
      sendFeedback3: function(name) {
        this.vvif3 = false;
        this.$socket.emit("sendFeedback", this.comments[3], name);
        console.log("send okay");
        this.comments[3] = "";
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
        
        if (this.studentView.length > 4) {
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
              name: element.steps[stepNum].content
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