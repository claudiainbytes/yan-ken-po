interface Player {
    name: string;
    playSlotpot: boolean;
    result: "";
    score: 0;
}

interface SlotpotElement {
    name: string;
    img: string;
}

export interface RootState {
    stateTitle: string;
    playButtonState: boolean;
    playerComputer: Player;
    playerOne: Player;
    imgSlot: Array<SlotpotElement>;
}