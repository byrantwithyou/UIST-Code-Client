<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Step1: Authoring Behaviors</v-toolbar-title>
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
                  <v-text-field v-model="editedItem.name" label="Behavior name"></v-text-field>
                </v-flex>
                <v-flex xs6>
                  <v-select v-model="editedItem.detectionMethod" label="Detection Method" :items="detectionMethod"></v-select>
                </v-flex>
                <v-flex xs6>
                  <v-select v-model="editedItem.level" label="Behavior Level" :items="behaviorLevel"></v-select>
                </v-flex>
                <v-flex xs6>
                  <v-select v-model="editedItem.dealingMethod" :items="dealingMethod" label="Dealing Method"></v-select>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="editedItem.description" label="Behavior Description"></v-text-field>
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
                    Good Examples
                  </span>
                  <span>
                    <v-btn @click="clickGoodExample" small color="primary">Upload</v-btn>
                    <input ref="goodInput" type="file" style="display: none" @change="goodExampleImg">
                  </span>
                </v-flex>
                <v-flex xs6>
                  <span class="grey--text">
                    Bad Examples
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
        <td>{{ props.item.dealingMethod }}</td>
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
          text: 'Behavior Name',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'Level', value: 'level', sortable: false },
        { text: 'Dealing Method', value: 'dealingMethod', sortable: false },
        { text: 'Detection Method', value: 'detectionMethod', sortable: false },
        { text: 'Actions', value: 'action', sortable: false }
      ],
      behaviors: behaviors,
      editedIndex: -1,
      editedItem: {
        name: '',
        level: "",
        dealingMethod: "",
        detectionMethod: "",
        goodExample: "",
        badExample: "",
        description: ""
      },
      defaultItem: {
        name: "",
        level: "",
        dealingMethod: "",
        detectionMethod: "",
        goodExample: "",
        badExample: "",
        description: ""
      },
      detectionMethod: ["Snapshot", "Quiz"],
      behaviorLevel: ["High", "Middle", "Low"],
      dealingMethod: ["Block", "Message", "Report"],
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Behavior' : 'Edit Behavior'
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
        this.behaviors.splice(index, 1);
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.behaviors[this.editedIndex], this.editedItem);
          this.close();
        } else {
          console.log(this.editedItem);
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
