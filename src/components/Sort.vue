<template>
   <v-container>
    <v-layout>
      <v-flex xs8 offset-xs2>
        <v-card>
          <v-card-media height="50"></v-card-media>
          <span class="font-weight-black font-italic orange--text display-1 ma-5">
            Decide your circuit prototyping orders
          </span>
          <v-card-media height="50"></v-card-media>
          <v-card-media height="250">
            <v-img :src="$store.state.project.settings.projectTutorial" contain height="250">
            </v-img>
          </v-card-media>
          <v-card-text>
          <draggable :list="studentSections">
            <div v-for="(subsection, index) in studentSections" :key="index">
              <span class="font-weight-bold headline font-italic indigo--text">
                {{index + 1}}. {{subsection.name}} Subsection
              </span>
                <div v-for="(step, index) in subsection.steps" :key="index">
                  <span class="font-italic teal--text">
                    {{index + 1}}. {{step}}
                  </span>
                </div>
            </div>
          </draggable>
          </v-card-text>
          <v-card-media height="50"></v-card-media>
          <v-card-actions> 
            <v-spacer></v-spacer>
            <v-btn @click="nextStep" outline color="#E53935">Next Step</v-btn>
          </v-card-actions>
          <v-card-media height="50"></v-card-media>
        </v-card>
      </v-flex>
    </v-layout>
    <modal name="right">
      <v-card flat tile>
        <v-card-media height="60"></v-card-media>
        <v-card-title class="font-italic font-weight-black green--text display-1">Right!</v-card-title>
      </v-card>
    </modal>
    <modal name="wrong">
      <v-card flat tile>
        <v-card-media height="60"></v-card-media>
        <v-card-title class="font-italic font-weight-black red--text display-1">Wrong!</v-card-title>
      </v-card>
    </modal>
  </v-container>
</template>

<script>
  import draggable from "vuedraggable";
  export default {
    name: "Sort", 
    data: () => ({
      studentSections: [],
    }),
    methods: {
      nextStep: function() {
        if (JSON.stringify(this.studentSections) == JSON.stringify(this.subsections)) {
          this.$modal.show("right");
          let that = this;
          setTimeout(function() {            
            that.$router.push("/step");
          }, 100);
        } else {
          this.$modal.show("wrong");
        }
      }
    },
    components: {
      draggable
    },
    computed: {
      subsections: function() {
        return this.$store.state.project.subsections;
      }
    },
    created: function() {
      this.studentSections = JSON.parse(JSON.stringify(this.subsections));
      function shuffle(array) {
        array.sort(() => Math.random() - .5);
      }
      shuffle(this.studentSections);
    },

  }

</script>