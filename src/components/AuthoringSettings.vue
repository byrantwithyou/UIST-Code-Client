<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>{{title}}</v-toolbar-title>
    </v-toolbar>
    <v-container>
      <v-layout>
        <v-flex xs12>
            <v-select
              v-model="errorTime"
              :items="errorTimes"
              :menu-props="{ maxHeight: '400' }"
              hint="How many times can a student be deemed to have been familar with a behavior?"
              persistent-hint
            ></v-select>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs12>
            <v-select
              v-model="punishmentPro"
              :items="punishmentPros"
              :menu-props="{ maxHeight: '400' }"
              hint="How many times can a student be deemed to have been familar with a behavior?"
              persistent-hint
            ></v-select>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs12>
          <v-text-field label="Add Description of the project"></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs6>
          Upload the image of the project
        </v-flex>
        <v-flex offset-xs3 xs3>
          <UploadButton :fileChangedCallback="uploadImg"></UploadButton>
        </v-flex>
      </v-layout>
      <v-img :src="projectPic"></v-img>
    </v-container>
  </div>
</template>
<script>
  import UploadButton from "vuetify-upload-button";
  export default {
    data: () => ({
      title: 'Step4: Authoring Other Settings',
      errorTimes: [1, 2, 3, 4],
      errorTime: 1,
      punishmentPro: 0.1,
      punishmentPros: [0.1, 0.2, 0.3, 0.4],
      projectPic: ""
    }),
    components: {
      UploadButton
    },
    methods: {
      uploadImg: function(img) {
        let imgReader = new FileReader();
        let that = this;
        imgReader.onload = function(data) {
          that.projectPic = data.target.result;
        }
        imgReader.readAsDataURL(img);
      }
    }
  }

</script>