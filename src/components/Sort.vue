<template>
  <div>
    <v-toolbar>
      <v-toolbar-title>Sort</v-toolbar-title>
    </v-toolbar>
    <v-card>
      <v-card-title primary-title>Subsection1: Wire</v-card-title>
      <v-subheader v-text="'Step1: Add the wire to pin1J and pin2H'"></v-subheader>
      <v-subheader v-text="'Step2: Add the wire to pin2C and pin3A'"></v-subheader>
    </v-card>
    <v-card>
      <v-card-title>Subsection2: LED</v-card-title>
      <v-subheader v-text="'Step3: Add the LED to pin22C and pin20A'"></v-subheader>
      <v-subheader v-text="'Step4: Add the LED to pin23A and pin 35J'"></v-subheader>
    </v-card>
    <v-card>
      <v-card-title>Subsection3: Arduino</v-card-title>
      <v-subheader v-text="'Step5: Add the Arduino to pin44J and pin23J'"
    </v-card>
    <v-btn @click="test">Next</v-btn>
  </div>
</template>

<script>
  export default {
    name: "Sort",
    methods: {
      test: function() {
        this.$router.push("/step");
      }
    },
    created: function() {
    
    }
  }

</script>