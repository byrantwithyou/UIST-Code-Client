<template>
  <div>
    <v-card min-height="1000">
      <v-layout>
        <v-flex xs10>
          <v-layout>
            <v-flex xs6>
              <v-card height="500">
                <div v-if="studentReview.length">
                  <v-card-title>
                    {{studentReview[0].behavior.name}}
                  </v-card-title>
                  <v-card-media>
                    <v-img contain :src="studentReview[0].img" height="300"></v-img>
                  </v-card-media>
                  <v-card-actions>
                    <v-btn icon @click="good">done</v-btn>
                    <v-btn icon @click="clear">clear</v-btn>
                  </v-card-actions>
                </div>
              </v-card>
            </v-flex>
            <v-flex xs6>
              <v-card height="500"></v-card>
            </v-flex>
            <v-flex xs6></v-flex>
              <v-card height="500"></v-card>
            <v-flex xs6>
              <v-card height="500"></v-card>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs2>
          <div v-for="(step, index) in steps" :key="index">
            {{index + 1}}. {{step.content}}
            <br>
            <span class="font-italic amber--text">
              Number of students in this step: {{stepProfile.filter((element) => (element.stepContent)).length}}
            </span>
            <v-card-media height="15"></v-card-media>
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
      top4Style: [],
      behaviors: [],
      steps: [],
      sections: [],
      settings: [],
      stepProfile: []
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
      }
    },
    computed: {
      studentReview: function() {
        return this.$store.state.student.studentReview;
      },
    }
  })
</script>