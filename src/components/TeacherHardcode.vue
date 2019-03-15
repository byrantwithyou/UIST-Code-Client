<template>
  <div>
    <v-card min-height="500">
      <v-layout>
        <v-flex xs8>
          <v-card min-height="250">
            <v-layout>
              <v-flex xs6>
                <v-card min-height="250">
                  <v-card-title>
                    Martin
                  </v-card-title>
                  <v-card-media contain height="150">
                    <v-img contain src="demo.jpg" height="200"></v-img>
                  </v-card-media>
                  <v-card-actions min-height="100"> 
                    <GChart type="PieChart" :data="chartData" :options="chartO"/>
                    <v-spacer></v-spacer>
                    <v-btn icon small><v-icon>thumb_up</v-icon></v-btn>
                    <v-btn icon small><v-icon>unfold_more</v-icon></v-btn>
                  </v-card-actions>
                  <v-card-text>
                    
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs6>
                
              </v-flex>
            </v-layout>
          </v-card>
          <v-card height="250">
            <v-layout>
              <v-flex xs6>
              </v-flex>
              <v-flex xs6>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
        <v-flex xs4>
          <v-card min-height="500">
            <v-card-text>
              <div class="blue--text" v-for="(step, index) in steps" :key="index">
                <span>
                  {{index + 1}}. {{step.content}}
                </span>
                <span style="float: right; position: relative; border-radius: 50%; padding-width: 5px; border-color: black;">{{step.number}}</span>
              </div>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-card>
    <v-card height="300">
    <v-layout>
      <v-flex xs3>
        <GChart
          type="PieChart"
          :data="chartData"
          :options="chartOptions"
        />
        <v-card-text>
          <p class="text-xs-center">Wire</p>
        </v-card-text>    
      </v-flex>
      <v-flex xs3>
        <GChart type="PieChart" :data="[['', ''], ['Right', 500], ['Wrong', 300]]" :options="chartOptions"/>
        <v-card-text>
          <p class="text-xs-center">Polarity</p>
        </v-card-text>
      </v-flex>
    </v-layout>
    </v-card>
  </div>
</template>



<script>
import steps from "../steps";
export default {
  data () {
    return {
      // Array will be automatically processed with visualization.arrayToDataTable function
      chartData: [
        ['', ''],
        ['Right', 1000],
        ['Wrong', 1000]
      ],
      chartOptions: {
        "colors": ["green", "red"],
        title: "Wire"
      },
      steps: steps,
      chartO: {
        height: 100,
        width: 100,
        colors: ['green', 'red'],
        legend: {
          position: 'none'
        }
      }
    }
  }
}

</script>

<style scoped>

</style>