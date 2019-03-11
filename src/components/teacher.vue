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
          <v-card-media contain height="200">
            <GChart type="ColumnChart" :data="stepData" :options="chartOptions"/>>
          </v-card-media>
        </v-card>
        <v-card>
          <v-card-title class="title blue-grey--text font-italic">
            Student needs your help!
          </v-card-title>
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
            <div @click="feedBack2Student(index)" class="hover-hand" v-for="(history, index) in studentHistory" :key="index">
              <span v-if="studentHistory" class="body-2 font-weight-thin grey--text">
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
          behavior: data[1].name
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
      }
    },
    created: function() {
    },
    methods: {
      feedBack2Student(result, behaviorName, studentName) {
        this.$socket.emit("feedBack2Stu", result, behaviorName, studentName);
      }
    }
  }
</script>

<style scoped>
  .hover-hand {
    cursor: pointer
  }
</style>