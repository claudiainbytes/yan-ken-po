<script lang="ts">

import { propsToAttrMap } from '@vue/shared';
import store from '../store'
import { defineComponent } from 'vue'

export default defineComponent({
    data(){
        return  {
            imgSlotDefault: 'bg-imgAvocado',
            imgSlot: [
                { img: 'bg-imgTijeras', name: "Tijeras" },
                { img: 'bg-imgPiedra', name: "Piedra" },
                { img: 'bg-imgPapel', name: "Papel" }
            ],
            resultPlayer: "?"
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
            let imgSlot: Array<{ img: string, name: string }> =  this.shuffleObjects(this.imgSlot);
            let id: string = self.id;
            let resultPlayer: string = self.resultPlayer;
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
                        resultPlayer = (i > 0) ? imgSlot[i-1].name: "";
                        if( i >= imgSlot.length) {
                            i = 0;
                        }
                        if(countImage == (maxCountImage - 1)) {
                            self.resultPlayer = resultPlayer;
                            if(store.state.playerComputer.name == self.player ){
                                store.dispatch('changeStateComputerAction', { "result": self.resultPlayer, "score": 10, "playSlotpot": true });
                                //console.log('res Comp 90: ' + self.playerComputer.result + " , " + self.playerComputer.playSlotpot);
                            }
                            if(store.state.playerOne.name == self.player){
                                store.dispatch('changeStatePlayerAction', { "result": self.resultPlayer, "score": 20, "playSlotpot": true });
                                //console.log('res Player 94: ' + self.playerOne.result + " , " + self.playerOne.playSlotpot);
                            }
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
    create() {
        this.imgSlot = store.state.imgSlot;
    },
    mounted() {
        let self: any = this;
        self.setSlotPot(self.id);
    },
    computed:{
        playButtonState: {
            get(): boolean {
                return store.state.playButtonState;
            },
            set(value: boolean) {
                store.state.playButtonState = value;
            }
        },
        playerComputer(): any {
            return  store.state.playerComputer;
        },
        playerOne(): any {
            return  store.state.playerOne;
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
        <p class="slotpot_player">{{ player }}</p>
        <p class="slotpot_score">{{ score }}</p>
        <p class="slotpot_player">{{ resultPlayer }}</p>
        <p>
            <span v-for="itemImgSlot in imgSlot">
                {{ itemImgSlot.name }} &nbsp;
            </span>
        </p>

    </div>
</template>

<style scoped>

</style>
