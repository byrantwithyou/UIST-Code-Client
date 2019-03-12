<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Step2: Authoring Steps</v-toolbar-title>
      <input style="display: none" type="file" @change="readFile" ref="inputFile">
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat small @click="handleUpload"><span class="caption font-weight-regular font-italic">Upload your project file</span></v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-layout v-for="(step, index) in steps" :key=index>
      <v-flex xs6 offset-xs1>
        <span class="ma-1 font-weight-thin font-italic">
          {{index + 1}}. {{step.content}}
        </span>
        <v-card-media height="10"></v-card-media>
      </v-flex>
      <v-flex xs3 offset-xs1>
        <v-select dense v-model="step.behaviors" color="green" hint="Choose the styles to detect for each step" persistent-hint :items="behaviors"></v-select>
      </v-flex>
    </v-layout>
    <v-card>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn outline @click="nextStep" color="#E53935">Next Step</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
  import xml2js from "xml2js";
  let parser = new xml2js.Parser();
  export default {
    data: () => ({
      components: [],
      steps: [],
      
    }),

    computed: {
      behaviors: function() {
        return this.$store.state.project.behaviors.map((element) => (element.name));
      }
    },

    methods: {
     readFile: function(event) {
       let file = event.target.files[0];
       let fileReader = new FileReader();
       let that = this;
       fileReader.onload = function() {
        parser.parseString(this.result,function (err,res) {
          let instances = res.module.instances[0].instance;
          for(var i = 0; i < instances.length ; ++i){
            let instance = instances[i];
            if(instance.$.moduleIdRef === "Arduino Nano3(fix)"){
              let component = {};
              component.type = 'Arduino Nano3(fix)';
              component.id = instance.$.modelIndex;
              component.flag = 0;
              component.value = {};
              component.end0 = 0;
              component.end1 = 0;
              that.components.push(component);
            }
            if(instance.$.moduleIdRef === "arduino_Uno_Rev3(fix)"){
              let component = {};
              component.type = 'arduino_Uno_Rev3(fix)';
              component.id = instance.$.modelIndex;
              component.flag = 0;
              component.value = {};
              component.end0 = 0;
              component.end1 = 0;
              that.components.push(component);
            }

            else if(instance.$.moduleIdRef === "5mmColorLEDModuleID" || instance.$.moduleIdRef === "1206ColorLEDModuleID"){
              let component = {};
              component.type = 'led';
              component.id = instance.$.modelIndex;
              component.flag = 0;
              component.value = {};
              for(let prop in instance.property){
                component.value[instance.property[prop].$.name] = instance.property[prop].$.value;
              }
              let connectors = instance.views[0].breadboardView[0].connectors;
              let connector = connectors[0].connector;
              for(let connectid in connector){
                if(connector[connectid].$.connectorId === "connector0"){
                  let connect = connector[connectid].connects[0].connect;
                  for(let cid in connect){
                    if(connect[cid].$.layer === "breadboardbreadboard"){
                      component.end0 = connect[cid].$.connectorId;
                    }
                  }
                }
                if(connector[connectid].$.connectorId === "connector1"){
                  let connect = connector[connectid].connects[0].connect;
                  for(let cid in connect){
                    if(connect[cid].$.layer === "breadboardbreadboard"){
                      component.end1 = connect[cid].$.connectorId;
                    }
                  }
                }
              }
              that.components.push(component);
            }
            else if(instance.$.moduleIdRef === "WireModuleID"){
              let component = {};
              if(!instance.views[0].breadboardView) continue;
              component.type = 'wire';
              component.value = 0;
              component.id = instance.$.modelIndex;
              component.flag = 0;
              let connectors = instance.views[0].breadboardView[0].connectors;
              let connector = connectors[0].connector;
              for(let connectid in connector){
                if(connector[connectid].$.connectorId === "connector0"){
                  let connect = connector[connectid].connects[0].connect;
                  for(let cid in connect){
                    if(connect[cid].$.connectorId > "pin"){
                      component.end0 = connect[cid].$.connectorId;
                    }
                    else{
                      component.end0 = {};
                      component.end0.targetEnd = connect[cid].$.connectorId;
                      component.end0.target = connect[cid].$.modelIndex;
                    }
                  }
                }
                if(connector[connectid].$.connectorId === "connector1"){
                  let connect = connector[connectid].connects[0].connect;
                  for(let cid in connect){
                    if(connect[cid].$.connectorId > "pin"){
                      component.end1 = connect[cid].$.connectorId;
                    }
                    else{
                      component.end1 = {};
                      component.end1.targetEnd = connect[cid].$.connectorId;
                      component.end1.target = connect[cid].$.modelIndex;
                    }
                  }
                }
              }
              if(component.end1 && component.end0) that.components.push(component);
            }
            else if(instance.$.moduleIdRef === "lijaeag5654yx6narfd346gnn-ResistorModuleID" || instance.$.moduleIdRef === "ResistorModuleID"){
              let component = {};
              component.type = 'resistor';
              component.id = instance.$.modelIndex;
              component.value = {};
              for(let prop in instance.property){
                component.value[instance.property[prop].$.name] = instance.property[prop].$.value;
              }
              component.flag = 0;
              let connectors = instance.views[0].breadboardView[0].connectors;
              let connects0 = connectors[0].connector[0].connects[0].connect;
              for(let connect in connects0){
                if(connects0[connect].$.layer === "breadboardbreadboard"){
                  component.end0 = connects0[connect].$.connectorId;
                }
              }
              let connects1 = connectors[0].connector[1].connects[0].connect;
              for(let connect in connects1){
                if(connects1[connect].$.layer === "breadboardbreadboard"){
                  component.end1 = connects1[connect].$.connectorId;
                }
              }
              that.components.push(component);
            }
          }
          //to cut wire
          for(let i = that.components.length - 1; i >= 0; i--){
            if(!that.components[i].end0.target && !that.components[i].end1.target){
              that.components[i].flag = 2;
            }
            if(that.components[i].end0.target && (!that.components[i].end1.target)){
              if(that.components[i].flag === 1){
                continue;
              }
              that.components[i].flag = 2;
              that.components[i].end0 = that.otherEnd(that.components[i].end0);
            }
            if(!that.components[i].end0.target && that.components[i].end1.target){
              // visited: flag === 1
              if(that.components[i].flag === 1){
                continue;
              }
              that.components[i].flag = 2;
              that.components[i].end1 = that.otherEnd(that.components[i].end1);
            }
          }
          for(let i = that.components.length-1; i >= 0; i--){
            if(that.components[i].flag !== 2){
              that.components.splice(i,1);
            }
          }
          for(let i = 0; i < that.components.length;i++){
            if(that.components[i].type === "Arduino Nano3(fix)"){
              that.components[i].content = "Please add "+that.components[i].type+" (id:"+that.components[i].id+")";
            }
            else if(that.components[i].type === "arduino_Uno_Rev3(fix)"){
              that.components[i].content = "Please add "+that.components[i].type+" (id:"+that.components[i].id+")";
            }
            else if(that.components[i].type === "wire"){

              let friend1 = "";
              if(!that.components[i].end0.target){
                let friendTmp = that.findFriend(that.components[i].end0);
                for(let k = 0; k < friendTmp.length;k++){
                  friend1 += friendTmp[k]+" ";
                }
              }
              else{
                friend1 += (that.components[i].end0.target + that.components[i].end0.targetEnd);
              }

              let friend2 = "";
              if(!that.components[i].end1.target){
                let friendTmp = that.findFriend(that.components[i].end1);
                for(let k = 0; k < friendTmp.length;k++){
                  friend2 += friendTmp[k]+" ";
                }
              }
              else{
                friend2 += (that.components[i].end1.target + that.components[i].end1.targetEnd);
              }

              that.components[i].content = "Please add wire connecting {"+friend1+"} to {"+friend2+"}";
            }
            else if(that.components[i].type === "resistor"){
              that.components[i].content = "Please add a "+that.components[i].value['resistance']+"Ω "+that.components[i].type+"      reference position:"+that.components[i].end0+" and "+that.components[i].end1+ "      reference id:"+that.components[i].id;
            }
            else if(that.components[i].type === "led"){
              
              
              that.components[i].content = "Please add a "+that.components[i].value['color']+" "+that.components[i].type+"      reference position:"+that.components[i].end0+" and "+that.components[i].end1+ "      reference id:"+that.components[i].id;
            }
          }
          for (let component of that.components) {
            that.steps.push({
              content: component.content,
              behaviors: []
            });
          }
        })
       }
       fileReader.readAsText(file);
     },
    nextStep: function() {
      this.$store.commit("project/setSteps", {
        steps: this.steps
      });
      this.$store.commit("project/addAuthoringStep");
    },
    handleUpload: function() {
      this.$refs.inputFile.click();
    },
    otherEnd(end) {
      if( !end.target){
        return end;
      }
      let toWire = end.target;
      let toEnd = end.targetEnd;
      let find = 0;
      for(let i = 0; i < this.components.length; ++i){
        if( this.components[i].id == toWire){
          find = 1;
          this.components[i].flag = 1;
          if(this.components[i].type !== 'wire'){
            return {
              target:this.components[i].type,
              targetEnd:toEnd
            }
          }
          if(toEnd === 'connector0'){
            return this.otherEnd(this.components[i].end1);
          }
          else if(toEnd === 'connector1'){
            return this.otherEnd(this.components[i].end0);
          }
        }
      }
      if(find === 0){
        return "not found";
      }
    },
    findFriend(pos){
      let friendComponents = [];
      if(pos.target){
        return friendComponents;
      }
      let posX = pos.match(/pin(\d+)(.*)/)[1];
      let posY = pos.match(/pin(\d+)(.*)/)[2];
      for(let i = 0 ; i < this.components.length; ++i){
        if(this.components[i].end0 > "pin"){
          let comX = this.components[i].end0.match(/pin(\d+)(.*)/)[1];
          let comY = this.components[i].end0.match(/pin(\d+)(.*)/)[2];
          if(posX === comX && posY === comY) break;
          if(posX === comX){
            if('A' <= posY && posY <= 'E' && comY <='E' && 'A'<= comY){
              friendComponents.push(this.components[i].id+": "+this.components[i].type);
            }
            else if('F' <= posY && posY <= 'J' && comY <='J' && 'F'<= comY){
              friendComponents.push(this.components[i].id+": "+this.components[i].type);
            }
          }
          if(posY === comY){
            if(posY === "W" || posY === "X" || posY === "Y" || posY === "Z"){
              friendComponents.push(this.components[i].id+": "+this.components[i].type);
            }
          }
        }
        if(this.components[i].end1 > "pin"){
          let comX = this.components[i].end1.match(/pin(\d+)(.*)/)[1];
          let comY = this.components[i].end1.match(/pin(\d+)(.*)/)[2];
          if(posX === comX && posY === comY) break;
          if(posX === comX){
            if('A' <= posY && posY <= 'E' && comY <='E' && 'A'<= comY){
              friendComponents.push(this.components[i].id+": "+this.components[i].type);
            }
            else if('F' <= posY && posY <= 'J' && comY <='J' && 'F'<= comY){
              friendComponents.push(this.components[i].id+": "+this.components[i].type);
            }
          }
          if(posY === comY){
            if(posY === "W" || posY === "X" || posY === "Y" || posY === "Z"){
              friendComponents.push(this.components[i].id+": "+this.components[i].type);
            }
          }
        }
      }
      return friendComponents;
    },
  },
  }
</script>
