<script lang="ts">

import { propsToAttrMap } from '@vue/shared'
import store from '../store'
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import { Player } from '../store/types'


export default defineComponent({
    data(){
        return  {
            imgSlotDefault: 'bg-imgAvocado',
            imgSlot: [],
            result: "?"
        }
    },
    props: {
        id: {
            type:String
        },
        player: {
            type: Object as PropType<Player>
        }
    },
    setup(props) {
        props.id,
        props.player
    },
    methods: {
        shuffleObjects(array: Array<{ img: string, name: string }>) {
            return array.sort(() => Math.random() - 0.5);
        },
        setSlotPot(id: string) {
            let currentImgSlot = document.querySelector('#'+ id + ' .slotpot .slotpot_container .slotpot_image') as HTMLElement | null;
            let parentImgSlot: HTMLElement | null = document.querySelector('#'+ id + ' .slotpot .slotpot_container');
            let newItemSlot: HTMLElement | null;
            let slotpotHeight: HTMLElement | null  =  document.querySelector('.slotpot');
            if ((currentImgSlot != null) && (currentImgSlot.classList.contains('slotpot_image-default')) && ( slotpotHeight != null )) {
                currentImgSlot.classList.add('bg-imgAvocado');
                currentImgSlot.setAttribute('style','height: ' + slotpotHeight.offsetHeight + 'px'); 
            }
        },
        moveSlotPot(self: any) {
            let imgSlot: Array<{ img: string, name: string }> =  this.shuffleObjects(self.imgSlot);
            let id: string = self.id;
            let result: string = self.result;
            const rollIntervalTime: number = 180;
            let parentImgSlot: HTMLElement | null |any = document.querySelector('#'+ id + ' .slotpot .slotpot_container');
            let currentImgSlot = document.querySelector('#'+ id + ' .slotpot .slotpot_container .slotpot_image.slotpot_image-default') as HTMLElement | null | any;
            let slotpotHeight: HTMLElement | null =  document.querySelector('.slotpot');
            let newItemSlot: HTMLElement | null;
            let desplazamientoY: number = 0;
            let heightSlotpot: number;
            let i: number = 2;
            let countImage: number = 0;
            let maxCountImage: number = 21;
            if ( slotpotHeight != null ) {
                heightSlotpot = slotpotHeight.offsetHeight;
                desplazamientoY = heightSlotpot * (-1);
            }
            let rollSlotPot = setInterval(function () {
                        if ( parentImgSlot != null ) {
                            countImage += 1;    
                            newItemSlot = document.createElement('div');
                            newItemSlot.classList.add('slotpot_image');
                            newItemSlot.classList.add(imgSlot[i].img);
                            newItemSlot.classList.add('slot_' + countImage);
                            newItemSlot.setAttribute('style','height: ' + heightSlotpot + 'px');     
                            currentImgSlot = newItemSlot;
                            parentImgSlot.appendChild(currentImgSlot);
                            parentImgSlot.setAttribute('style','transform: translateY(-'+ desplazamientoY + 'px)');
                            desplazamientoY += heightSlotpot; 
                        }
                        i = i + 1;
                        result = (i > 0) ? imgSlot[i-1].name: "";
                        if( i >= imgSlot.length) {
                            i = 0;
                        }
                        if(countImage == (maxCountImage - 1)) {
                            store.dispatch('changeStatePlayersAction', { "name": self.player.name, "result": result, "playSlotpot": true });
                            store.dispatch('stopButtonAction');
                        }
                        if (countImage >= maxCountImage ) {
                            clearInterval(rollSlotPot);
                        }
            }, rollIntervalTime);
        },
        cleanSlotPot(id: string) {
            let parentImgSlot: HTMLElement | null = document.querySelector('#'+ id + ' .slotpot .slotpot_container');
            if ((parentImgSlot != null) && parentImgSlot.hasChildNodes()) {
                parentImgSlot.textContent = '';
            }
        },
        playSlot () {
            let self: any = this;
            self.cleanSlotPot(self.id);
            self.setSlotPot(self.id);
            self.moveSlotPot(self);
        } 
    },
    mounted() {
        let self: any = this;
        self.imgSlot = [...store.getters.imgSlot];
        self.setSlotPot(self.id);
    },
    computed:{
        playButtonState(): any {
            return store.getters.playButtonState
        }
    },
    watch: {
        playButtonState(newValue, oldValue){
            let self: any = this;
            let buttonSlot: HTMLElement | null  = document.querySelector('#'+ self.id + ' button');
            if(this.playButtonState){    
                buttonSlot?.addEventListener('click', self.playSlot());
                self.cleanSlotPot(self.id);
            }
        }
    }
})

</script>

<template>
    <div class="w-1/3 flex flex-col justify-center items-center" :id="id">
        <div class="slotpot">
            <div class="slotpot_container">
                <div class="slotpot_image slotpot_image-default"></div>
            </div>
        </div>
        <button class="hidden" @click="playSlot">Play</button>
        <p class="slotpot_player">{{ player?.name }}</p>
        <p class="slotpot_player">{{ player?.result }}</p>
        <p class="slotpot_score">{{ player?.score }} </p>
    </div>
</template>

<style scoped>

</style>
