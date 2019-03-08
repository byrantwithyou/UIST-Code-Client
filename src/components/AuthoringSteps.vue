<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>{{title}}</v-toolbar-title>
    </v-toolbar>
    <v-layout>
      <v-flex xs4 offset-xs4>
        <UploadButton v-show="buttonExisted" :fileChangedCallback="fileChange"></UploadButton>
      </v-flex>
    </v-layout>
    <v-layout v-show="!buttonExisted">
      <v-flex xs6>
        <v-subheader v-text="'Step1: Please add arduino_Uno_Rev3(fix)'"></v-subheader>
      </v-flex>
      <v-flex xs6>
        <v-select v-model="step1" :items="states" label="select behaviors" multiple></v-select> 
      </v-flex>
    </v-layout>
    <v-layout v-show="!buttonExisted">
      <v-flex xs6>
        <v-subheader v-text="'Step2: Please add a 220Ω resistor reference position:pin6X and pin6H '"></v-subheader>
      </v-flex>
      <v-flex xs6>
        <v-select v-model="step2" :items="states" label="select behaviors" multiple></v-select> 
      </v-flex>
    </v-layout>    
    <v-layout v-show="!buttonExisted">
      <v-flex xs6>
        <v-subheader v-text="'Step3: Please add a Red (633nm) Led reference position:pin6I and pin4I '"></v-subheader>
      </v-flex>
      <v-flex xs6>
        <v-select v-model="step3" :items="states" label="select behaviors" multiple></v-select> 
      </v-flex>
    </v-layout>    
    <v-layout v-show="!buttonExisted">
      <v-flex xs6>
        <v-subheader v-text="'Step4: Please add a Yellow (585nm) led reference position:pin12I and pin10I '"></v-subheader>
      </v-flex>
      <v-flex xs6>
        <v-select v-model="step4" :items="states" label="select behaviors" multiple></v-select> 
      </v-flex>
    </v-layout>
      
      <!--v-flex xs6>
        <v-card height="200">
          <v-card-title>
            Step2: Please add a 220Ω resistor reference position:pin6X and pin6H 
          </v-card-title>
        </v-card>
      </v-flex>
      <v-flex xs6>
        <v-card>
          <v-card-title>
            Step3: Please add a Red (633nm) Led reference position:pin6I and pin4I 
          </v-card-title>
        </v-card>
      </v-flex>
      <v-flex xs6>
        <v-card>
          <v-card-title>
            Step4: Please add a Yellow (585nm) led reference position:pin12I and pin10I 
          </v-card-title>
        </v-card>
      </v-flex-->
  </div>
</template>
<script>
  import UploadButton from "vuetify-upload-button";
  export default {
    data: () => ({
      title: 'Step2: Authoring Steps',
      buttonExisted: true,
      states: ["Wire", "Polarity"],
      step1: null,
      step2: null,
      step3: null,
      step4: null
    }),
    components: {
      UploadButton
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