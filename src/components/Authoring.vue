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
