interface Player {
    name: string;
    playSlotpot: boolean;
    result: number;
}

export interface RootState {
    stateTitle: string;
    playButtonState: boolean;
    playerComputer: Player;
    playerOne: Player;
}