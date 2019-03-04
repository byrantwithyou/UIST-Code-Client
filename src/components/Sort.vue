<template>
  <div>
    <h1>Sort</h1>
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