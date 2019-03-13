<template>
  <div>
    <v-layout>
      <v-flex xs9>
        <v-card>
          <v-card-title primary-title>
            <span class="title blue-grey--text font-italic">
              Overview Statistics
            </span>
          </v-card-title>
        </v-card>
        <v-container fluid>
          <v-layout v-for="(student, index) in actionHistory" :key="index">
            <span class="font-weight-thin font-italic ma-2 orange--text"> 
              {{student[0].name}} :
            </span>
              <span class="ma-2" v-for="(action, index0) in student" :key="index0">
                <v-icon>{{action.icon}}</v-icon>
              </span>
          </v-layout>
        </v-container>
        <v-card>
          <v-card-title class="title blue-grey--text font-italic">
            Broadcast to students
          </v-card-title>
          <v-card-text>
            <v-text-field v-model="broadcastMessage" @click:append-outer="broadcast" label="Broadcast Message" append-outer-icon="send"></v-text-field>
          </v-card-text>
        </v-card>
        <v-card>
          <v-card-title class="title blue-grey--text font-italic">
            Student needs your help!
          </v-card-title>
          <v-card-text>
            <v-layout v-if="studentReview">
              <v-flex xs4 v-for="(student, index) in studentReview" :key="index">
                <v-card>
                  <v-card-title primary-title>
                    {{student.behavior.name}}
                  </v-card-title>
                  <v-card-media contain height="200">
                    <v-img contain height="200" :src="student.img"></v-img>
                  </v-card-media>
                  <v-card-text>
                    <v-text-field v-model="reviewComment" persistent-hint hint="Add some comment" background-color="#FCE4EC"></v-text-field>
                  </v-card-text>
                  <v-card-actions>
                    <v-select label="Select Comment" v-model="reviewComment" :items="['Mind polarity', 'Wire is wrong']"></v-select>
                  </v-card-actions>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="sendReviewResult(1, student.name, student.behavior)"><v-icon>done</v-icon></v-btn>
                    <v-btn icon @click="sendReviewResult(0, student.name, student.behavior)"><v-icon>clear</v-icon></v-btn>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs3>
        <v-card contain max-height="500">
          <v-card-title primary-title>
            <span class="body-2 blue-grey--text font-italic">
              Student Behavior History
            </span>
          </v-card-title>
          <v-card-text>
            <v-select v-model="interestedStudent" :items="studentHistory.map((element) => (element.name))" label="Select students you are interested in"></v-select>
          </v-card-text>
          <v-card-text>
            <div @click="feedBack2Student(index)" class="hover-hand" v-if="history">
              <span class="body-2 font-weight-thin grey--text">
                {{history.name}} 
                <span v-if="history.result == 1">passes</span>
                <span v-if="history.result == 0">fails</span>
                {{history.behavior.name}}
              </span>
              <v-btn @click="feedBack2Student(1, history.behavior.name, history.name)" v-if="history.result == 1" icon><v-icon>thumb_up</v-icon></v-btn>
              <v-btn @click="feedBack2Student(0, history.behavior.name, history.name)" v-if="history.result == 0" icon><v-icon>thumb_down</v-icon></v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  //import Trs from "@/components/Trs";
  export default {
    name: "TeacherReviewStudent",
    components: {
      //Trs
    },
    data: () => ({
      chartOptions: {
        chart:{
          title: "Overall Progress",
          subtitle: ""
        }
      },
      studentHistory: [],
      reviewComment: "",
      broadcastMessage: "",
      actionHistory: [],
      interestedStudent: ""
    }),
    sockets: {
      studentProfile: function(studentProfile) {
        this.$store.commit("student/setStudentProfile", {
          studentProfile: studentProfile
        })
      },
      teacherFeedback: function(data) {
        this.studentHistory.unshift({
          img: data[0],
          behavior: data[1],
          result: data[2],
          name: data[3]
        });
        if (this.studentHistory.length > 25) {
          this.studentHistory.pop();
        }
      },
      review2Teacher: function(data) {
        this.$store.commit("student/addStudentReview", {
          name: data[2],
          img: data[0],
          behavior: data[1]
        })
      },
      sort: function(studentName) {
        this.actionHistory.push([{
          icon: "sort",
          behavior: "",
          name: studentName
        }]);
      },
      stepAction: function(data) {
        let behavior = "";
        if (data[1]) {
          behavior = data[1].name;
        }
        this.actionHistory.find((element) => (element[0].name == data[0])).push({
          icon: "done",
          behavior: behavior,
          name: data[0]
        })
      },
      failureHistory: function(data) {
        let behavior = "";
        if (data[1]) {
          behavior = data[1].name;
        }
        this.actionHistory.find((element) => (element[0].name == data[0])).push({
          icon: "clear",
          behavior: behavior,
          name: data[0]
        })
      }
    },
    computed: {
      stepTotNumber: function() {
        let stepTotNumber = 0;
        for (let subsection of this.$store.state.project.subsections) {
          stepTotNumber += subsection.steps.length;
        }
        return stepTotNumber;
      },
      stepData: function() {
        return this.$store.state.student.studentProfile;
      },
      studentReview: function() {
        return this.$store.state.student.studentReview;
      },
      history: function() {
        return this.studentHistory.find((element) => (element.name == this.interestedStudent))
      }
    },
    created: function() {
    },
    methods: {
      feedBack2Student(result, behaviorName, studentName) {
        this.$socket.emit("feedBack2Stu", result, behaviorName, studentName);
      },
      sendReviewResult(reviewResult, studentName, reviewResultBehavior) {
        this.$store.commit("student/deleteStudentReview", {
          name: studentName
        });
        this.$socket.emit("reviewResult", reviewResult, studentName, reviewResultBehavior, this.reviewComment, "teacher");
        this.reviewComment = "";
      },
      broadcast: function() {
        this.$socket.emit("broadcast", this.broadcastMessage);
      }
    }
  }
</script>

<style scoped>
  .hover-hand {
    cursor: pointer
  }
</style>