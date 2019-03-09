<template>
  <div>
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