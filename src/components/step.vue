<template>
  <div>
    <h1>Tutorial</h1>
    <h1>Step Content</h1>
    <h1>Lots of behaviors</h1>
    <v-btn @click="next" :disabled="currentStepBlockBehaviors.length != 0">Next</v-btn>
  </div>
</template>

<script>
  export default {
    name: "Step",
    data: () => ({
      currentStepBlockBehaviors: []
    }),
    methods: {
      next: function() {
        if (this.currentStep == this.$store.state.project.steps.length) {
          this.$router.push("/result");
        }
        else {
          this.$store.commit("student/addStep");
        }
      }
    },
    computed: {
      currentStep: function() {
        return this.$store.state.project.steps[this.$store.state.student.state];
      },
      currentStepBehaviors: function() {
        let currentStepBehaviors = [];
        for (let currentStepBehavior of this.currentStep.behaviors) {
          currentStepBehaviors.push(this.$store.state.project.behaviors[currentStepBehavior]);
        }
        return currentStepBehaviors;
      },
    },
    created: function() {
      for (let currentStepBehavior of this.currentStepBehaviors) {
        if (currentStepBehavior.dealingMethod == "Block") {
          this.currentStepBlockBehaviors.push(currentStepBehavior);
        }
      }
    }

  }
</script>