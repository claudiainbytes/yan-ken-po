import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex';
import { RootState } from './types';

const store:StoreOptions<RootState> = {
    state: {
        stateTitle: "Esto es una prueba con Vuex y Typescript",
        playButtonState: false,
        playerComputer: { name: "Computer", playSlotpot: false, result: "", score: 0 },
        playerOne: { name: "You", playSlotpot: false, result: "", score: 0 },
        imgSlot: [
            {  name: "Scissors", img: 'bg-imgTijeras' },
            {  name: "Rock", img: 'bg-imgPiedra' },
            {  name: "Paper", img: 'bg-imgPapel' }
        ],
    },
    getters: {
        playButtonState(state) {
            return state.playButtonState
        },
        playerComputer(state) {
            return state.playerComputer
        },
        playerOne(state) {
            return state.playerOne
        },
        imgSlot(state){
            return state.imgSlot
        }
    },
    mutations: {
        playButton(state) {
            state.playButtonState = !state.playButtonState;
        },
        stopButton(state) {
            if((state.playerComputer.playSlotpot) && (state.playerOne.playSlotpot)){
                state.playButtonState = false;
                state.playerComputer.playSlotpot = false;
                state.playerOne.playSlotpot = false;
            }    
        },
        changeStatePlayers(state, data) {
            if(state.playerComputer.name === data.name ){
                state.playerComputer.result = data.result; 
                state.playerComputer.playSlotpot = data.playSlotpot;
            }
            if(state.playerOne.name === data.name){
                state.playerOne.result = data.result;  
                state.playerOne.playSlotpot = data.playSlotpot;
            }
        },
        addPointToScore(state, data) {
            console.log("Antes: ", state.playerComputer.score, " - ", state.playerOne.score);
            if(state.playerComputer.name === data.player.name ){
                state.playerComputer.score++;
                console.log("Aumenta para computer: " + state.playerComputer.score)
            } else if(state.playerOne.name === data.player.name){
                state.playerOne.score++;
                console.log("Aumenta para You: " + state.playerOne.score)
            }
            console.log("Despues: ", state.playerComputer.score, " - ", state.playerOne.score);
        }
    },
    actions: {
        playButtonAction(context) {
            context.commit('playButton')
        },
        stopButtonAction(context) {
            context.commit('stopButton')
        },
        changeStatePlayersAction(context, data) {
            context.commit('changeStatePlayers', data)
        },
        addPointToScoreAction(context, data) {
            context.commit('addPointToScore', data)
        }
    }
  }

  export default new Vuex.Store<RootState>(store)