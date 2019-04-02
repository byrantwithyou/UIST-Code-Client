<template>
  <v-container>
    <v-layout>
      <v-flex xs8 offset-xs2>
        <v-card dark color="#00693e">
          <v-card-media height="100"></v-card-media>
          <p class="text-xs-center">
            <v-icon x-large>fa fa-user-graduate</v-icon>
          </p>
          <v-card-media height="100"></v-card-media>
          <v-card-media>
            <v-layout>
              <v-flex xs6 offset-xs3>
                <v-text-field dark label="Your Name:" v-model="studentName"></v-text-field>
              </v-flex>
            </v-layout>
          </v-card-media>
          <v-card-media height="150"></v-card-media>
          <v-card-actions>
            <v-layout>
              <v-flex xs6 offset-xs3>
                <v-card-actions class="pa-0">
                  <v-spacer></v-spacer>
                  <v-btn primary dark outline @click="studentLogin">Next Step</v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-card-actions>
          <v-card-media height="150"></v-card-media>
        </v-card>
      </v-flex>
    </v-layout>
    <modal name="notAuthored">
      <v-card flat tile>
        <v-card-media height="60"></v-card-media>
        <v-card-title class="font-italic font-weight-black red--text display-1">The teacher has not authored the project! Please wait patiencely!</v-card-title>
      </v-card>
    </modal>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      studentName: "",
    }),
    methods:{
      studentLogin: function() {
        this.$socket.emit("studentLogin", this.studentName);
        this.$store.commit("student/setStudentName", {
          studentName: this.studentName
        })
      }
    },
    sockets: {
      authoring: function(authored) {
        if (authored[1]) {
          this.$store.commit("project/setBehaviors", {
            behaviors: authored[0]
          });
          this.$store.commit("project/setSteps", {
            steps: authored[1]
          });
          this.$store.commit("project/setSubsections", {
            subsections: authored[2]
          });
          this.$store.commit("project/setSettings", {
            settings: authored[3]
          });
          if (authored[4] > 1) {
            for (let i = 0; i < authored[4] - 1; ++i) {
              this.$store.commit("project/addStep");
            }
            this.$router.push("/step");
          } else {

            this.$router.push("/sort");
          }
        } 
      },
      notAuthored: function() {
        this.$modal.show("notAuthored");
        let that = this;
        setTimeout(function() {
          that.$router.push("/");
        }, 1000);
      }
    }
  }
</script>

<style>

</style>
