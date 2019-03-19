<template>
  <div>
    <v-card min-height="1000">
      <v-layout>
        <v-flex xs10>
          <v-layout>
            <v-flex xs6>
              <v-card height="500">
                <div v-if="studentReview.length">
                  <v-card-title primary-title>
                    {{studentReview[0].behavior.name}}
                  </v-card-title>
                  <v-card-media>
                    <v-img contain :src="studentReview[0].img" height="300"></v-img>
                  </v-card-media>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="sendReviewResult(1, studentReview[0].name, studentReview[0].behavior)"><v-icon>done</v-icon></v-btn>
                    <v-btn icon @click="sendReviewResult(0, studentReview[0].name, studentReview[0].behavior)"><v-icon>clear</v-icon></v-btn>
                  </v-card-actions>
                  <v-card-text>
                    <v-text-field v-model="reviewComment" persistent-hint hint="Add some comment" background-color="#FCE4EC"></v-text-field>
                  </v-card-text>
                  <v-card-actions>
                    <v-select label="Select Comment" v-model="reviewComment" :items="['Mind polarity', 'Wire is wrong']"></v-select>
                  </v-card-actions>
                </div>
              </v-card>
            </v-flex>
            <v-flex xs6>
              <v-card height="500">
                <div v-if="studentView.length == 1">
                  <v-img :src="studentView[0].img" contain height="300"></v-img>
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
                      <GChart type="PieChart" :data="[['', ''], ['Right', 50], ['Wrong', 50]]"/>

              <v-card height="500">
                <div v-if="studentView.length == 2">
                  <v-img :src="studentView[1].img" contain height="300"></v-img>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="thu(studentView[1].studentName)"><v-icon>thumb_up</v-icon></v-btn>
                  </v-card-actions>
                </div>
              </v-card>
            </v-flex>
            
            <v-flex xs6>
              <v-card height="500">
                <div v-if="studentView.length == 3">
                  <v-img :src="studnetView[2].img" contain height="300"></v-img>
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
          <div v-for="(step, index) in steps" :key="index">
            {{index + 1}}. {{step.content}}
            <br>
            <span class="font-italic amber--text">
              Number of students in this step: {{stepProfile.filter((element) => (step.content == element.stepContent)).length}}
            </span>
            <v-card-media height="15"></v-card-media>
          </div>
        </v-flex>
      </v-layout>
    </v-card>
    <v-card min-height="500">
      <v-layout>
        <v-flex xs4 >
          <GChart type="PieChart" :data="[['', ''], ['Right', 50], ['Wrong', 50]]"/>
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
        console.log("pr");
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