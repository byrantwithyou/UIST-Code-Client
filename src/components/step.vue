<template>
  <div>
  <v-container>
    <v-layout>
      <v-flex xs8 offset-xs2>
        <v-card>
          <v-btn @click="test">test</v-btn>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
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
      test: function() {
        this.$store.commit("project/addStep");
      }
    },
    computed: {
      currentStepNumber: function() {
        return this.$store.state.project.step;
      }
    },
    created: function() {
      
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