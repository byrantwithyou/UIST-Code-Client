<template>
  <div>
    <v-layout>
      <v-flex xs9>
        <v-card dark min-height="200">
          <v-card-title primary-title>
            Student
          </v-card-title>
          <v-card-text>
            <v-layout>
              <v-flex xs4>
                <Trs></Trs>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs3>
        <v-card>
          <v-card-title primary-title>
            Behavior Lists
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12>
        <v-card height="300">
          <v-card-title>
            Overview
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import Trs from "@/components/Trs";
  export default {
    name: "TeacherReviewStudent",
    components: {
      Trs
    },
    data: () => ({

    })
  }
</script>