import { GameState } from './../../GameState';
import { OnlineGameplayService } from './../../online-gameplay.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css'],
})
export class GamePageComponent implements OnInit {

  playernum:number = 1;
  roomID:string = "";
  gameState!:GameState|null;
  isYourTurn:boolean=true;
  constructor(private route : ActivatedRoute, private router:Router,private onlineGameplayService:OnlineGameplayService) { 
    window.addEventListener("message", (message) => {this.receiveMessage(message)}, false);
  }

  ngOnInit(): void {
    
    this.route.queryParams.subscribe((params) => {
      this.roomID = params.room;
      this.playernum = params.player;
      this.onlineGameplayService.getState(this.roomID)
      .then((val) => this.setState(val!))
      .catch((err) => {
        window.alert("No room exists with the given ID!")
        this.router.navigateByUrl("online");
      });
      this.onlineGameplayService.listenOnChanges(this.roomID, this);
    })
  }
  receiveMessage(message: any) {
    if(message == undefined)
      return;
    if(message.data.type === 'webpackOk')
      return;

    this.gameState = new GameState(message.data.event.fen, !message.data.fromPlayer1, message.data.event.checkmate, message.data.event.stalemate);
    this.onlineGameplayService.saveState(this.roomID, this.gameState);
  }

  setState(gameState: GameState) : void {
    let data = {
      order: "setState",
      newState: gameState
    };
    let iframe = document.querySelector('iframe')!;
    iframe.contentWindow?.postMessage(data, location.origin)
    if (gameState.player1Turn == (this.playernum == 1)) {
      iframe.style.pointerEvents = "all";
      this.isYourTurn = true;
    } else {
      iframe.style.pointerEvents = "none";
      this.isYourTurn = false;
    }
    if (gameState.isCheckmate) {
      let winner = gameState.player1Turn ? "player 2": "player 1";
      window.alert("Winner is "+winner);
    }else if (gameState.isStalemate) {
      window.alert("Draw!");
    }
  }
}
