<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Step2: Authoring Styles</v-toolbar-title>
      <v-spacer></v-spacer>


      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn color="amber" dark class="ma-0" v-on="on" icon><v-icon>add</v-icon></v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs6>
                  <v-text-field v-model="editedItem.name" label="Style name"></v-text-field>
                </v-flex>
                <v-flex xs6>
                  <v-select v-model="editedItem.detectionMethod" label="Validation Method" :items="detectionMethod"></v-select>
                </v-flex>
                <v-flex xs6>
                  <v-select v-model="editedItem.level" label="Style Level" :items="behaviorLevel"></v-select>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="editedItem.description" label="Style Description"></v-text-field>
                </v-flex>
                <v-flex xs11 v-if="editedItem.detectionMethod == 'Quiz'">
                  <v-text-field v-model="editedItem.question" prepend-inner-icon="question_answer" color="blue" label="Input your quiz question"></v-text-field>
                </v-flex>
                <v-flex xs1 v-if="editedItem.detectionMethod == 'Quiz'">
                  <v-btn small icon top @click="editedItem.answerSets.push(({
                    question: 'Answer Choice' + (editedItem.answerSets.length + 1),
                    check: true
                  }))"><v-icon>add</v-icon></v-btn>
                </v-flex>
                <v-flex xs12 v-if="editedItem.detectionMethod == 'Quiz'">
                  <v-card v-if="editedItem.answerSets.length" flat tile>
                    <div class="font-italic font-weight-thin orange--text ma-2" v-for="(_, index) in editedItem.answerSets" :key="index">
                      <v-text-field @click:prepend="editedItem.answerSets[index].check = !editedItem.answerSets[index].check" :prepend-icon="editedItem.answerSets[index].check? 'done': 'clear'" color="indigo" v-model="editedItem.answerSets[index].question"></v-text-field>
                    </div>
                  </v-card>
                </v-flex>
  
              </v-layout>
              <v-layout>
                <v-flex xs6>
                  <v-card-media contain height="70">
                    <v-img :src="editedItem.goodExample" contain></v-img>
                  </v-card-media>
                </v-flex>
                <v-flex xs6>
                  <v-card-media contain height="70">
                    <v-img :src="editedItem.badExample" contain></v-img>
                  </v-card-media>
                </v-flex>
              </v-layout>
              <v-layout>
                <v-flex xs6>
                  <span class="grey--text">
                    Example of good style
                  </span>
                  <span>
                    <v-btn @click="clickGoodExample" small color="primary">Upload</v-btn>
                    <input ref="goodInput" type="file" style="display: none" @change="goodExampleImg">
                  </span>
                </v-flex>
                <v-flex xs6>
                  <span class="grey--text">
                    Example of bad style
                  </span>
                  <span>
                    <v-btn small @click="clickBadExample" color="primary">Upload</v-btn>
                    <input ref="badInput" type="file" style="display: none" @change="badExampleImg">
                  </span>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>


    <v-data-table
      :headers="headers"
      :items="behaviors"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.level }}</td>
        <td>{{ props.item.detectionMethod }}</td>
        <td>
          <v-icon
            small
            class="mr-2"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            small
            @click="deleteItem(props.item)"
          >
            delete
          </v-icon>
        </td>
      </template>
    </v-data-table>
    <v-card>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn outline @click="nextStep" color="#E53935">Next Step</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
  import behaviors from "../behaviors";

  export default {
    data: () => ({
      dialog: false,
      headers: [
        {
          text: 'Style Name',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'Level', value: 'level', sortable: false },
        { text: 'Validation Method', value: 'detectionMethod', sortable: false },
        { text: 'Actions', value: 'action', sortable: false }
      ],
      behaviors: behaviors,
      editedIndex: -1,
      editedItem: {
        name: '',
        level: "",
        detectionMethod: "",
        goodExample: "",
        badExample: "",
        description: "",
        question: "",
        answerSets: [],
      },
      defaultItem: {
        name: "",
        level: "",
        detectionMethod: "",
        goodExample: "",
        badExample: "",
        description: "",
        question: "",
        answerSets: [],
      },
      detectionMethod: ["Peer Review", "Quiz"],
      behaviorLevel: ["High", "Median", "Low"],
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Style' : 'Edit Style'
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    methods: {
      editItem (item) {
        this.editedIndex = this.behaviors.findIndex((element) => (element.name == item.name));
        this.editedItem = Object.assign({}, item);
        this.dialog = true;
      },

      deleteItem (item) {
        const index = this.behaviors.findIndex((element) => (element.name == item.name));
        if (index >= 0) {
          this.behaviors.splice(index, 1);
        }
      },

      close () {
        this.dialog = false
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedItem.answerSets = [];
        this.editedIndex = -1
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.behaviors[this.editedIndex], this.editedItem);
          this.close();
        } else {
          this.behaviors.push(this.editedItem)
          this.close()
        }
    },
    nextStep: function() {
      this.$store.commit("project/setBehaviors", {
        behaviors: this.behaviors
      })
      this.$store.commit("project/addAuthoringStep");
    },
    goodExampleImg: function(event) {
      let file = event.target.files[0];
      let fileReader = new FileReader();
      let that = this;
      fileReader.onload = function(data) {
        that.editedItem.goodExample = data.target.result;
      }
      fileReader.readAsDataURL(file);
    },
    badExampleImg: function(event) {
      let file = event.target.files[0];
      let fileReader = new FileReader();
      let that = this;
      fileReader.onload = function(data) {
        that.editedItem.badExample = data.target.result;
      }
      fileReader.readAsDataURL(file);
    },
    clickGoodExample: function() {
      this.$refs.goodInput.click();
    },
    clickBadExample: function() {
      this.$refs.badInput.click();
    }
  },
  }
</script>
