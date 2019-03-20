<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>{{title}}</v-toolbar-title>
      <v-toolbar-items>
        <v-spacer></v-spacer>
        <v-btn small color="primary" @click="addSubsection" icon><v-icon>add</v-icon></v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-layout>
      <v-flex xs4 offset-xs1>
        <div>
        <draggable group="circuit" :list="steps">
          <v-layout v-for="(step, index) in steps" :key="index">
            <v-flex xs12>
              <span class="ma-1 font-weight-thin font-italic">
                {{index + 1}}. {{step}}
              </span>
              <v-card-media height="10"></v-card-media>
            </v-flex>
          </v-layout>
        </draggable>
        </div>
      </v-flex>
      <v-flex xs5 offset-xs1>
        
        <div v-for="(subsectionName, index) in subsectionNames" :key="index">
          <span class="font-weight-black headline font-italic">
            {{subsectionName}}
          </span>
          <draggable group="circuit" :list="subsections[index].steps">
            <div v-for="(step, index) in subsections[index].steps" :key="index">
              <span class="ma-2 font-weight-regular font-italic">
                {{index + 1}}. {{step}}
              </span>
              <v-card-media height="5"></v-card-media>
            </div>
          </draggable>
          <v-card-media height="20"></v-card-media>
        </div>

      </v-flex>
    </v-layout>
    <v-card>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn outline @click="nextStep" color="#E53935">Next Step</v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog persistent v-model="addSubsectionDialog" width="500">
      <v-card>
        <v-card-media height="20"></v-card-media>
        <v-card-text>
          <v-layout>
            <v-flex xs6 offset-xs3>
              <v-text-field label="Enter your subsection Name" v-model="subsectionName"></v-text-field>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
  import draggable from "vuedraggable";
  export default {
    data: () => ({
      title: 'Step3: Authoring Subsections',
      steps: [],
      subsections: [],
      addSubsectionDialog: false,
      subsectionName:""
    }),
    methods: {
      nextStep: function() {
        this.$store.commit("project/setSubsections", {
          subsections: this.subsections
        })
        this.$store.commit("project/addAuthoringStep");
      },
      addSubsection: function() {
        this.addSubsectionDialog = true;
      },
      save: function() {
        this.addSubsectionDialog = false;
        this.subsections.push({
          steps: [],
          name: this.subsectionName
        });
        this.subsectionName = "";
      }
    },
    components: {
      draggable
    },
    computed: {
      subsectionNames: function() {
        return this.subsections.map((element) => (element.name))
      }
    },
    created: function() {
      this.steps = this.$store.state.project.steps.map((element) => (element.content));
    }
  }

</script>