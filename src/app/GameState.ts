export class GameState {
    fen!:string;
    player1Turn!:boolean;
    isCheckmate!:boolean;
    isStalemate!:boolean;
    constructor(fen:string, player1Turn:boolean, isCheckmate:boolean, isStalemate:boolean) {
        this.fen = fen;
        this.player1Turn = player1Turn;
        this.isCheckmate = isCheckmate;
        this.isStalemate = isStalemate;
    }
}