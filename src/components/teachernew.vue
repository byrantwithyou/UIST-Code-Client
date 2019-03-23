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
                    <GChart type="PieChart" :data="fake0" :options="nooption"></GChart>
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
                    <GChart type="PieChart" :data="fake1" :options="nooption"></GChart>
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
                    <GChart type="PieChart" :data="fake2" :options="nooption"></GChart>
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
                    <v-btn dark small @click="sendReviewResult(1, studentReview[0].name, studentReview[0].behavior, studentReview[0].img)">Right</v-btn>
                    <v-btn dark small @click="sendReviewResult(0, studentReview[0].name, studentReview[0].behavior, studentReview[0].img)">Wrong</v-btn>
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
                    <GChart type="PieChart" :data="fake3" :options="nooption"></GChart>
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
        
          <div v-for="(section, index) in sections">
            <v-btn small @click="changeSpan(index)" icon><v-icon>trending_flat</v-icon></v-btn>
            <div :style="color(studentStepProfile.filter((element) => (element.currentSection == (index + 1))).length)">
              <span>
                {{section.name}}
              </span>
              <div class="font-weight-bold text-xs-right">
                Number of people: {{studentStepProfile.filter((element) => (element.currentSection == (index + 1))).length}}
              </div>
            </div>
            <div v-for="(step, index1) in section.steps" color="red">
              <div :style="color(studentStepProfile.filter((element) => (element.stepContent == (step))).length)">
                <span v-if="span[index]" >
                  {{step}}
                </span>
                <div v-if="span[index]" class="font-weight-bold text-xs-right">
                  Number of people: {{studentStepProfile.filter((element) => (element.stepContent == (step))).length}}
                </div>
              </div>
            </div>
          </div>
        </v-flex>
      </v-layout>

    </v-card>
    <v-card height="100" flat tile>
      <v-layout>
        <v-flex xs3 v-for="index in smallLength" :key="index">
          <GChart type="PieChart" :data="chartData[index - 1]" :options="options[index - 1]"></GChart>
        </v-flex>
      </v-layout>
    </v-card>
  </div>

</template>

<script>
  export default ({
    name: "teachernew",
    data: () => ({
      span: [],
      steps: [],
      sections: [],
      settings: [],
      behaviors: [],
      reviewComment: "",
      studentView: [],
      chartData: [[['Right', 'Wrong'], ["Right", 0], ["Wrong", 0]], [['Right', 'Wrong'], ["Right", 0], ["Wrong", 0]], [['Right', 'Wrong'], ["Right", 0], ["Wrong", 0]], [['Right', 'Wrong'], ["Right", 0], ["Wrong", 0]]],
      options: [{
        title: "",
        height: 100,
        colors: ['green', 'red'],
        legend: "none"
      },{
        title: "",
        height: 100,
        colors: ['green', 'red'],
        legend: "none"
      },{
        title: "",
        height: 100,
        colors: ['green', 'red'],
        legend: "none"
      },
      {
        title: "",
        height: 100,
        colors: ['green', 'red'],
        legend: "none"
      }],
      btnWord: "Style",
      comments: ["", "", "", ""],
      vvif0: false,
      vvif1: false,
      vvif2: false,
      vvif3: false,
      studentProfile: [],
      nooption: {
        legend: "none",
        height: 50,
        width: 50,
        colors: ['green', 'red']
      },
      studentStepProfile: []
    }),
    created: function() {
      for (let i = 0; i < this.sections.length; ++i) {
        this.span.push(false);  
      }
    },
    methods: {
      color: function(number) {
        let percentage = number / this.studentStepProfile.length;
        if (0 == percentage) return {
          color: "grey"
        }
        if (percentage < .3) return {
          color: "red"
        }
        return {
          color: "green"
        }
      },
      changeSpan: function(index) {
        console.log(index);
        if (this.span[index]) {
          this.$set(this.span, index, false);
        } else {
          this.$set(this.span, index, true);
        }
      },
      sendReviewResult(reviewResult, studentName, reviewResultBehavior, img) {
        this.$store.commit("student/deleteStudentReview", {
          img: img
        });
        this.$socket.emit("reviewResult", reviewResult, studentName, reviewResultBehavior, this.reviewComment, "teacher");
        this.reviewComment = "";
      },
      thu: function(studentName) {
        this.$socket.emit("pr", studentName);
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
        this.comments[0] = "";
      },
      sendFeedback1: function(name) {
        this.vvif1 = false;
        this.$socket.emit("sendFeedback", this.comments[1], name);
        this.comments[1] = "";
      },
      sendFeedback2: function(name) {
        this.vvif2 = false;
        this.$socket.emit("sendFeedback", this.comments[2], name);
        this.comments[2] = "";
      },
      sendFeedback3: function(name) {
        this.vvif3 = false;
        this.$socket.emit("sendFeedback", this.comments[3], name);
        this.comments[3] = "";
      }
    },
    sockets: {
      review2Teacher: function(data) {
        this.$store.commit("student/addStudentReview", {
          name: data[2],
          img: data[0],
          behavior: data[1]
        })
      },
      authoring: function(data) {
        this.behaviors = data[0]
        this.steps = data[1];
        this.sections = data[2];
        this.settings = data[3];
      },
      studentView: function( data ) {
        let img = data[0];
        let studentName = data[1];
        this.studentView.unshift({
          img: img,
          studentName: studentName
        });
        
        if (this.studentView.length > 4) {
          this.studentView.pop();
        }
        
      },
      styleLog: function(data) {
        let style = data[0];
        let studentName = data[1];
        let result = data[2];
        if ( 1 == result) {
          this.styleProfile[this.styleProfile.findIndex((element) => (element.name == style))].good += 1;
          if (this.studentProfile.find((element) => (element.name == studentName))) {
            this.studentProfile[this.studentProfile.findIndex((element) => (element.name == studentName))].good += 1;
          }
        } else {
          this.styleProfile[this.styleProfile.findIndex((element) => (element.name == style))].bad += 1;
          if (this.studentProfile.find((element) => (element.name == studentName))) {
            this.studentProfile[this.studentProfile.findIndex((element) => (element.name == studentName))].bad += 1;
          }
        }
        this.styleProfile.sort( function (element1, element2) {
          if ((element1.good + element1.bad) == 0) {
            return 1;
          }
          if ((element2.good + element2.bad) == 0) {
            return -1;
          }
          let e1 = element1.good / ( element1.good + element1.bad);
          let e2 = element2.good / ( element2.good + element2.bad);
          if (e1 < e2) {
            return -1;
          }
          if (e1 > e2) {
            return 1;
          } 
          if (element1.good > element2.good) {
            return -1;
          }
          return 0;
        });
        for (let i = 0; i < this.smallLength; ++i) {
          this.chartData[i][1][1] = this.styleProfile[i].good;
          this.chartData[i][2][1] = this.styleProfile[i].bad; 
          this.options[i].title = this.styleProfile[i].name;
        }
      },
      studentLogin: function(studentName) {
        if (!this.studentProfile.map((element) => (element.name)).includes(studentName)) {
          this.studentProfile.push({
            name: studentName,
            good: 0,
            bad: 0
          });    
        }
      },
      studentStepProfile: function(data) {
        this.studentStepProfile = data;
      }
    },
    computed: {
      fake0: function() {
        if (this.studentView[0]) {
          let name = this.studentView[0].studentName;
          if (this.studentProfile.find((element) => (element.name == name))) {
            return [['', ''], ['Right', this.studentProfile.find((element) => (element.name == name)).good], ['', this.studentProfile.find((element) => (element.name == name)).bad]]
          }
        }
      },
      fake1: function() {
        if (this.studentView[1]) {
          let name = this.studentView[1].studentName;
          if (this.studentProfile.find((element) => (element.name == name))) {
            return [['', ''], ['Right', this.studentProfile.find((element) => (element.name == name)).good], ['', this.studentProfile.find((element) => (element.name == name)).bad]]
          }
        }
      },
      fake2: function() {
        if (this.studentView[2]) {
          let name = this.studentView[2].studentName;
          if (this.studentProfile.find((element) => (element.name == name))) {
            return [['', ''], ['Right', this.studentProfile.find((element) => (element.name == name)).good], ['', this.studentProfile.find((element) => (element.name == name)).bad]]
          }
        }
      },
      fake3: function() {
        if (this.studentView[3]) {
          let name = this.studentView[3].studentName;
          if (this.studentProfile.find((element) => (element.name == name))) {
            return [['', ''], ['Right', this.studentProfile.find((element) => (element.name == name)).good], ['', this.studentProfile.find((element) => (element.name == name)).bad]]
          }
        }
      },
      studentReview: function() {
        return this.$store.state.student.studentReview;
      },
      styleProfile: function() {
        return this.behaviors.map((element) => ({
          name: element.name,
          good: 0,
          bad: 0
        }))
      },
      smallLength: function() {
        return this.behaviors.length > 4? 4: this.behaviors.length;
      }
      
    }
  })
</script>