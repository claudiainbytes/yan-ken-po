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
        changeStateComputer(state, data) {
            state.playerComputer.result = data.result; 
            state.playerComputer.playSlotpot = data.playSlotpot;
        },
        changeStatePlayer(state, data) {
            state.playerOne.result = data.result;  
            state.playerOne.playSlotpot = data.playSlotpot;
        },
        addPointToScorePlayer(state){
            state.playerOne.score++;
        },
        addPointToScoreComputer(state){
            state.playerComputer.score++;
        },
    },
    actions: {
        playButtonAction(context) {
            context.commit('playButton')
        },
        stopButtonAction(context) {
            context.commit('stopButton')
        },
        changeStateComputerAction(context, data) {
            context.commit('changeStateComputer', data)
        },
        changeStatePlayerAction(context, data) {
            context.commit('changeStatePlayer', data)
        },
        addPointToScorePlayerAction(context) {
            context.commit('addPointToScorePlayer')
        },
        addPointToScoreComputerAction(context) {
            context.commit('addPointToScoreComputer')
        },
    },
    getters: {
        playButtonState(state) {
            return state.playButtonState
        },
        stateComputer(state) {
            return state.playerComputer
        },
        statePlayer(state) {
            return state.playerOne
        },
        imgSlot(state){
            return state.imgSlot
        }
    }
  }

  export default new Vuex.Store<RootState>(store)