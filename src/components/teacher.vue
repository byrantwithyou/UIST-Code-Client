<template>
  <div>
    <v-layout>
      <v-flex xs11>
        <v-card>
          <v-card-title primary-title>
            <span class="title blue-grey--text font-italic">
              Overview Statistics
            </span>
          </v-card-title>
          <v-card-media contain height="200">
            <GChart type="ColumnChart" :data="stepData" :options="chartOptions"/>>
          </v-card-media>
        </v-card>
      </v-flex>
      <v-flex xs1>
        <v-card>
          <v-card-title primary-title>
            <span class="body-2 blue-grey--text font-italic">
              Student Behavior History
            </span>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  //import Trs from "@/components/Trs";
  export default {
    name: "TeacherReviewStudent",
    components: {
      //Trs
    },
    data: () => ({
      stepData: [
        ["year", "sales", "expenses", "profit"],
        ['2014', 1000, 400, 20],
        ['2015', 1000, 400, 20]
      ],
      chartOptions: {
        chart:{
          title: "Overall Progress",
          subtitle: ""
        }
      }
    })
  }
</script>