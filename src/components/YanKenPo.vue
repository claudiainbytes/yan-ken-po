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
    },
    resetButton(event: any) {
      event.preventDefault();
      location.reload();
    }
  },
  computed:{
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
          message = "It's a tie!<br><span>There is not a winner yet</span>";
        } else if ((this.playerOne.result === store.state.imgSlot[1].name && this.playerComputer.result === store.state.imgSlot[0].name) || 
              (this.playerOne.result === store.state.imgSlot[2].name && this.playerComputer.result === store.state.imgSlot[1].name) || 
              (this.playerOne.result === store.state.imgSlot[0].name && this.playerComputer.result === store.state.imgSlot[2].name)
          ){
            store.dispatch('addPointToScoreAction', {"player": this.playerOne });
            message = `You win<br><span>${this.playerOne.result} beats ${this.playerComputer.result}</span>`;
          } else {
            store.dispatch('addPointToScoreAction', {"player": this.playerComputer });
            message = `Computer win<br><span>${this.playerComputer.result} beats ${this.playerOne.result}</span>`;
          } 
      } 
      return message;
    }
  }
})

</script>

<template>
  <div class="w-full h-full flex flex-col justify-center items-center">
    <h1 class="title">{{ appTitle }}</h1>
    <p class="subtitle">The classic game of Rock, Paper and Scissors <br><span>by @claudiainbytes</span></p>
    <div class="h-14"> 
      <h2 class="game_result" v-html="finalResult"></h2>
    </div>
    <div class="w-4/5 h-auto flex flex-row justify-center items-center my-10">
          <SlotPot :player="playerComputer" id="slotpot1"></SlotPot>
        <div class="w-1/3 flex flex-col justify-center items-center">
          <button class="play_button mb-4" @click="playButton">Play</button>
          <button class="reset_button" @click="resetButton">Reset</button>
        </div>
          <SlotPot :player="playerOne" id="slotpot2"></SlotPot>
    </div>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
