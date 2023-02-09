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
        changeStateComputer(state) {
            state.playerComputer.playSlotpot = true;
        },
        changeStatePlayer(state) {
            state.playerOne.playSlotpot = true;
        }
    },
    actions: {
        playButtonAction(context) {
            context.commit('playButton')
        },
        stopButtonAction(context) {
            context.commit('stopButton')
        },
        changeStateComputerAction(context) {
            context.commit('changeStateComputer')
        },
        changeStatePlayerAction(context) {
            context.commit('changeStatePlayer')
        }
    },
    getters: {
        playButtonState(state) {
            return state.playButtonState
        },
        stateComputer(state) {
            return state.playerComputer.playSlotpot
        },
        statePlayer(state) {
            return state.playerComputer.playSlotpot
        }
    }
  }

  export default new Vuex.Store<RootState>(store)