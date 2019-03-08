<template>
  <div>
    <v-layout>
      <v-flex xs6>
        <v-img src="demo.jpg" contain></v-img>
      </v-flex>
      <v-flex xs6>
        <v-subheader v-text="'Step2: Please add arduino_Uno_Rev3(fix)'"></v-subheader>
        <v-subheader light v-text="'Behavior 1: Take a photo of your behavior. You must be approved of your behavior before you can carry on'"></v-subheader>
        <v-btn @click="next" :disabled="disable">Next</v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  //import ReviewResult from "@/components/ReviewResult";
  export default {
    name: "Step",
    data: () => ({
      currentStepBlockBehaviors: [],
      reviewResult: "",
      reviewResultImage: "",
      reviewResultComment: "",
      behaviorReviewed: "",
      isReviewResultExisted: false
    }),
    methods: {
      next: function() {
        this.$router.push("/question");
        // if (this.currentStep == this.$store.state.project.steps.length) {
        //   this.$router.push("/result");
        // }
        // else {
        //   this.$store.commit("student/addStep");
        // }
      }
    },
    computed: {
      currentStep: function() {
        return this.$store.state.project.steps[this.$store.state.student.state];
      },
      currentStepBehaviors: function() {
        let currentStepBehaviors = [];
        //for (let currentStepBehavior of this.currentStep.behaviors) {
         // currentStepBehaviors.push(this.$store.state.project.behaviors[currentStepBehavior]);
        //}
        return currentStepBehaviors;
      },
      disable: function() {
        return this.$store.state.project.disable;
      }
    },
    created: function() {
      for (let currentStepBehavior of this.currentStepBehaviors) {
        if (currentStepBehavior.dealingMethod == "Block") {
          this.currentStepBlockBehaviors.push(currentStepBehavior);
        }
      }
    },
    components: {
     // ReviewResult
    },
    sockets: {
      reviewResult: function(data) {
        this.behaviorReviewed = data[0];
        this.reviewResult = data[1];
        this.reviewResultImage = data[2];
        this.reviewResultComment = data[3];
        this.isReviewResultExisted = true;
        //TODO: 
        //TODO:
        //pop up the currentStepBlockBehaviors if any
      },
      photo: function(data) {
        this.$socket.emit("photo", data, "Behavior 1");
      }
    }

  }
</script>