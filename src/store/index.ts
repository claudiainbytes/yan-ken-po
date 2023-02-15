import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex';
import { RootState } from './types';

const store:StoreOptions<RootState> = {
    state: {
        stateTitle: "Esto es una prueba con Vuex y Typescript",
        playButtonState: false,
        playerComputer: { name: "Computer", playSlotpot: false, result: "", score: 0 },
        playerOne: { name: "You", playSlotpot: false, result: "", score: 0 }
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
        changePlayStateComputer(state) {
            state.playerComputer.playSlotpot = true;
        },
        changePlayStatePlayer(state) {
            state.playerOne.playSlotpot = true;
        },
        changeStateComputer(state, data) {
            state.playerComputer.result = data.result; 
            state.playerComputer.score =  data.score;
        },
        changeStatePlayer(state, data) {
            state.playerOne.result = data.result;  
            state.playerOne.score = data.score; 
        }
    },
    actions: {
        playButtonAction(context) {
            context.commit('playButton')
        },
        stopButtonAction(context) {
            context.commit('stopButton')
        },
        changePlayStateComputerAction(context) {
            context.commit('changePlayStateComputer')
        },
        changePlayStatePlayerAction(context) {
            context.commit('changePlayStatePlayer')
        },
        changeStateComputerAction(context, data) {
            context.commit('changeStateComputer', data)
        },
        changeStatePlayerAction(context, data) {
            context.commit('changeStatePlayer', data)
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
        }
    }
  }

  export default new Vuex.Store<RootState>(store)