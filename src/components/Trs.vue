<template>
  <div>
    <v-card>
      <v-card-title>
        {{behaviorName}}
      </v-card-title>
      <v-card-media>
      </v-card-media>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn icon><v-icon>done</v-icon></v-btn>
        <v-btn icon><v-icon>clear</v-icon></v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
  export default {
    name: "Trs",
    data: () => ({
      behaviorName: "",
      reviewImg: ""
    })
  }
</script>