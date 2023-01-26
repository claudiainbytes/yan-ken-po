<script lang="ts">

import { defineComponent } from 'vue'
import SlotPot from './SlotPot.vue'

export default defineComponent({
  components: {
    SlotPot
  },
  data() {
    return {
      appTitle: "Yan-Ken-Po!",
      playButtonState: false
    }
  },
  methods:{
    playButton(event: any) {
      this.playButtonState = true;
      console.log("el valor " + this.playButtonState);
    }
  }
})

</script>

<template>
  <div class="w-full h-screen flex flex-col justify-center items-center">
    <h2 class="text-7xl text-pink-600 font-permanentmarker">{{ appTitle }}</h2>
    <div class="w-4/5 h-auto flex flex-row justify-center items-center my-20">
          <SlotPot player="Computer" :score="0" id="slotpot1" :playButtonState="playButtonState"></SlotPot>
        <div class="w-1/3 flex flex-col justify-center items-center">
          <button class="w-auto px-10 py-2 text-3xl bg-pink-600 rounded-lg text-white font-nunito uppercase" @click="playButton">Play</button>
        </div>
          <SlotPot player="You" :score="0" id="slotpot2" :playButtonState="playButtonState"></SlotPot>
    </div>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
