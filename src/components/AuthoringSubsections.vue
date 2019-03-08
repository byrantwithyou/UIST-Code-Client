<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>{{title}}</v-toolbar-title>
    </v-toolbar>
    <v-btn @click="addSubsec" primary>Add Subsections</v-btn>
    <div v-for="(i, index) in subsectionNumber">
      <v-card>
        <v-card-title primary-title>
          Subsection
        </v-card-title>
        <v-layout wrap>
          <v-flex xs6 offset-xs3>
            <v-select multiple label="Select steps for subsection" :items="steps[index]"></v-select>
          </v-flex>
        </v-layout>
      </v-card>
    </div>
  </div>
</template>
<script>
  export default {
    data: () => ({
      title: 'Step3: Authoring Subsections',
      subsectionNumber: 0,
      steps: [
        ["Step1", "Step2", "Step3", "Step4"], ["Step3", "Step4"]]
    }),
    methods: {
      addSubsec: function() {
        this.subsectionNumber += 1;
      }
    }
  }

</script>