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
      </v-flex>
      <v-flex xs3>
        <v-card contain max-height="500">
          <v-card-title primary-title>
            <span class="body-2 blue-grey--text font-italic">
              Student Behavior History
            </span>
          </v-card-title>
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
    }),
    sockets: {
      studentProfile: function(studentProfile) {
        this.$store.commit("student/setStudentProfile", {
          studentProfile: studentProfile
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
    }
  }
</script>