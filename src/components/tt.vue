<template>
  <div>
    <v-card height="640">
      <v-layout>
        <v-flex xs10>
          <v-layout>
            <v-flex xs6>
              <v-card height="320">
                <div >
                  <v-card-title primary-title>
                    asdfavadfs
                  </v-card-title>
                  <v-card-media>
                    <v-img contain src="hello.jpg" height="100"></v-img>
                  </v-card-media>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn small icon @click="sendReviewResult(1, studentReview[0].name, studentReview[0].behavior)"><v-icon>done</v-icon></v-btn>
                    <v-btn small icon @click="sendReviewResult(0, studentReview[0].name, studentReview[0].behavior)"><v-icon>clear</v-icon></v-btn>
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
                <div>
                  <v-card-media height="40"></v-card-media>
                  <v-img src="hello.jpg" contain height="200"></v-img>
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
                <div>
                  <v-card-media height="40"></v-card-media>
                  <v-img src="hello.jpg" contain height="200"></v-img>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="thu(studentView[1].studentName)"><v-icon>thumb_up</v-icon></v-btn>
                  </v-card-actions>
                </div>
              </v-card>
            </v-flex>
            
            <v-flex xs6>
              <v-card height="320">
                <div>
                  <v-card-media height="40"></v-card-media>
                  <v-img src="hello.jpg" contain height="200"></v-img>
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
    <v-card height="80"></v-card>
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
      studentView: []
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
        this.stepProfile = data;
      },
      studentView: function( data ) {
        let img = data[0];
        let studentName = data[1];
        if (this.studentView.length <= 2) {
          this.studentView.push({
            img: img,
            studentName: studentName
          })
        }
      }
    },
    computed: {
      studentReview: function() {
        return this.$store.state.student.studentReview;
      },
    }
  })
</script>