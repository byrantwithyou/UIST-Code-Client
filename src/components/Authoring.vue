<template>
  <v-container>
    <v-layout>
      <v-flex xs8 offset-xs2>
        <v-card>
          <v-toolbar color="#2196F3">
            <span class="headline font-weight-bold white--text text-uppercase">
              Authoring Tool
            </span>
          </v-toolbar>
          <AuthoringSettings v-if="authoringStep==1"></AuthoringSettings>
          <AuthoringBehaviors v-if="authoringStep==2"></AuthoringBehaviors>
          <AuthoringSteps v-if="authoringStep==3"></AuthoringSteps>
          <AuthoringSubsections v-if="authoringStep==4"></AuthoringSubsections>
        </v-card>
      </v-flex>
      <v-flex xs5 offset-xs1 v-if="authoringStep==4">
        <v-card>
          <v-card-title>
            <span class="font-weight-black indigo--text">
              Take care of these sequence-based styles: 
            </span>
          </v-card-title>
          <v-card-text>
            <div>
              <code>Begin by fixing the ICs first. Then start connecting the remaining relevant components to the breadboard sockets which directly reach out to the IC pins.</code>
            </div>
            <v-card-media height="50"></v-card-media>
            <div>
              <code>Always connect the batteries or power supply to the circuit last, check the whole circuit and then power the circuit</code>
            </div>
            <v-card-media height="50"></v-card-media>
              <div>
                <code>Build and test in subsections</code>
              </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import AuthoringBehaviors from "@/components/AuthoringBehaviors";
  import AuthoringSteps from "@/components/AuthoringSteps";
  import AuthoringSubsections from "@/components/AuthoringSubsections";
  import AuthoringSettings from "@/components/AuthoringSettings";

  export default {
    data: () => ({
    }),
    components: {
      AuthoringBehaviors,
      AuthoringSteps,
      AuthoringSubsections,
      AuthoringSettings
    },
    computed: {
      authoringStep: function() {
        return this.$store.state.project.authoringStep;
      }
    }
  }
</script>

<style>

</style>
