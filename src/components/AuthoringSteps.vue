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
      title: 'Step2: Authoring Steps',
    }),
    components: {
    },
    methods: {
      uploadFile: function() {
        this.$refs.upfile.click();
      },
      fileChange: function(file) {
        this.buttonExisted = false;
        let reader = new FileReader();
        reader.onload = function() {
          //data.target.result;
        }
        reader.readAsText(file);
      }
    }
  }
</script>