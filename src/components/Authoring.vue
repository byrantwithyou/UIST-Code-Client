<template>
  <v-container>
    <v-layout>
      <v-flex xs8 offset-xs2>
        <v-card>
          <v-card-title primary-title>
            Authoring Tool
          </v-card-title>
          <AuthoringBehaviors v-if="authoringStep==1"></AuthoringBehaviors>
          <AuthoringSteps v-if="authoringStep==2"></AuthoringSteps>
          <AuthoringSubsections v-if="authoringStep==3"></AuthoringSubsections>
          <AuthoringSettings v-if="authoringStep==4"></AuthoringSettings>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="next">Next</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  // eslint-disable-next-line
  import behaviors from "../behaviors";
  import AuthoringBehaviors from "@/components/AuthoringBehaviors";
  import AuthoringSteps from "@/components/AuthoringSteps";
  import AuthoringSubsections from "@/components/AuthoringSubsections";
  import AuthoringSettings from "@/components/AuthoringSettings";

  export default {
    data: () => ({
      behaviors: behaviors,
      steps: [],
      subsections: [],
      settings: {},
      authoringStep: 1,
    }),
    methods:{
      test: function() {
        this.$socket.emit("authoring", this.behaviors, this.steps, this.subsections, this.settings);
      },
      next: function() {
        if (4 == this.authoringStep) {
          this.$socket.emit("authoring", this.behaviors, this.steps, this.subsections, this.settings);
          this.$router.push("/teacher");
        }
        this.authoringStep += 1;
      }
    },
    sockets: {
    },
    components: {
      AuthoringBehaviors,
      AuthoringSteps,
      AuthoringSubsections,
      AuthoringSettings
    },
    created: function() {
      this.$store.commit("project/setBehaviors", {
        behaviors: behaviors
      })
    }
  }
</script>

<style>

</style>
