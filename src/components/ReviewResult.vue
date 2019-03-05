<template>
  <div>
    {{img}}
    {{comment}}
    {{behavior}}
    {{reviewResult}}
    <v-btn @click="sendToTeacher"></v-btn>
  </div>
</template>

<script>
  export default {
    name: "Review Result",
    data: () => ({

    }),
    methods: {
      sendToTeacher: function() {
        
      }
    },
    created: function() {
      
    },
    props: {
      img: String,
      comment: String,
      behavior: String,
      reviewResult: String
    }
  }
</script>