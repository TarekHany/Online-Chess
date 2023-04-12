export class GameState {
    fen!:string;
    player1Turn!:boolean;

    constructor(fen:string, player1Turn:boolean) {
        this.fen = fen;
        this.player1Turn = player1Turn;
    }
}