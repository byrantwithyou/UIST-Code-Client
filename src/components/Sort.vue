<template>
   <v-container>
    <v-layout>
      <v-flex xs8 offset-xs2>
        <v-card>
          <v-card-media height="50"></v-card-media>
          <span class="font-weight-black grey--text display-1 ma-5">
            Decide your circuit prototyping orders
          </span>
          <v-card-media height="50"></v-card-media>
          <v-card-media height="250">
            <v-img :src="$store.state.project.settings.projectTutorial" contain height="250">
            </v-img>
          </v-card-media>
          <v-card-text>
          <draggable :list="subsections">
            <div v-for="(subsection, index) in subsections" :key="index">
              <span class="font-weight-bold headline font-italic indigo--text">
                {{index + 1}}. {{subsection.name}} Subsection
              </span>
              <draggable :list="subsection.steps">
                <div v-for="(step, index) in subsection.steps" :key="index">
                  <span class="font-italic teal--text">
                    {{index + 1}}. {{step}}
                  </span>
                </div>
              </draggable>
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
  </v-container>
</template>

<script>
  import draggable from "vuedraggable";
  export default {
    name: "Sort",
    methods: {
      nextStep: function() {
        this.$store.commit("project/setSubsections", {
          subsections: this.subsections
        })
        this.$router.push("/step");
      }
    },
    components: {
      draggable
    },
    computed: {
      subsections: function() {
        return this.$store.state.project.subsections;
      }
    }
  }

</script>