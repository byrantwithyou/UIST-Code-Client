<template>
  <div>
    <h1>Tutorial</h1>
    <h1>Step Content</h1>
    <h1>Lots of behaviors</h1>

  </div>
</template>

<script>
  export default {
    name: "Step",
    data: () => ({

    }),
    methods: {
      
    },
    created: function() {

    },
    computed: {
      currentStep: function() {
        return this.$store.state.project.steps[this.$store.state.student.state];
      },
      currentBehaviors: function() {
        let currentBehaviors = [];
        for (let currentBehavior of this.currentStep.behaviors) {
          currentBehaviors.push(this.$store.state.project.behaviors[currentBehavior]);
        }
        return currentBehaviors;
      },
      currentBlockBehaviors: function() {
        let currentBlockBehaviors = [];
        for (let currentBehavior of this.currentBehaviors) {
          if (currentBehavior.dealingMethod == "Block") {
            currentBlockBehaviors.push(currentBehavior);
          }
        }
        return currentBlockBehaviors;
      }
    }

  }
</script>