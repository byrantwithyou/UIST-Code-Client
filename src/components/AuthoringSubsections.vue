<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>{{title}}</v-toolbar-title>
    </v-toolbar>
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