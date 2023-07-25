export interface Player {
    name: string;
    playSlotpot: boolean;
    result: string;
    score: number;
}

interface SlotpotElement {
    name: string;
    img: string;
}

export interface RootState {
    playButtonState: boolean;
    playerComputer: Player;
    playerOne: Player;
    imgSlot: Array<SlotpotElement>;
}