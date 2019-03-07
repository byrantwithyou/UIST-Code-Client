<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>{{title}}</v-toolbar-title>
    </v-toolbar>
    <v-layout>
      <v-flex xs4 offset-xs4>
        <UploadButton :fileChangedCallback="fileChange"></UploadButton>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
  import UploadButton from "vuetify-upload-button";
  export default {
    data: () => ({
      title: 'Step2: Authoring Steps',
    }),
    components: {
      UploadButton
    },
    methods: {
      uploadFile: function() {
        this.$refs.upfile.click();
      },
      fileChange: function(file) {
        console.log(typeof file);
      }
    }
  }
</script>