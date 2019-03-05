<template>
  <div>
    {{img}}
    {{comment}}
    {{behavior}}
    {{reviewResult}}
  </div>
</template>

<script>
  export default {
    name: "Review Result",
    data: () => ({
      
    }),
    methods: {

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