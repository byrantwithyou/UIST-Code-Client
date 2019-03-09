<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>{{title}}</v-toolbar-title>
    </v-toolbar>
    <v-container>
      <v-layout>
        <v-flex xs5>
            <v-select
              solo
              dense
              flat
              color="green"
              background-color="#E8EAF6"
              v-model="goalNumber"
              :items="goalNumbers"
              :menu-props="{ maxHeight: '400' }"
              hint="Goal number of correct behavior demenstrations for mastery?"
              persistent-hint
            ></v-select>
        </v-flex>
        <v-flex xs5 offset-xs2>
            <v-select
              solo
              dense
              flat
              color="green"
              background-color="#E8EAF6"
              v-model="errorTime"
              :items="errorTimes"
              :menu-props="{ maxHeight: '400' }"
              hint="Number of mistakes to demenstrate lack of mastery?"
              persistent-hint
            ></v-select>
        </v-flex>
      </v-layout>
      <v-card-media height="150"></v-card-media>
      <v-layout>
        <v-flex xs6>
          Choose the tutorial of the project
        </v-flex>
        <v-flex offset-xs3 xs3>
          <UploadButton :fileChangedCallback="uploadImg"></UploadButton>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs12>
          <v-text-field label="Add description of the project"></v-text-field>
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
      goalNumber: 1,
      goalNumbers: [1, 2, 3, 4],
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