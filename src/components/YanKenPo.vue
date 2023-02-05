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
      store.state.playButtonState = true;
      store.dispatch('playButtonAction');
      console.log("el valor de playButtonState por ahora es: " + store.getters.playButtonState);
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
    playButtonState: {
      get(): boolean {
        return store.state.playButtonState;
      },
      set(value: boolean) {
        store.state.playButtonState = value
      }
    }
  }
})

</script>

<template>
  <div class="w-full h-screen flex flex-col justify-center items-center">
    <h1>{{stateTitle}}</h1>
    <h1>Valor propiedad play buton state: {{ playButtonState }}</h1>
    <h2 class="text-7xl text-pink-600 font-permanentmarker">{{ appTitle }}</h2>
    <div class="w-4/5 h-auto flex flex-row justify-center items-center my-20">
          <SlotPot player="Computer" :score="0" id="slotpot1"></SlotPot>
        <div class="w-1/3 flex flex-col justify-center items-center">
          <button class="w-auto px-10 py-2 text-3xl bg-pink-600 rounded-lg text-white font-nunito uppercase" @click="playButton">Play</button>
        </div>
          <SlotPot player="You" :score="0" id="slotpot2"></SlotPot>
    </div>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
