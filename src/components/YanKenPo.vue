<script lang="ts">
import store from '../store'
import { defineComponent } from 'vue'
import SlotPot from './SlotPot.vue'

export default defineComponent({
  components: {
    SlotPot
  },
  data() {
    return {
      appTitle: "Yan-Ken-Po!"
    }
  },
  methods:{
    playButton(event: any) {
      event.preventDefault();
      store.dispatch('playButtonAction');
    }
  },
  computed:{
    stateTitle:{
      get():string{
        return store.state.stateTitle;
      },
      set(value:string){
        store.state.stateTitle = value
      }
    },
    playButtonState(): any {
        return store.getters.playButtonState
    },
    playerComputer(): any {
        return  store.getters.playerComputer
    },
    playerOne(): any {
        return  store.getters.playerOne
    },
    finalResult(): any {
      let message:String = "";
      if((this.playerComputer.result !== "") && (this.playerOne.result !== "")){
        console.log("Choices: ",this.playerComputer.result, this.playerOne.result);
        if (this.playerComputer.result === this.playerOne.result) {
          message = "It's a tie!";
        } else if ((this.playerOne.result === store.state.imgSlot[1].name && this.playerComputer.result === store.state.imgSlot[0].name) || 
              (this.playerOne.result === store.state.imgSlot[2].name && this.playerComputer.result === store.state.imgSlot[1].name) || 
              (this.playerOne.result === store.state.imgSlot[0].name && this.playerComputer.result === store.state.imgSlot[2].name)
          ){
            store.dispatch('addPointToScoreAction', {"player": this.playerOne });
            message = `You win! ${this.playerOne.result} beats ${this.playerComputer.result}.`;
          } else {
            store.dispatch('addPointToScoreAction', {"player": this.playerComputer });
            message = `Computer win! ${this.playerComputer.result} beats ${this.playerOne.result}.`;
          } 
      } 
      return message;
    }
  }
})

</script>

<template>
  <div class="w-full h-screen flex flex-col justify-center items-center">
    <h1>{{stateTitle}}</h1>
    <h1>Valor propiedad play buton state: {{ playButtonState }}</h1>
    <p>Result Compu: {{ playerComputer.result }} score: {{ playerComputer.score }}</p>
    <p>Result Player: {{ playerOne.result }} score: {{ playerOne.score }}</p>
    <h2 class="text-7xl text-pink-600 font-permanentmarker">{{ appTitle }}</h2>
    <div class="w-4/5 h-auto flex flex-row justify-center items-center my-20">
          <SlotPot :player="playerComputer" id="slotpot1"></SlotPot>
        <div class="w-1/3 flex flex-col justify-center items-center">
          <button class="w-auto px-10 py-2 text-3xl bg-pink-600 rounded-lg text-white font-nunito uppercase" @click="playButton">Play</button>
        </div>
          <SlotPot :player="playerOne" id="slotpot2"></SlotPot>
    </div>
    <h2 class="text-lg text-green-600">{{ finalResult }}</h2>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
