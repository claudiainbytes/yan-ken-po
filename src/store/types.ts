interface Player {
    name: string;
    playSlotpot: boolean;
    result: "";
    score: 0;
}

export interface RootState {
    stateTitle: string;
    playButtonState: boolean;
    playerComputer: Player;
    playerOne: Player;
}