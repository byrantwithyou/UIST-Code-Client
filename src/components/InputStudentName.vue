<template>
  <v-container>
    <v-layout>
      <v-text-field box outline placeholder="Please input your name here" v-model="studentName"></v-text-field>
      <br>
      <v-card>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="studentLogin">Next</v-btn>
        </v-card-actions>
      </v-card>
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
      }
    }
  }
</script>

<style>

</style>
