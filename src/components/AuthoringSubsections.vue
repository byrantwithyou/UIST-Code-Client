<template>
  <div>
  <notifications group="emptySection"></notifications>
    <v-toolbar flat color="white">
      <v-toolbar-title>{{title}}</v-toolbar-title>
      <v-toolbar-items>
        <v-spacer></v-spacer>
        <v-btn small color="primary" @click="addSubsection" icon><v-icon>add</v-icon></v-btn>
      </v-toolbar-items>
    </v-toolbar>
      <v-card-media height="50"></v-card-media>
      <v-img :src="$store.state.project.settings.projectTutorial" contain height="200">
      </v-img>
      <v-card-media height="50"></v-card-media>
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
        <v-btn small class="ma-2" outline color="#E53935">Back</v-btn>
        <v-spacer></v-spacer>
        <v-btn small class="ma-2" outline @click='saveAll' color="indigo">Save all</v-btn>
        <v-btn small class="ma-2" outline @click="nextStep" color="#E53935">Back to teacher Homepage</v-btn>
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
      <modal :clickToClose="false" name="saveSuccess" height="200" width="300">
        <v-card flat tile>
          <v-card-media height="60"></v-card-media>
          <p class="font-italic font-weight-black display-1 text-xs-center">Save Success!</p>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="ma-3" small color="success" small @click="$modal.hide('saveSuccess');">Ok</v-btn>
          </v-card-actions>
        </v-card>
      </modal>
  </div>
</template>
<script>
  import draggable from "vuedraggable";
  export default {
    data: () => ({
      title: 'Step4: Authoring Subsections and its Orders',
      steps: [],
      subsections: [],
      addSubsectionDialog: false,
      subsectionName:""
    }),
    methods: {
      nextStep: function() {
        if (this.subsections.length == 0) {
          this.$notify({
            group: "emptySection",
            type: "warn",
            title: "You have authored nothing!"
          });
          return;
        }
        for (let section of this.subsections) {
          if (section.steps.length == 0) {
            this.$notify({
              group: "emptySection",
              type: "warn",
              title: "Do not create an empty section!"
            });
            return;
          }
        }
        this.$store.commit("project/setSubsections", {
          subsections: this.subsections
        })
        this.$store.commit("project/addAuthoringStep");
        this.$socket.emit("authoring", this.$store.state.project.behaviors, this.$store.state.project.steps, this.subsections, this.$store.state.project.settings);
        this.$router.push("/teacherLogin");
      },
      saveAll: function() {
        if (this.subsections.length == 0) {
          this.$notify({
            group: "emptySection",
            type: "warn",
            title: "You have authored nothing!"
          });
          return;
        }
        for (let section of this.subsections) {
          if (section.steps.length == 0) {
            this.$notify({
              group: "emptySection",
              type: "warn",
              title: "Do not create an empty section!"
            });
            return;
          }
        }
        this.$store.commit("project/setSubsections", {
          subsections: this.subsections
        })
        this.$modal.show("saveSuccess");
        this.$socket.emit("authoring", this.$store.state.project.behaviors, this.$store.state.project.steps, this.subsections, this.$store.state.project.settings);

      },
      addSubsection: function() {
        this.addSubsectionDialog = true;
      },
      save: function() {
        if (this.subsectionName == '') {
          this.$notify({
            group: "emptySection",
            type: "warn",
            title: "No empty section name!"
          });
          return;
        }
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