import { GameState } from './../GameState';
import { INITIAL_FEN_STATE } from './../constants';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  gameState!:GameState;
  constructor() {
      window.addEventListener("message", (message) => this.handleMessage(message), false);
  }

  handleMessage(message:any) {
    if(message == undefined)
      return;
    if(message.data.type === 'webpackOk')
      return;
    
    this.gameState = new GameState(message.data.event.fen, !this.gameState.player1Turn, message.data.event.checkmate, message.data.event.stalemate);
    this.setState(this.gameState);
  }

  newGame() {
    this.gameState = new GameState(INITIAL_FEN_STATE, true, false, false);
    this.setState(this.gameState);
  }
  
  setState(gameState: GameState) : void {
    let data = {
      order: "setState",
      newState: gameState
    };
    let enabledIFrameID = gameState.player1Turn ? "player1": "player2";
    document.querySelectorAll('iframe').forEach( (iframe) => {
      iframe.contentWindow?.postMessage(data, location.origin)
      if (iframe.id === enabledIFrameID) {
        iframe.style.pointerEvents = "all";
      } else {
        iframe.style.pointerEvents = "none";
      }
    });
    if (this.gameState.isCheckmate) {
      let winner = gameState.player1Turn ? "player 2": "player 1";
      window.alert("Winner is "+winner);
    }else if (this.gameState.isStalemate) {
      window.alert("Draw!");
    }
  }

  ngOnInit(): void {
    let savedState = JSON.parse(localStorage.getItem("state")!);
    console.log(savedState);
    this.gameState = savedState || new GameState(INITIAL_FEN_STATE, true, false, false);
    console.log("gameState: constructor");
    console.log(this.gameState);
    setTimeout(() => this.setState(this.gameState), 1000); //TODO: fix
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event:any) {
    // save state
    console.log(JSON.stringify(this.gameState));
    localStorage.setItem('state', JSON.stringify(this.gameState));
  }
}
