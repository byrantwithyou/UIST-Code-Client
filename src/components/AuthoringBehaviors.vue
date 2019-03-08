<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Step1: Authoring Behaviors</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on">New Behavior</v-btn>
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
                  <v-text-field v-model="editedItem.detectionMethod" label="Detection Method"></v-text-field>
                </v-flex>
                <v-flex xs6>
                  <v-text-field v-model="editedItem.level" label="Behavior Level"></v-text-field>
                </v-flex>
                <v-flex xs6>
                  <v-text-field v-model="editedItem.dealingMethod" label="Dealing Method"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="editedItem.description" label="Behavior Description"></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout>
                <v-flex xs6>
                  Good Examples
                  <UploadButton :fileChangedCallback="goodExampleUpload"></UploadButton>
                </v-flex>
                <v-flex xs6>
                  Bad Examples
                  <UploadButton :fileChangedCallback="badExampleUpload"></UploadButton>
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
        <td class="text-xs-right">{{ props.item.level }}</td>
        <td class="text-xs-right">{{ props.item.dealingMethod }}</td>
        <td class="text-xs-right">{{ props.item.detectionMethod }}</td>
        <td class="justify-center layout px-0">
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
  </div>
</template>

<script>
  import behaviors from "../behaviors";
  import UploadButton from "vuetify-upload-button";
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
        id: "",
        name: '',
        level: "",
        dealingMethod: "",
        detectionMethod: "",
        goodExample: "",
        badExample: "",
        description: ""
      },
      defaultItem: {
        id: "",
        name: "",
        level: "",
        dealingMethod: "",
        detectionMethod: "",
        goodExample: "",
        badExample: "",
        description: ""
      }
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
        this.$store.commit("project/setBehaviors", {
          behaviors: behaviors
        })
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        this.$store.commit("project/setBehaviors", {
          behaviors: behaviors
        })
        if (this.editedIndex > -1) {
          Object.assign(this.behaviors[this.editedIndex], this.editedItem);
          this.close();
        } else {
          this.behaviors.push(this.editedItem)
          this.close()
        }
    },
    goodExampleUpload: function(goodExampleImg) {
      let fileReader = new FileReader();
      fileReader.onload = function(data) {
        this.editedItem.goodExample = data.target.result;
      }
      fileReader.readAsDataURL(goodExampleImg);
    },
    badExampleUpload: function(badExampleImg) {
      let fileReader = new FileReader();
      fileReader.onload = function(data) {
        this.editedItem.badExample = data.target.result;
      }
      fileReader.readAsDataURL(badExampleImg);
    }
  },
  components: {
    UploadButton
  }
  }
</script>
