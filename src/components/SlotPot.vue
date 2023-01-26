<script lang="ts">

import { propsToAttrMap } from '@vue/shared';
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
        },
        playButtonState: {
            type: Boolean,
            default: false
        }
    },
    setup(props) {
        props.id,
        props.player,
        props.score,
        props.playButtonState
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
                    if (parentImgSlot.hasChildNodes()) {
                        prevImgSlot = currentImgSlot;
                        prevImgSlot.classList.remove('slotpot_current');
                    }
                    currentImgSlot = newItemSlot;
                    currentImgSlot.classList.add('slotpot_current');
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
            console.log("y aqui " + self.playButtonState);
        } 
    },
    mounted() {
        let self: any = this;
        self.setSlotPot(self.id, self.imgSlot);
    },
    updated() {
        let self: any = this;
        //let buttonSlot: HTMLElement | null  = document.querySelector('#'+ this.id + ' button');
        //buttonSlot?.addEventListener('click', self.playSlot());
            self.cleanSlotPot(self.id);
            self.setSlotPot(self.id, self.imgSlot);
            self.moveSlotPot(self.id, self.imgSlot);
		console.log("estado de updated " + self.playButtonState);
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
        <button class="hidden_" @click="playSlot">Play</button>
        <p class="slotpot_player">{{ player }}</p>
        <p class="slotpot_score">{{ score }}</p>
    </div>
</template>

<style scoped>

</style>
