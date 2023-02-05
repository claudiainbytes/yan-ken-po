<script lang="ts">

import { propsToAttrMap } from '@vue/shared';
import store from '../store'
import { defineComponent } from 'vue'

export default defineComponent({
    data(){
        return  {
            imgSlotDefault: 'bg-imgAvocado',
            imgSlot: [
                { img: 'bg-imgTijeras' },
                { img: 'bg-imgPiedra' },
                { img: 'bg-imgPapel' }
            ]
        }
    },
    props: {
        id: {
            type:String
        },
        player: {
            type:String
        },
        score: {
            type: Number,
            default: 0
        }
    },
    setup(props) {
        props.id,
        props.player,
        props.score
    },
    methods:{
        shuffleObjects(array: Array<{ img: string }>) {
            return array.sort(() => Math.random() - 0.5);
        },
        setSlotPot(id: string, imgSlot: Array<{ img: string }>) {
            let currentImgSlot = document.querySelector('#'+ id + ' .slotpot .slotpot_container .slotpot_image') as HTMLElement | null;
            let parentImgSlot: HTMLElement | null = document.querySelector('#'+ id + ' .slotpot .slotpot_container');
            let newItemSlot: HTMLElement | null;
            let slotpotHeight: HTMLElement | null  =  document.querySelector('.slotpot');
            if ((currentImgSlot != null) && (currentImgSlot.classList.contains('slotpot_image-default')) && ( slotpotHeight != null )) {
                currentImgSlot.classList.add('bg-imgAvocado');
                currentImgSlot.setAttribute('style','height: ' + slotpotHeight.offsetHeight + 'px'); 
            }
        },
        moveSlotPot(id: string, imgSlot: Array<{ img: string }>) {

            imgSlot = this.shuffleObjects(imgSlot);
            const rollIntervalTime: number = 180;
            let parentImgSlot: HTMLElement | null | any;
            let currentImgSlot = document.querySelector('#'+ id + ' .slotpot .slotpot_container .slotpot_image.slotpot_image-default') as HTMLElement | null | any;
            let slotpotHeight: HTMLElement | null =  document.querySelector('.slotpot');
            let newItemSlot: HTMLElement | null;
            let desplazamientoY: number = 0;
            let heightSlotpot: number;
            let i: number = 2;
            let prevImgSlot: HTMLElement | null | any;
            let nextImgSlot: HTMLElement | null | any;
            let beforePassedImgSlot: HTMLElement | null | any;
            if ( slotpotHeight != null ) {
                heightSlotpot = slotpotHeight.offsetHeight;
                desplazamientoY = heightSlotpot * (-1);
            }
            parentImgSlot = document.querySelector('#'+ id + ' .slotpot .slotpot_container');
            let rollSlotPot = setInterval(function () {
                if ( parentImgSlot != null ) {
                    newItemSlot = document.createElement('div');
                    newItemSlot.classList.add('slotpot_image');
                    newItemSlot.classList.add(imgSlot[i].img);
                    newItemSlot.setAttribute('style','height: ' + heightSlotpot + 'px');     
                    currentImgSlot = newItemSlot;
                    parentImgSlot.appendChild(currentImgSlot);
                    parentImgSlot.setAttribute('style','transform: translateY(-'+ desplazamientoY + 'px)');
                    desplazamientoY += heightSlotpot;     
                }
                i = i + 1;
                if( i >= imgSlot.length) {
                    i = 0;
                }
            }, rollIntervalTime);
            setTimeout( function() { clearInterval(rollSlotPot) }, 3000);
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
            self.setSlotPot(self.id, self.imgSlot);
            self.moveSlotPot(self.id, self.imgSlot);
        } 
    },
    mounted() {
        let self: any = this;
        self.playButtonState = store.getters.playButtonState;
        self.setSlotPot(self.id, self.imgSlot);
    },
    computed:{
        playButtonState: {
            get(): boolean {
                return store.state.playButtonState;
            },
            set(value: boolean) {
                store.state.playButtonState = value
            }
        }
    },
    watch: {
        playButtonState(newValue, oldValue){
            console.log("Watcher desde SlotPot: El playButtonState pasó de ser '%s' a '%s'", oldValue, newValue);
            if(this.playButtonState){
                let self: any = this;
                let buttonSlot: HTMLElement | null  = document.querySelector('#'+ self.id + ' button');
                buttonSlot?.addEventListener('click', self.playSlot());
                if(store.state.playerComputer.name == this.player )
                    store.dispatch('changeStateComputerAction');
                if(store.state.playerOne.name == this.player)
                    store.dispatch('changeStatePlayerAction');
                store.dispatch('stopButtonAction');
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
        <p class="slotpot_player">{{ player }}</p>
        <p class="slotpot_score">{{ score }}</p>
    </div>
</template>

<style scoped>

</style>
