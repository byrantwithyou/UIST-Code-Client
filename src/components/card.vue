<template>
<div>
    <notifications :duration="-1" group="foo" position="top right" >
      <template slot="body" slot-scope="props">
      <v-card color="#CCFF90">
        <v-card-text>
          <div>
            <span class="font-italic">{{props.item.data.behavior.name}} is </span>
            <span class="font-italic" v-if="props.item.data.result == 0">not</span>
            <span class="font-italic">approved</span>
          </div>
          <div class="font-italic">Comment</div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn  small @click="emit(props.item.data.img, props.item.data.behavior, props.item.data.name)">send to teacher again</v-btn>
          <v-btn small @click="props.close" icon><v-icon>close</v-icon></v-btn>
        </v-card-actions>
      </v-card>
      </template>
    </notifications>
<notifications :duration="-1" group="foobar" position="top right" >
      <template slot="body" slot-scope="props">
      <v-card color="red">
        <v-card-text>
          <div>
            <span class="font-italic white--text headline font-weight-black">fds is </span>
            <span class="font-italic white--text headline" v-if="props.item.data.result == 0">not </span>
            <span class="font-italic white--text headline">approved</span>
          </div>
          <div class="font-italic white--text headline">Comment: {{props.item.data.comment}}</div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn dark small @click="emit(props.item.data.img, props.item.data.behavior, props.item.data.name)">contact instructor</v-btn>
          <v-btn small @click="props.close" dark icon><v-icon>close</v-icon></v-btn>
        </v-card-actions>
      </v-card>
      </template>
    </notifications>
  <v-btn @click="foo">foo</v-btn>
  <v-btn @click="foobar">foobar</v-btn>
</div>
</template>
<script>
  export default ({
    methods: {
      foo: function() {
        this.$notify({
            group: "foo",
            data: {
              behavior: "behavior",
              result: "reviewResult",
              comment: "comment",
              img: "img",
              name: "name"
            },
            type: "success",
            close: function() {
            }
          })
      },
      foobar: function() {
        this.$notify({
            group: "foobar",
            data: {
              behavior: "behavior",
              result: "reviewResult",
              comment: "comment",
              img: "img",
              name: "name"
            },
            type: "success",
            close: function() {
            }
          })
      },
      
    }
  })
</script>
