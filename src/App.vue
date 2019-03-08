<template>
  <v-app>
    <notifications />
    <v-content>
      <router-view></router-view>
      <v-dialog width="500" dark v-model="judgeDialog">
        <v-subheader light v-text="behaviorName"></v-subheader>
        <v-img width="100" height="100" contain :src="reviewImg"></v-img>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="sendRight">Right</v-btn>
          <v-btn @click="sendWrong">Wrong</v-btn>
        </v-card-actions>
      </v-dialog>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      judgeDialog: false,
      reviewImg: "",
      behaviorName: "",
      toUser: ""
    }
  },
  created: function() {
    this.$router.push("/");
    console.log(this.$socket.id);
  },
  sockets: {
    photoToJudge: function(data) {
      console.log(data);
      this.reviewImg = data[0];
      let toUser = data[1];
      let behavior = data[2];
      this.judgeDialog = true;
      this.behaviorName = behavior;
      this.toUser = toUser;
    },
    reviewResult: function(data) {
      let notifyText = "";
      if (data[0] == 1) { 
        notifyText = "Good!";
        this.$store.commit("project/setDisable", {
          disable: false
        });
      }
      else {
        notifyText = "Bad!";
      }
      this.$notify({
        title: this.behaviorName,
        text: notifyText
      });
    }
  },
  methods: {
    sendRight: function() {
      this.$socket.emit("review", 1, this.reviewImg, this.behaviorName, this.toUser);
      this.judgeDialog = false;
    },
    sendWrong: function() {
      this.$socket.emit("review", 0, this.reviewImg, this.behaviorName, this.toUser);
      this.judgeDialog = false;
    }
  }
    
}
</script>
