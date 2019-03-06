<template>
  <v-container>
    <v-layout>
      <v-flex xs-8 offset-xs2>
      <v-card>
        <v-card-media height="200"></v-card-media>
        <v-card-text>
          <v-text-field label="Your Name:" v-model="studentName"></v-text-field>
        </v-card-text>
        <v-card-media height="100">
        </v-card-media>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="studentLogin">Next</v-btn>
        </v-card-actions>
      </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      studentName: ""
    }),
    methods:{
      studentLogin: function() {
        this.$socket.emit("studentLogin", this.studentName);
      }
    },
    sockets: {
      authoring: function(authored) {
        let behaviors = authored[0];
        let steps = authored[1];
        let subsections = authored[2];
        let settings = authored[3];
        this.$store.commit("project/setBehaviors", {
          behaviors: behaviors
        });
        this.$store.commit("project/setSteps", {
          steps: steps
        });
        this.$store.commit("project/setSubsections", {
          subsections: subsections
        });
        this.$store.commit("project/setSettings", {
          settings: settings
        });
        this.$router.push("/sort");
      }
    }
  }
</script>

<style>

</style>
