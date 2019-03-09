<template>
  <div>
    <!--ReviewResult 
      :img="reviewResultImage" 
      :comment="reviewResultComment" 
      :behavior="behaviorReviewed" 
      :reviewResult="reviewResult"
      v-if="isReviewResultExisted">
    </ReviewResult-->
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