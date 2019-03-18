<template>
  <div>
    <v-card min-height="1000">
      <v-layout>
        <v-flex xs10></v-flex>
        <v-flex xs2>
          <div v-for="(step, index) in steps" :key="index">
            {{step.content}}
          </div>
        </v-flex>
      </v-layout>
    </v-card>
    <v-card min-height="500">
      <v-layout>
        <v-flex xs4 v-for="(style ,index) in top4Style" :key="index">
          <GChart type="PieChart" :data="style"/>
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
      top4Style: []
    }),
    methods: {

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
      }
    },
    computed: {
      steps: function() {
        return this.$store.state.project.steps;
      },
      studentReview: function() {
        return this.$store.state.student.studentReview;
      },
    }
  })
</script>