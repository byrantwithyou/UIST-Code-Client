<template>
  <v-container>
    <v-layout>
      <v-text-field box outline placeholder="Please input your name here" v-model="studentName"></v-text-field>
      <br>
      <v-card>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="studentLogin">Next</v-btn>
        </v-card-actions>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      studentName: ""
    }),
    methods:{
      studentLogin: function() {
        this.$socket.emit("studentLogin", this.studentName);
      }
    }
  }
</script>

<style>

</style>
